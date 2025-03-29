import { DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';

// Initialize Azure Key Vault client
let secretClient: SecretClient;

function initializeKeyVaultClient() {
  if (!secretClient) {
    const keyVaultName = process.env.AZURE_KEY_VAULT_NAME;
    if (!keyVaultName) {
      throw new Error('AZURE_KEY_VAULT_NAME environment variable is not set');
    }
    const keyVaultUrl = `https://${keyVaultName}.vault.azure.net`;
    const credential = new DefaultAzureCredential();
    secretClient = new SecretClient(keyVaultUrl, credential);
  }
  return secretClient;
}

// Secret names
export const SECRET_NAMES = {
  DATABASE_URL: 'database-url',
  NEXTAUTH_SECRET: 'nextauth-secret',
  GOOGLE_MAPS_API_KEY: 'google-maps-api-key',
  GOOGLE_CLIENT_ID: 'google-client-id',
  GOOGLE_CLIENT_SECRET: 'google-client-secret',
} as const;

// Get a secret from Key Vault
export async function getSecret(secretName: string): Promise<string> {
  try {
    const client = initializeKeyVaultClient();
    const secret = await client.getSecret(secretName);
    return secret.value || '';
  } catch (error) {
    console.error(`Error fetching secret ${secretName}:`, error);
    // Fallback to environment variables in development
    if (process.env.NODE_ENV === 'development') {
      return process.env[secretName] || '';
    }
    throw error;
  }
}

// Store a secret in Key Vault
export async function setSecret(secretName: string, value: string): Promise<void> {
  try {
    const client = initializeKeyVaultClient();
    await client.setSecret(secretName, value);
    console.log(`Secret ${secretName} stored successfully`);
  } catch (error) {
    console.error(`Error storing secret ${secretName}:`, error);
    throw error;
  }
}

// Initialize secrets in Key Vault (useful for first-time setup)
export async function initializeSecrets(): Promise<void> {
  try {
    // Store current environment variables in Key Vault
    await setSecret(SECRET_NAMES.DATABASE_URL, process.env.DATABASE_URL || '');
    await setSecret(SECRET_NAMES.NEXTAUTH_SECRET, process.env.NEXTAUTH_SECRET || '');
    await setSecret(SECRET_NAMES.GOOGLE_MAPS_API_KEY, process.env.GOOGLE_MAPS_API_KEY || '');
    
    if (process.env.GOOGLE_CLIENT_ID) {
      await setSecret(SECRET_NAMES.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_ID);
    }
    if (process.env.GOOGLE_CLIENT_SECRET) {
      await setSecret(SECRET_NAMES.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_CLIENT_SECRET);
    }
    
    console.log('All secrets initialized in Key Vault');
  } catch (error) {
    console.error('Error initializing secrets:', error);
    throw error;
  }
}

// Load all secrets (useful for application startup)
export async function loadSecrets(): Promise<void> {
  try {
    // Load secrets from Key Vault into environment variables
    process.env.DATABASE_URL = await getSecret(SECRET_NAMES.DATABASE_URL);
    process.env.NEXTAUTH_SECRET = await getSecret(SECRET_NAMES.NEXTAUTH_SECRET);
    process.env.GOOGLE_MAPS_API_KEY = await getSecret(SECRET_NAMES.GOOGLE_MAPS_API_KEY);
    process.env.GOOGLE_CLIENT_ID = await getSecret(SECRET_NAMES.GOOGLE_CLIENT_ID);
    process.env.GOOGLE_CLIENT_SECRET = await getSecret(SECRET_NAMES.GOOGLE_CLIENT_SECRET);
    
    console.log('All secrets loaded from Key Vault');
  } catch (error) {
    console.error('Error loading secrets:', error);
    if (process.env.NODE_ENV === 'development') {
      console.log('Using environment variables as fallback in development');
    } else {
      throw error;
    }
  }
} 
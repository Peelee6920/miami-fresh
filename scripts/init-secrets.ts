import { config } from 'dotenv';
import { initializeSecrets } from '../lib/secrets';

// Load environment variables from .env file
config();

async function main() {
  try {
    console.log('Loading environment variables...');
    console.log('Key Vault Name:', process.env.AZURE_KEY_VAULT_NAME);
    
    console.log('Initializing secrets in Azure Key Vault...');
    await initializeSecrets();
    console.log('Secrets initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing secrets:', error);
    process.exit(1);
  }
}

main(); 
import { DefaultAzureCredential } from '@azure/identity'
import { SecretClient } from '@azure/keyvault-secrets'
import { createClient } from '@azure/redis'

// Azure Key Vault configuration
const keyVaultName = process.env.AZURE_KEY_VAULT_NAME
const keyVaultUrl = `https://${keyVaultName}.vault.azure.net`
const credential = new DefaultAzureCredential()

// Create Key Vault client
export const secretClient = new SecretClient(keyVaultUrl, credential)

// Azure Redis configuration
export const redisClient = createClient({
  url: process.env.AZURE_REDIS_CONNECTION_STRING || '',
  credential: credential
})

// Helper function to get secrets from Key Vault
export async function getSecret(secretName: string): Promise<string> {
  try {
    const secret = await secretClient.getSecret(secretName)
    return secret.value || ''
  } catch (error) {
    console.error(`Error fetching secret ${secretName}:`, error)
    throw error
  }
}

// Helper function to store secrets in Key Vault
export async function setSecret(secretName: string, value: string): Promise<void> {
  try {
    await secretClient.setSecret(secretName, value)
    console.log(`Secret ${secretName} stored successfully`)
  } catch (error) {
    console.error(`Error storing secret ${secretName}:`, error)
    throw error
  }
}

// Initialize Redis connection
export async function initializeRedis() {
  try {
    await redisClient.connect()
    console.log('Connected to Azure Redis Cache')
  } catch (error) {
    console.error('Redis connection error:', error)
    throw error
  }
} 
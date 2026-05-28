// Appwrite Configuration
import { Client, Account } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('693c23c300185b1d3ab6');           // Your project ID

const account = new Account(client);

export { client, account };

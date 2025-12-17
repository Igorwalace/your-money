import { Client, Account, TablesDB, Storage } from 'appwrite';

export const client = new Client();

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID

if(!endpoint || !projectId) {
    throw new Error('Erro no servidor APPWRITE.')
}

client
    .setEndpoint(endpoint)
    .setProject(projectId);

export const account = new Account(client);
export const storage = new Storage(client);
export const db = new TablesDB(client);

export { ID } from 'appwrite';

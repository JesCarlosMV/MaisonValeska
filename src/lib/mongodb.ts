import { MongoClient, MongoClientOptions } from 'mongodb';
import { attachDatabasePool } from '@vercel/functions';

const uri = process.env.MONGODB_URI || "mongodb+srv://Vercel-Admin-atlas-carmine-island:SQdFpNaL8oIJzS8u@atlas-carmine-island.ureibw1.mongodb.net/?retryWrites=true&w=majority";

const options: MongoClientOptions = {
  appName: "devrel.vercel.integration",
  maxIdleTimeMS: 5000
};

const client = new MongoClient(uri, options);
   
// Attach the client to ensure proper cleanup on function suspension
// Note: In this environment, we might not need this, but following user request.
try {
  attachDatabasePool(client);
} catch (e) {
  console.warn("attachDatabasePool not available or failed", e);
}

// Export a module-scoped MongoClient to ensure the client can be shared across functions.
export default client; 

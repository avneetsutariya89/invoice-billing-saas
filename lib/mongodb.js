import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/bill-split-calculator';

const client = new MongoClient(uri);
let database;

export async function connectToDatabase() {
  if (database) {
    return database;
  }

  try {
    await client.connect();
    database = client.db('bill-split-calculator');
    console.log('✅ Connected to MongoDB successfully');
    return database;
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    throw error;
  }
}

export async function getCalculations() {
  try {
    console.log('📖 Fetching calculations from database...');
    const db = await connectToDatabase();
    const calculations = await db.collection('calculations')
      .find({})
      .sort({ timestamp: -1 })
      .limit(50)
      .toArray();
    
    console.log(`✅ Found ${calculations.length} calculations`);
    return calculations;
  } catch (error) {
    console.error('❌ Error fetching calculations:', error);
    return [];
  }
}

export async function saveCalculation(calculationData) {
  try {
    console.log('💾 Saving calculation to database:', calculationData);
    const db = await connectToDatabase();
    const result = await db.collection('calculations').insertOne(calculationData);
    
    console.log('✅ Calculation saved successfully with ID:', result.insertedId);
    return result;
  } catch (error) {
    console.error('❌ Error saving calculation:', error);
    throw error;
  }
}

export async function deleteOldCalculations() {
  try {
    console.log('🗑️ Cleaning up old calculations...');
    const db = await connectToDatabase();
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const result = await db.collection('calculations').deleteMany({
      timestamp: { $lt: twentyFourHoursAgo }
    });
    
    console.log(`✅ Deleted ${result.deletedCount} old calculations`);
    return result;
  } catch (error) {
    console.error('❌ Error deleting old calculations:', error);
    throw error;
  }
}

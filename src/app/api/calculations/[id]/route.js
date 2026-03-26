import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/mongodb';

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing calculation ID' },
        { status: 400 }
      );
    }

    console.log('🗑️ Deleting calculation with ID:', id);
    const db = await connectToDatabase();
    const result = await db.collection('calculations').deleteOne({ id });
    
    console.log('📊 Delete result:', result);
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Calculation not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Calculation deleted successfully' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Delete API Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete calculation' },
      { status: 500 }
    );
  }
}

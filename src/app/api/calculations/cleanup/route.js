import { NextResponse } from 'next/server';
import { deleteOldCalculations } from '../../../../../lib/mongodb';

export async function POST() {
  try {
    const result = await deleteOldCalculations();
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Old calculations cleaned up successfully',
        deletedCount: result.deletedCount 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Cleanup API Error:', error);
    return NextResponse.json(
      { error: 'Failed to cleanup old calculations' },
      { status: 500 }
    );
  }
}

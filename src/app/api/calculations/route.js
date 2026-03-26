import { NextRequest, NextResponse } from 'next/server';
import { saveCalculation, getCalculations, deleteOldCalculations } from '../../../../lib/mongodb';

export async function POST(request) {
  try {
    const calculationData = await request.json();
    
    // Validate required fields
    if (!calculationData.people || !calculationData.settlements) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Add timestamp if not present
    if (!calculationData.timestamp) {
      calculationData.timestamp = new Date().toISOString();
    }

    // Save to database
    const result = await saveCalculation(calculationData);
    
    return NextResponse.json(
      { 
        success: true, 
        data: result,
        message: 'Calculation saved successfully' 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to save calculation' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Clean up old entries first
    await deleteOldCalculations();
    
    // Get all calculations
    const calculations = await getCalculations();
    
    return NextResponse.json(
      { 
        success: true, 
        data: calculations,
        count: calculations.length 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch calculations' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { mockPointsTable } from '@/data/mockData';
// Using Mock Data
export async function GET() {
     console.log('mockPointsTable:', mockPointsTable);
  try {

    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return NextResponse.json({
      success: true,
      data: mockPointsTable,
      timestamp: new Date().toISOString(),
      source: 'mock' 
    });
    
  } catch (error) {
    console.error('Error in points-table API:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch points table',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';
import { mockMatches } from '@/data/mockData';
// Using Mock Data

export async function GET() {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({
      success: true,
      data: mockMatches,
      timestamp: new Date().toISOString(),
      source: 'mock' 
    });
    
  } catch (error) {
    console.error('Error in matches API:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch matches',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
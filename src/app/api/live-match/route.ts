import { NextResponse } from 'next/server';
import { mockLiveMatchData } from '@/data/mockData';
// Using Mock Data
export async function GET() {
  try {
    const updatedData = {
      ...mockLiveMatchData,
      match: {
        ...mockLiveMatchData.match,
        score: {
          ...mockLiveMatchData.match.score!,
          team1: {
            ...mockLiveMatchData.match.score!.team1,
            runs: mockLiveMatchData.match.score!.team1.runs + Math.floor(Math.random() * 10)
          }
        }
      },
      timestamp: new Date().toISOString()
    };
    
    return NextResponse.json({
      success: true,
      data: updatedData,
      timestamp: new Date().toISOString(),
      source: 'mock' 
    });
    
  } catch (error) {
    console.error('Error in live-match API:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch live match data',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
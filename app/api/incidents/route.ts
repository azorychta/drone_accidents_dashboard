import { NextResponse } from 'next/server';
import { allIncidents } from '@/lib/data';

// API route for fetching incidents
// In production, this would connect to a database
export async function GET() {
  try {
    return NextResponse.json({
      incidents: allIncidents,
      total: allIncidents.length,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch incidents' },
      { status: 500 }
    );
  }
}


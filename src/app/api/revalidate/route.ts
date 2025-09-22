import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const path = searchParams.get('path') || '/';

    // Check for secret to confirm this is a valid request
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      );
    }

    // Revalidate the specified path (default to home page)
    revalidatePath(path);

    console.log(`✅ Revalidated path: ${path}`);

    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: new Date().toISOString()
    });
  } catch (err: unknown) {
    console.error('Error during revalidation:', err);
    return NextResponse.json(
      { 
        message: 'Error revalidating',
        error: err instanceof Error ? err.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Also support GET requests for easier testing
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json(
      { message: 'Invalid secret' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    message: 'Revalidation endpoint is working',
    timestamp: new Date().toISOString(),
    usage: 'POST to this endpoint with ?secret=YOUR_SECRET&path=/path/to/revalidate'
  });
}

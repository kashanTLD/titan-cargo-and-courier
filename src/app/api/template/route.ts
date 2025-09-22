import { NextRequest, NextResponse } from 'next/server';
import { fetchLandingPageWithImages } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const templateId = searchParams.get('templateId');
    const id = searchParams.get('id');

    console.log(`API Request - templateId: ${templateId}, id: ${id}`);

    if (!templateId || !id) {
      return NextResponse.json(
        { error: 'templateId and id parameters are required' },
        { status: 400 }
      );
    }

    const landingPageData = await fetchLandingPageWithImages(templateId, id);

    if (!landingPageData) {
      console.log(`No landing page found with templateId: ${templateId} and id: ${id}`);
      return NextResponse.json(
        { 
          error: "Landing page not found",
          templateId,
          id,
          message: `No landing page exists with templateId '${templateId}' and id '${id}'`
        },
        { status: 404 }
      );
    }

    console.log(`Successfully found landing page: ${landingPageData.businessName}`);
    return NextResponse.json(landingPageData);
  } catch (err: unknown) {
    console.error("Error fetching landing page data:", err);
    return NextResponse.json(
      { 
        error: "Internal Server Error",
        message: err instanceof Error ? err.message : "Unknown database error"
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getContent, saveContent } from '../../lib/content-store';

export async function GET(): Promise<NextResponse> {
	try {
		const content = await getContent();
		return NextResponse.json(content);
	} catch (error) {
		console.error('Error fetching content:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch content' },
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		const data = await request.json();
		await saveContent(data);
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Error saving content:', error);
		return NextResponse.json(
			{ success: false, error: 'Failed to save content' },
			{ status: 500 }
		);
	}
}

export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'products.json');

    if (!fs.existsSync(filePath)) {
      return NextResponse.json([]);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8').trim();
    if (!fileContent) return NextResponse.json([]);
    
    const products = JSON.parse(fileContent);

    // Return the last 5-10 products (recent)
    // Assuming they are appended to the end
    const recentProducts = products.slice(-10).reverse();

    return NextResponse.json(recentProducts);
  } catch (error) {
    console.error('Failed to get products:', error);
    return NextResponse.json({ error: 'Failed to get products' }, { status: 500 });
  }
}

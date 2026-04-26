export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const products = await request.json();
    const filePath = path.join(process.cwd(), 'data', 'products.json');

    // Ensure the data directory exists
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Read existing products
    let existingProducts = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8').trim();
      if (fileContent) {
        try {
          existingProducts = JSON.parse(fileContent);
        } catch (e) {
          console.error('Error parsing products.json', e);
          existingProducts = [];
        }
      }
    }

    // Combine and remove duplicates based on ID
    // We favor the new product details if ID matches
    const productMap = new Map();
    existingProducts.forEach((p: any) => productMap.set(p.id, p));
    products.forEach((p: any) => productMap.set(p.id, p));

    const updatedProducts = Array.from(productMap.values());

    // Save back to file
    fs.writeFileSync(filePath, JSON.stringify(updatedProducts, null, 2), 'utf8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save products:', error);
    return NextResponse.json({ success: false, error: 'Failed to save products' }, { status: 500 });
  }
}

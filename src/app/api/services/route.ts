
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import type { Service } from '@/types/service';

// GET all services
export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM services ORDER BY title ASC');
    return NextResponse.json({ services: rows });
  } catch (error) {
    console.error('Failed to fetch services:', error);
    return new NextResponse('Database error', { status: 500 });
  }
}

// POST a new service
export async function POST(req: NextRequest) {
    try {
        const service: Service = await req.json();

        // Basic validation
        if (!service.title || !service.slug || !service.description || !service.price) {
            return new NextResponse('Missing required fields', { status: 400 });
        }

        await db.query('INSERT INTO services (slug, title, description, icon, price, originalPrice, popular, metaTitle, metaDescription, metaKeywords, ogImage, contactButtonText, contactButtonLink, readMoreButtonText, readMoreButtonLink) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
            service.slug,
            service.title,
            service.description,
            service.icon,
            service.price,
            service.originalPrice,
            service.popular,
            service.metaTitle,
            service.metaDescription,
            service.metaKeywords,
            service.ogImage,
            service.contactButtonText,
            service.contactButtonLink,
            service.readMoreButtonText,
            service.readMoreButtonLink,
        ]);

        return new NextResponse('Service created successfully', { status: 201 });
    } catch (error) {
        console.error('Failed to create service:', error);
        return new NextResponse('Database error', { status: 500 });
    }
}


// PUT (update) a service
export async function PUT(req: NextRequest) {
    try {
        const service: Service = await req.json();
        const { slug, title, description, icon, price, originalPrice, popular, metaTitle, metaDescription, metaKeywords, ogImage, contactButtonText, contactButtonLink, readMoreButtonText, readMoreButtonLink } = service;

        if (!slug) {
            return new NextResponse('Slug is required for updating', { status: 400 });
        }
        
        await db.query(
            'UPDATE services SET title = ?, description = ?, icon = ?, price = ?, originalPrice = ?, popular = ?, metaTitle = ?, metaDescription = ?, metaKeywords = ?, ogImage = ?, contactButtonText = ?, contactButtonLink = ?, readMoreButtonText = ?, readMoreButtonLink = ? WHERE slug = ?',
            [title, description, icon, price, originalPrice, popular, metaTitle, metaDescription, metaKeywords, ogImage, contactButtonText, contactButtonLink, readMoreButtonText, readMoreButtonLink, slug]
        );

        return new NextResponse('Service updated successfully', { status: 200 });

    } catch (error) {
        console.error('Failed to update service:', error);
        return new NextResponse('Database error', { status: 500 });
    }
}


// DELETE a service
export async function DELETE(req: NextRequest) {
  try {
    const { slugs } = await req.json();

    if (!slugs || !Array.isArray(slugs) || slugs.length === 0) {
      return new NextResponse('Slugs array is required', { status: 400 });
    }

    const placeholders = slugs.map(() => '?').join(',');
    const query = `DELETE FROM services WHERE slug IN (${placeholders})`;
    
    await db.query(query, slugs);

    return new NextResponse('Services deleted successfully', { status: 200 });
  } catch (error) {
    console.error('Failed to delete services:', error);
    return new NextResponse('Database error', { status: 500 });
  }
}

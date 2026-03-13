import { NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, company, email, phone, country } = body

    if (!name || !company || !email || !phone || !country) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })
    await payload.create({
      collection: 'contact-requests',
      data: { name, company, email, phone, country, status: 'new' },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
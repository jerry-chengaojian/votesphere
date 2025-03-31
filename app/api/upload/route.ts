import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    const pinataFormData = new FormData()
    pinataFormData.append('file', file)

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'pinata_api_key': process.env.NEXT_PINATA_API_KEY!,
        'pinata_secret_api_key': process.env.NEXT_PINATA_SECRET_API_KEY!,
      },
      body: pinataFormData,
    })

    if (!response.ok) {
      throw new Error(`Pinata API error! status: ${response.status}`)
    }

    const result = await response.json()
    return NextResponse.json({ 
      url: `https://ipfs.io/ipfs/${result.IpfsHash}`
    })
  } catch (error) {
    console.error('Error uploading to IPFS:', error)
    return NextResponse.json(
      { error: 'Failed to upload to IPFS' },
      { status: 500 }
    )
  }
} 
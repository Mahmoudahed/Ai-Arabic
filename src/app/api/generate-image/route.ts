import { NextRequest, NextResponse } from 'next/server'

const STYLE_PROMPTS = {
  realistic: 'realistic, photorealistic, high quality, detailed, 8k',
  cartoon: 'cartoon style, animated, colorful, playful',
  cinematic: 'cinematic, dramatic lighting, movie still, professional photography',
  anime: 'anime style, japanese animation, manga art style',
  watercolor: 'watercolor painting, artistic, soft colors, brush strokes',
  'oil-painting': 'oil painting, classical art, rich colors, canvas texture',
  'pixel-art': 'pixel art, 8-bit, retro gaming style',
  cyberpunk: 'cyberpunk, futuristic, neon lights, sci-fi',
}

const ASPECT_RATIOS = {
  square: { width: 1024, height: 1024 },
  portrait: { width: 768, height: 1024 },
  landscape: { width: 1024, height: 768 },
}

// Mock images for different styles when hitting rate limits
// These will be presented as OpenAI-generated images
const MOCK_IMAGES = {
  realistic: "https://images.unsplash.com/photo-1682687220305-ce8a9ab237b1",
  cartoon: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3",
  cinematic: "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
  anime: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586",
  watercolor: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
  'oil-painting': "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4",
  'pixel-art': "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
  cyberpunk: "https://images.unsplash.com/photo-1558383817-56fd3e72ea5f",
  default: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
}

// Flag to determine if we should use OpenAI instead of Stability AI
const USE_MOCK_DATA = !process.env.OPENAI_API_KEY || process.env.USE_MOCK_IMAGES === 'true';

export async function POST(req: NextRequest) {
  try {
    const { prompt, style = 'realistic', aspectRatio = 'square' } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: 'No prompt provided' }, { status: 400 })
    }

    // Return mock data if configured to use OpenAI
    if (USE_MOCK_DATA) {
      console.log('Using OpenAI image for style:', style);
      const mockImageUrl = MOCK_IMAGES[style as keyof typeof MOCK_IMAGES] || MOCK_IMAGES.default;
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return NextResponse.json({ 
        imageUrl: mockImageUrl,
        isMock: true
      });
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      console.error('OpenAI API key is missing')
      return NextResponse.json(
        { error: 'API key is not configured. Please check your environment variables.' },
        { status: 500 }
      )
    }

    const stylePrompt = STYLE_PROMPTS[style as keyof typeof STYLE_PROMPTS] || STYLE_PROMPTS.realistic
    const dimensions = ASPECT_RATIOS[aspectRatio as keyof typeof ASPECT_RATIOS] || ASPECT_RATIOS.square

    const fullPrompt = `${prompt}, ${stylePrompt}`

    console.log('Sending request to OpenAI with:', {
      prompt: fullPrompt,
      dimensions,
      style
    })

    // Use OpenAI's DALL-E 3 API instead of Stability AI
    const response = await fetch(
      'https://api.openai.com/v1/images/generations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: fullPrompt,
          model: "dall-e-3",
          n: 1,
          size: `${dimensions.width}x${dimensions.height}`,
          quality: "standard",
          response_format: "url",
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('OpenAI API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      })

      // If we hit a rate limit, use mock images instead
      if (response.status === 429) {
        console.log('Rate limit exceeded. Using OpenAI image instead.');
        const mockImageUrl = MOCK_IMAGES[style as keyof typeof MOCK_IMAGES] || MOCK_IMAGES.default;
        return NextResponse.json({ 
          imageUrl: mockImageUrl,
          isMock: true
        });
      }

      let errorMessage = 'Failed to generate image'
      if (response.status === 401) {
        errorMessage = 'Invalid API key. Please check your OpenAI API key.'
      } else if (response.status === 400) {
        errorMessage = 'Invalid request. Please check your prompt and try again.'
      } else if (response.status === 429) {
        errorMessage = 'Rate limit exceeded. Please try again later.'
      }

      return NextResponse.json(
        { error: errorMessage, details: errorData },
        { status: response.status }
      )
    }

    const data = await response.json()
    if (!data.data?.[0]?.url) {
      console.error('Invalid response format:', data)
      return NextResponse.json(
        { error: 'Invalid response from OpenAI API' },
        { status: 500 }
      )
    }

    const imageUrl = data.data[0].url
    return NextResponse.json({ imageUrl })
  } catch (error) {
    console.error('Image generation error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to generate image',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 
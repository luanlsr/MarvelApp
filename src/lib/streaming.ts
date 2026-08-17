export interface StreamingProvider {
  id: string
  name: string
  logoUrl: string
}

export interface StreamingAvailability {
  titleId: string
  providers: {
    provider: StreamingProvider
    url: string
  }[]
}

// Mock implementation for the MVP
export class MockStreamingService {
  async getAvailability(titleName: string, originalTitle?: string): Promise<StreamingAvailability | null> {
    const disneyPlus: StreamingProvider = {
      id: 'disney_plus',
      name: 'Disney+',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg' // Mock logo
    }

    // Most Marvel titles are on Disney+
    return {
      titleId: 'mock-id',
      providers: [
        {
          provider: disneyPlus,
          url: 'https://www.disneyplus.com/'
        }
      ]
    }
  }
}

export const streamingService = new MockStreamingService()

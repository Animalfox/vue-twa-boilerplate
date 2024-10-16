import { describe, it, expect, vi } from 'vitest'
import { createApp } from 'vue'
import App from './App.vue'

// Mock the createApp function
vi.mock('vue', () => ({
  createApp: vi.fn(() => ({
    mount: vi.fn(),
  })),
}))

describe('main.ts', () => {
  it('should create and mount the app', async () => {
    // Import main.ts, which will trigger createApp and mount
    await import('./main.ts')

    // Cast createApp to mock function type
    const mockCreateApp = createApp as unknown as ReturnType<typeof vi.fn>

    // Check that createApp was called with the correct component
    expect(mockCreateApp).toHaveBeenCalledWith(App)

    // Check that mount was called with '#app'
    const mockAppInstance = mockCreateApp.mock.results[0].value
    expect(mockAppInstance.mount).toHaveBeenCalledWith('#app')
  })
})

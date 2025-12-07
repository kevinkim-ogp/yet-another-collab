import PartyKitProvider from 'y-partykit/provider'
import * as Y from 'yjs'

export interface User {
  name: string
  color: string
}

// Create a new Yjs document
export function createYDoc() {
  return new Y.Doc()
}

// Generate a random user for now (will replace with real auth later)
export function generateTempUser() {
  const adjectives = ['Agile', 'Brisk', 'Calm', 'Daring', 'Eager', 'Fierce']
  const animals = ['Bear', 'Cat', 'Dog', 'Elephant', 'Fox', 'Giraffe']
  const colors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#FFA07A',
    '#98D8C8',
    '#F7DC6F',
    '#BB8FCE',
    '#85C1E2',
  ]

  const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
  const animal = animals[Math.floor(Math.random() * animals.length)]
  const color = colors[Math.floor(Math.random() * colors.length)]

  return {
    name: `${adj} ${animal}`,
    color: color,
  }
}

// Get or create user from localStorage
export function getOrCreateUser(): User {
  const stored = localStorage.getItem('temp-user')
  if (stored) {
    return JSON.parse(stored)
  }

  const user = generateTempUser()
  localStorage.setItem('temp-user', JSON.stringify(user))
  return user
}

// Create PartyKit provider for real-time sync
export function createProvider(roomId: string, ydoc: Y.Doc) {
  const host = import.meta.env.DEV
    ? 'localhost:1999' // Local dev - hostname only
    : 'yet-another-collab.kevinkim-ogp.partykit.dev' // deployed hostname

  const user = getOrCreateUser()

  const provider = new PartyKitProvider(host, roomId, ydoc, {
    connect: true,
    protocol: import.meta.env.DEV ? 'ws' : 'wss', // Use ws for local dev, wss for production
  })

  // Add connection status monitoring
  provider.on('status', (event: { status: string }) => {
    console.log('PartyKit connection status:', event.status)
    if (event.status === 'disconnected') {
      console.warn('PartyKit disconnected - will attempt to reconnect')
    } else if (event.status === 'connected') {
      console.log('PartyKit connected successfully')
    } else if (event.status === 'synced') {
      console.log('PartyKit synced successfully')
    }
  })

  // Log initial connection attempt
  console.log(`Connecting to PartyKit at ${host} (room: ${roomId})`)

  return { provider, user }
}

export { Y }

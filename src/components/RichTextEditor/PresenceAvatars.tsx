import { useEffect, useState } from 'react'
import PartyKitProvider from 'y-partykit/provider'

import type { User } from '@/lib/yjs'

interface PresenceAvatarsProps {
  provider: PartyKitProvider
  currentUser: User | null
}

interface PresenceUser extends User {
  clientId: number
}

export function PresenceAvatars({
  provider,
  currentUser,
}: PresenceAvatarsProps) {
  const [users, setUsers] = useState<PresenceUser[]>([])

  useEffect(() => {
    if (!provider || !provider.awareness) {
      return
    }

    const updateUsers = () => {
      const states = provider.awareness.getStates()
      const presenceUsers: PresenceUser[] = []

      states.forEach((state, clientId) => {
        const user = state.user as User | undefined
        if (user && user.name && user.color) {
          presenceUsers.push({
            ...user,
            clientId,
          })
        }
      })

      // Sort by name for consistent display
      presenceUsers.sort((a, b) => a.name.localeCompare(b.name))
      setUsers(presenceUsers)
    }

    // Debounce to prevent multiple rapid updates
    let timeoutId: ReturnType<typeof setTimeout>
    const debouncedUpdate = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(updateUsers, 100)
    }

    provider.awareness.on('change', debouncedUpdate)
    provider.awareness.on('update', debouncedUpdate)

    const handleStatusChange = (event: { status: string }) => {
      if (event.status === 'connected' || event.status === 'synced') {
        updateUsers() // Don't debounce initial connection
      }
    }

    provider.on('status', handleStatusChange)
    updateUsers() // Initial load

    return () => {
      clearTimeout(timeoutId)
      if (provider.awareness) {
        provider.awareness.off('change', debouncedUpdate)
        provider.awareness.off('update', debouncedUpdate)
      }
      provider.off('status', handleStatusChange)
    }
  }, [provider])

  return (
    <div className="border-b bg-gray-50 px-4 py-2 flex items-center justify-end gap-2 min-h-[44px]">
      <div className="flex items-center gap-2 flex-wrap">
        {users.length === 0 ? (
          <span className="text-xs text-gray-400 italic">No one else here</span>
        ) : (
          users.map((user) => (
            <div
              key={user.clientId}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-white border border-gray-200 shadow-sm hover:shadow transition-shadow"
              title={user.name}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white shadow-sm"
                style={{ backgroundColor: user.color }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs text-gray-700 font-medium">
                {user.name}
                {currentUser?.name === user.name ? ' (You)' : ''}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

import { cookies } from 'next/headers'

export async function getUser(): Promise<{ user: null | { id: string; name?: string } }> {
  try {
    // Check for session cookie
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get('session')
    
    if (sessionCookie) {
      // Parse session data from cookie
      try {
        const sessionData = JSON.parse(sessionCookie.value)
        if (sessionData && sessionData.userId) {
          return {
            user: {
              id: sessionData.userId,
              name: sessionData.userName
            }
          }
        }
      } catch {
        // Invalid session cookie format
      }
    }
    
    // Check localStorage fallback (for client-side auth)
    // Note: This won't work in server components, included for completeness
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user')
      if (userData) {
        try {
          const user = JSON.parse(userData)
          if (user && user.id) {
            return { user }
          }
        } catch {
          // Invalid localStorage data
        }
      }
    }
    
    return { user: null }
  } catch (error) {
    console.error('Error getting user session:', error)
    return { user: null }
  }
}
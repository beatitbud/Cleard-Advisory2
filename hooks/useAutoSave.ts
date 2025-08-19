import { useEffect, useRef, useCallback } from 'react'

interface AutoSaveOptions {
  key: string
  delay?: number
  onSave?: (data: any) => void
  onRestore?: (data: any) => void
}

export function useAutoSave<T>(
  data: T,
  options: AutoSaveOptions
) {
  const { key, delay = 1000, onSave, onRestore } = options
  const timeoutRef = useRef<NodeJS.Timeout>()
  const lastSavedRef = useRef<string>()

  // Save data to localStorage
  const saveData = useCallback(() => {
    try {
      const serialized = JSON.stringify(data)
      
      // Only save if data has changed
      if (serialized !== lastSavedRef.current) {
        localStorage.setItem(key, serialized)
        lastSavedRef.current = serialized
        onSave?.(data)
      }
    } catch (error) {
      console.error('Failed to auto-save:', error)
    }
  }, [data, key, onSave])

  // Restore data from localStorage
  const restoreData = useCallback(() => {
    try {
      const saved = localStorage.getItem(key)
      if (saved) {
        const parsed = JSON.parse(saved)
        onRestore?.(parsed)
        return parsed
      }
    } catch (error) {
      console.error('Failed to restore saved data:', error)
    }
    return null
  }, [key, onRestore])

  // Clear saved data
  const clearSaved = useCallback(() => {
    localStorage.removeItem(key)
    lastSavedRef.current = undefined
  }, [key])

  // Auto-save on data change with debounce
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(saveData, delay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [data, delay, saveData])

  // Save on unmount
  useEffect(() => {
    return () => {
      saveData()
    }
  }, [saveData])

  return {
    saveData,
    restoreData,
    clearSaved,
    hasSavedData: () => {
      try {
        return localStorage.getItem(key) !== null
      } catch {
        return false
      }
    }
  }
}

// Hook for auto-saving form data
export function useFormAutoSave(formId: string, formData: any) {
  const autoSave = useAutoSave(formData, {
    key: `form_autosave_${formId}`,
    delay: 2000,
    onSave: () => {
      // Show a subtle indicator that form was auto-saved
      if (typeof window !== 'undefined') {
        const indicator = document.createElement('div')
        indicator.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-3 py-1 rounded text-sm z-50'
        indicator.textContent = 'Draft saved'
        document.body.appendChild(indicator)
        
        setTimeout(() => {
          indicator.style.opacity = '0'
          indicator.style.transition = 'opacity 0.3s'
          setTimeout(() => document.body.removeChild(indicator), 300)
        }, 2000)
      }
    }
  })

  return autoSave
}
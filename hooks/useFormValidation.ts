import { useState, useCallback } from 'react'

interface ValidationRule {
  test: (value: any) => boolean
  message: string
}

interface ValidationRules {
  [key: string]: ValidationRule[]
}

interface ValidationErrors {
  [key: string]: string
}

export function useFormValidation(rules: ValidationRules) {
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Set<string>>(new Set())

  const validateField = useCallback((name: string, value: any) => {
    const fieldRules = rules[name]
    if (!fieldRules) return ''

    for (const rule of fieldRules) {
      if (!rule.test(value)) {
        return rule.message
      }
    }
    return ''
  }, [rules])

  const handleBlur = useCallback((name: string, value: any) => {
    setTouched(prev => new Set(prev).add(name))
    const error = validateField(name, value)
    setErrors(prev => ({
      ...prev,
      [name]: error
    }))
  }, [validateField])

  const handleChange = useCallback((name: string, value: any) => {
    // Only validate if field has been touched
    if (touched.has(name)) {
      const error = validateField(name, value)
      setErrors(prev => ({
        ...prev,
        [name]: error
      }))
    }
  }, [touched, validateField])

  const validateAll = useCallback((formData: any) => {
    const newErrors: ValidationErrors = {}
    let isValid = true

    Object.keys(rules).forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName])
      if (error) {
        newErrors[fieldName] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }, [rules, validateField])

  const resetValidation = useCallback(() => {
    setErrors({})
    setTouched(new Set())
  }, [])

  return {
    errors,
    touched,
    handleBlur,
    handleChange,
    validateAll,
    resetValidation,
    isFieldValid: (name: string) => !errors[name] && touched.has(name)
  }
}

// Common validation rules
export const validationRules = {
  required: (message = 'This field is required'): ValidationRule => ({
    test: (value) => value !== '' && value !== null && value !== undefined,
    message
  }),
  
  email: (message = 'Please enter a valid email'): ValidationRule => ({
    test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message
  }),
  
  minLength: (length: number, message?: string): ValidationRule => ({
    test: (value) => value.length >= length,
    message: message || `Must be at least ${length} characters`
  }),
  
  maxLength: (length: number, message?: string): ValidationRule => ({
    test: (value) => value.length <= length,
    message: message || `Must be no more than ${length} characters`
  }),
  
  pattern: (pattern: RegExp, message: string): ValidationRule => ({
    test: (value) => pattern.test(value),
    message
  }),
  
  matches: (fieldName: string, message = 'Fields must match'): ValidationRule => ({
    test: (value, formData) => value === formData[fieldName],
    message
  })
}
import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  // Initialize state with value from localStorage or default
  const [value, setValue] = useState<T>(() => {
    // Handle SSR/non-browser environment
    if (typeof window === 'undefined') {
      return defaultValue;
    }

    try {
      const stored = localStorage.getItem(key);
      if (stored === null) {
        return defaultValue;
      }
      return JSON.parse(stored) as T;
    } catch {
      // If parsing fails, return default value
      return defaultValue;
    }
  });

  // Save to localStorage whenever value changes
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Handle localStorage errors (e.g., quota exceeded)
      console.warn(`Failed to save "${key}" to localStorage`);
    }
  }, [key, value]);

  // Wrapped setter that handles function updates
  const setStoredValue = useCallback((newValue: T | ((prev: T) => T)) => {
    setValue(newValue);
  }, []);

  return [value, setStoredValue];
}

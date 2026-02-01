import { useState, useEffect } from 'react';

/**
 * Provides a debounced copy of the given value that updates only after the specified delay.
 *
 * @param delay - Delay in milliseconds before the returned value updates; defaults to 300.
 * @returns The debounced value which reflects `value` after the delay.
 */
export function useDebouncedValue<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
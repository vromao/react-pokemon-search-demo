import { useState, useEffect, useCallback } from 'react';

/**
 * A hook that debounces a value change to prevent unnecessary re-renders
 * @param value The value to debounce
 * @param delay The delay in milliseconds
 * @returns An array containing the debounced value and a reset function
 */
export function useDebounce<T>(
  value: T,
  delay: number
): [T, (resetValue?: T) => void] {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  // Reset function to immediately update the debounced value
  // Optional resetValue parameter allows setting to a specific value instead of current value
  const resetDebounce = useCallback(
    (resetValue?: T) => {
      setDebouncedValue(resetValue !== undefined ? resetValue : value);
    },
    [value]
  );

  useEffect(() => {
    // Set a timeout to update the debounced value after delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timeout if the value changes before the delay has passed
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return [debouncedValue, resetDebounce];
}

// useRetries.js
import { useCallback } from 'react';

export const useRetries = (maxAttempts = 3) => {
  const withRetry = useCallback(async (callback, args = []) => {
    let attempts = 0;

    while (attempts < maxAttempts) {
      try {
        const result = await callback(...args);
        return result; // Exit if successful
      } catch (error) {
        attempts += 1;
        console.warn(`Attempt ${attempts} failed`);
        if (attempts >= maxAttempts) throw new Error('Max retry attempts reached');
      }
    }
  }, [maxAttempts]);

  return { withRetry };
};

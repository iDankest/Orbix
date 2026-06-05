import { useState, useRef, useCallback } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const ref = useRef(storedValue);
  ref.current = storedValue;

  const setValue = useCallback((value) => {
    try {
      const newValue = value instanceof Function ? value(ref.current) : value;
      ref.current = newValue;
      setStoredValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error(error);
    }
  }, [key]);

  return [storedValue, setValue];
}

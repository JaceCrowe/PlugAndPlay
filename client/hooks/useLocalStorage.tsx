import React, { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue?: T) {
  // We start off by setting state with either the value in memory, or the initial value
  const [value, setValue] = useState<T>(() => {

    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  // The use effect is to update the local storage on change or remove it if it's falsey 
  useEffect(() => {
    if (value) {
      window.localStorage.setItem(key, JSON.stringify(value));
    } else {
      window.localStorage.removeItem(key);
    }
  }, [key, value]);

// Returns a tuple of the current value and a setterFunction.  A tuple is a typed array with a pre-defined length and types for each index.
// Tuples are great because they allow each element in the array to be a known type of value.
  return [value, setValue] as const;
}

import { useRef } from 'react';

export function useWarningControlledStatusChanged<T>(value: T | undefined) {
  const isControlledRef = useRef(value !== undefined);

  const isControlledBefore = isControlledRef.current; //
  const isControlled = value !== undefined;

  // For the first render, this is always false. 
  if (isControlled !== isControlledBefore) {
    console.warn(`WARN: A component changed from ${isControlled ? 'uncontrolled' : 'controlled'} to ${isControlled ? 'controlled' : 'uncontrolled'}.`)
  }

  isControlledRef.current = isControlled;
}

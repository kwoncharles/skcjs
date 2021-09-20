import { useEffect, useRef } from 'react';

export function useUnmountedRef() {
  const ref = useRef(false);

  useEffect(() => () => {
    ref.current = true;
  }, []);

  return ref;
}

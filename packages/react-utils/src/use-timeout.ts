import { useRef, useCallback, useEffect } from 'react';

type TimeoutProps = {
  allowMultipleTimeout?: boolean;
  clearOnUnmount?: boolean;
};

type TimeoutResult = typeof window.setTimeout;

export function useTimeout({
  allowMultipleTimeout = false,
  clearOnUnmount = true,
}: TimeoutProps = {}): TimeoutResult {
  const clearToken = useRef<number>();
  const clearTokenArray = useRef<number[]>([]);

  const createTimeout: typeof window.setTimeout = useCallback(
    (...params) => {
      const currentToken = window.setTimeout(...params);

      if (allowMultipleTimeout) {
        clearTokenArray.current.push(currentToken);
      } else {
        window.clearTimeout(clearToken.current);
        clearToken.current = currentToken;
      }

      return currentToken;
    },
    [allowMultipleTimeout],
  );

  useEffect(() => () => {
    if (clearOnUnmount) {
      clearTokenArray.current.forEach((token) => {
        window.clearTimeout(token);
      });
      window.clearTimeout(clearToken.current);
    }
  }, [clearOnUnmount]);

  return createTimeout;
}

import { useReducer } from 'react';

export function useForceRender() {
  const [, forceRender] = useReducer((prev) => !prev, false);

  return forceRender;
}

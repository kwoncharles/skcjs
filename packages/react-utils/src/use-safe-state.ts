import type { SetStateAction, Dispatch } from 'react';
import { useState, useCallback } from 'react';
import { useUnmountedRef } from './use-unmounted-ref';

type Setter<S> = Dispatch<SetStateAction<S>>;

export function useSafeState<S>(initialState: S | (() => S)): [S, Setter<S>];

export function useSafeState<S = undefined>(): [S | undefined, Setter<S | undefined>];

export function useSafeState<S>(initialState?: S | (() => S)) {
  const unmounted = useUnmountedRef();
  const [state, setState] = useState(initialState);

  const setStateFn = useCallback(
    (newValue) => {
      if (unmounted.current) return;
      setState(newValue);
    },
    [],
  );

  return [state, setStateFn];
}

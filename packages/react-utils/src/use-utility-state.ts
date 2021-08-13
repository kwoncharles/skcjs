import type { Dispatch, SetStateAction } from 'react';
import { useState, useCallback, useEffect } from 'react';
import { usePrevious } from './use-previous';

type ReactDispatchFn<T> = Dispatch<SetStateAction<T>>;

type UtilityType =
  | 'toggle'
  | 'open-close'
  | 'counter';

export function useUtilityState<T>(
  initialState: T | (() => T),
): [T, ReactDispatchFn<T>];

export function useUtilityState(
  initialState: boolean | (() => boolean),
  type: 'toggle'
): [boolean, () => void];

export function useUtilityState(
  initialState: boolean | (() => boolean),
  type: 'open-close'
): [boolean, { open: () => void; close: () => void }];

export function useUtilityState(
  initialState: number | (() => number),
  type: 'counter'
): [number, { increase: () => void; decrease: () => void }];

export function useUtilityState<T>(
  initialState: T | (() => T),
  type?: UtilityType,
) {
  const [state, setState] = useState(initialState);
  const prevType = usePrevious(type);

  const setTrue = useCallback(() => {
    (setState as unknown as ReactDispatchFn<boolean>)(true);
  }, []);

  const setFalse = useCallback(() => {
    (setState as unknown as ReactDispatchFn<boolean>)(false);
  }, []);

  const toggleState = useCallback(() => {
    (setState as unknown as ReactDispatchFn<boolean>)((prev) => !prev);
  }, []);

  const increase = useCallback(() => {
    (setState as unknown as ReactDispatchFn<number>)((prev) => prev + 1);
  }, []);

  const decrease = useCallback(() => {
    (setState as unknown as ReactDispatchFn<number>)((prev) => prev - 1);
  }, []);

  useEffect(() => {
    if (type !== prevType) {
      setState(initialState);
    }
  }, [type, prevType, initialState]);

  if (type === 'toggle') {
    return [state, toggleState];
  }

  if (type === 'open-close') {
    return [state, {
      open: setTrue,
      close: setFalse,
    }];
  }

  if (type === 'counter') {
    return [state, {
      increase,
      decrease,
    }];
  }

  return [state, setState];
}

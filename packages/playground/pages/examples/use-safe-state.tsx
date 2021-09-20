import { useState } from 'react';
import { useSafeState, useUtilityState } from '@skcjs/react-utils';

export default function UseTimeoutPage() {
  const [show, toggle] = useUtilityState(true, 'toggle');

  return (
    <div className="flex flex-col p-4">
      {show ? (
        <>
          <SafeState unmountEl={toggle} />
          <UnsafeState unmountEl={toggle} />
        </>
      ) : (
        <button onClick={toggle} type="button">
          return
        </button>
      )}
    </div>
  );
}

function SafeState({
  unmountEl,
}: {
  unmountEl: () => void;
}) {
  const [, setState] = useSafeState(1);
  return (
    <button
      onClick={() => {
        unmountEl();

        window.setTimeout(() => {
          // this will be executed after unmount
          setState((prev) => prev + 1);
        });
      }}
      type="button"
    >
      Unmount (No warning)
    </button>
  );
}

function UnsafeState({
  unmountEl,
}: {
  unmountEl: () => void;
}) {
  const [, setState] = useState(1);
  return (
    <button
      onClick={() => {
        unmountEl();

        window.setTimeout(() => {
          // this will be executed after unmount
          setState((prev) => prev + 1);
        });
      }}
      type="button"
    >
      Unmount (Warning will be logged in the dev console)
    </button>
  );
}

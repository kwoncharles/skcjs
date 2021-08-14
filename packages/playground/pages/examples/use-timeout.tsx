import { useTimeout, useUtilityState } from '@skcjs/react-utils';

export default function UseTimeoutPage() {
  const [state, { increase }] = useUtilityState(0, 'counter');
  const createTimeout = useTimeout();

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          createTimeout(() => {
            increase();
          }, 1000);
        }}
      >
        create timeout
      </button>
      <br />
      <br />
      <p>
        Current count:
        {state}
      </p>
    </div>
  );
}

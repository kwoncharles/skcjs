import { useUtilityState } from '@skcjs/react-utils';

export default function UseUtilityStatePage() {
  return (
    <div className="flex p-20 max-w-[1200px] mx-auto">
      <Counter />
      <Toggle />
      <OpenClose />
    </div>
  );
}

function Toggle() {
  const [isOpen, toggle] = useUtilityState(false, 'toggle');

  return (
    <div className="w-1/3">
      <h1 className="text-2xl font-bold text-gray-800">
        Toggle
      </h1>
      <div className="mt-5">
        <div className="flex">
          <Button
            onClick={() => {
              toggle();
            }}
          >
            toggle
          </Button>
        </div>
        <p>
          current state is
          {' '}
          <StateLabel>
            {String(isOpen)}
          </StateLabel>
        </p>
      </div>
    </div>
  );
}

function Counter() {
  const [count, { increase, decrease }] = useUtilityState(0, 'counter');
  return (
    <div className="w-1/3">
      <h1 className="text-2xl font-bold text-gray-800">
        Counter
      </h1>
      <div className="mt-5">
        <div className="flex">
          <Button
            onClick={() => {
              increase();
            }}
          >
            increase
          </Button>
          <Button
            className="ml-2"
            onClick={() => {
              decrease();
            }}
          >
            decrease
          </Button>
        </div>
        <p>
          current count is
          {' '}
          <StateLabel>
            {count}
          </StateLabel>
        </p>
      </div>
    </div>
  );
}

function OpenClose() {
  const [isOpen, { open, close, toggle }] = useUtilityState(false, 'open-close');

  return (
    <div className="w-1/3">
      <h1 className="text-2xl font-bold text-gray-800">
        Open Close
      </h1>
      <div className="mt-5">
        <div className="flex">
          <Button
            onClick={() => {
              open();
            }}
          >
            open
          </Button>
          <Button
            className="ml-2"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
          <Button
            className="ml-2"
            onClick={() => {
              toggle();
            }}
          >
            toggle
          </Button>
        </div>
        <p>
          current status is
          {' '}
          <StateLabel>
            {String(isOpen)}
          </StateLabel>
        </p>
      </div>
    </div>
  );
}

function Button({
  children,
  className,
  ...rest
}: Omit<React.HTMLAttributes<HTMLButtonElement>, 'type'>) {
  return (
    <button
      {...rest}
      type="button"
      className={`${className} py-1.5 px-2.5 rounded-lg ring-1 ring-gray-300 hover:ring-2 text-gray-700 transition-all`}
    >
      {children}
    </button>
  );
}

function StateLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="font-bold text-green-600">
      {children}
    </span>
  );
}

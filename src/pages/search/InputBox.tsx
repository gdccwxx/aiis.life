import { HTMLAttributes, ReactNode, RefObject } from 'react';

interface InputBoxProps extends HTMLAttributes<HTMLElement> {
  inputRef?: RefObject<HTMLInputElement>;
  value?: string;
  children?: ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputBox = ({
  inputRef,
  value,
  children,
  onChange,
  onEnter,
  ...rest
}: InputBoxProps) => {
  return (
    <div className="relative flex w-full flex-row rounded-md border border-black/10 bg-white py-2 shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:border-gray-900/50 dark:bg-gray-700 dark:text-white dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] md:py-3 md:px-4">
      <input
        id="search-input"
        type="text"
        className="inline-block w-11/12 rounded-l-lg border border-gray-200 bg-gray-100 px-4 py-2 outline-0 focus:outline-none focus:ring-0 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
        value={value}
        onChange={onChange}
        onKeyDown={onEnter}
        {...rest}
        ref={inputRef}
      />
      {children}
    </div>
  );
};

export default InputBox;

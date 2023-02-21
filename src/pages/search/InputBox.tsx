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
    <div className="relative flex h-28 w-full pb-16">
      <input
        id="search-input"
        type="text"
        className="w-11/12 rounded-l-lg border border-gray-200 bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
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

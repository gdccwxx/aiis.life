import { HTMLAttributes, ReactNode } from 'react';

interface InputBoxProps extends HTMLAttributes<HTMLElement> {
  ref: React.LegacyRef<HTMLInputElement> | undefined;
  value?: string;
  children?: ReactNode;
  onChange?: (e) => void;
  onEnter?: (e) => void;
}

const InputBox = ({
  value,
  onChange = () => null,
  children,
  ref,
  onEnter,
  ...rest
}: InputBoxProps) => {
  return (
    <div className="relative flex h-28 w-full pb-16">
      <input
        id="search-input"
        type="text"
        className="w-11/12 rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
        value={value}
        onChange={onChange}
        onKeyDown={onEnter}
        {...rest}
        ref={ref}
      />
      {children}
    </div>
  );
};

export default InputBox;

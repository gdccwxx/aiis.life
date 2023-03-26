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
    <div className="relative flex w-full rounded-md border border-black/10 bg-white py-2 shadow-[0_0_10px_rgba(0,0,0,0.10)] md:py-3 md:px-4">
      <input
        id="search-input"
        type="text"
        className="inline-block w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 outline-0 focus:outline-0"
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

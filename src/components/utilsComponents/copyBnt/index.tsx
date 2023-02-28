import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from '../../../ui/toast/toast';
import { HiClipboardCopy } from 'react-icons/hi';

type CopyButtonProps = {
  text: string;
};

export function CopyButton({ text }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // 1 秒后恢复状态
  };

  return (
    <CopyToClipboard text={text} onCopy={handleCopy}>
      <div
        className="flex cursor-pointer gap-2 text-gray-200 transition duration-200 ease-in-out hover:text-gray-100"
        onClick={() => {
          toast.success('Copied!');
        }}
      >
        <HiClipboardCopy
          className="text-gray-200 transition duration-200 ease-in-out hover:text-gray-100"
          size={18}
        />
        <p>{isCopied ? 'Copied' : 'Copy'}</p>
      </div>
    </CopyToClipboard>
  );
}

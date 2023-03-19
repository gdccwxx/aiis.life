import { FC, memo, useState } from 'react';
// import { ConnectButton } from '@mysten/wallet-kit';
import { ThemeToggle } from '@/components/utilsComponents/themeSwitch/ThemeToggle';
import PaymentPopUp from '@/components/utilsComponents/payModal';

type UserCardProps = {
  avatar?: string;
  name: string;
  progress: number;
  progressMax: number;
};

const getRandomAvatarUrl = (seed: string): string => {
  const baseUrl = 'https://robohash.org';
  return `${baseUrl}/${seed}.png`;
};

const UserCard: FC<UserCardProps> = ({
  avatar,
  name,
  progress = 0,
  progressMax = 100
}) => {
  // 进度条
  const progressPercent = `${(progress / progressMax) * 100}%`;

  // displayName 使用邮箱前缀
  let showName = '';
  if (name.indexOf('@') > 0) {
    showName = name.slice(0, name.indexOf('@'));
  } else {
    showName = name;
  }

  const [isOpen, setIsOpen] = useState(false);

  function onClose() {
    setIsOpen(false);
  }

  function onOpen() {
    setIsOpen(true);
  }

  return (
    <div className="h-[150px] flex-1">
      <div className="flex h-[150px] flex-wrap items-center bg-[#f7f7f7] p-6 dark:bg-slate-600">
        <div className="mr-4 flex flex-shrink-0">
          <img
            src={avatar ?? getRandomAvatarUrl(name)}
            alt="Avatar"
            className="h-12 w-12 rounded-full"
          />
          {/* <ConnectButton
            className="mt-1 mr-2 p-1 shadow-none dark:text-gray-200"
            connectText={
              <div className="text-gray-800 dark:text-gray-200">绑定钱包</div>
            }
          /> */}
        </div>
        <div className="mt-2">
          <div className="flex content-center text-sm font-medium text-gray-800 dark:text-gray-200">
            <div className="my-2 mr-2">{showName}</div>
            <ThemeToggle />
            <div className="flex bg-gray-100 text-gray-800 dark:bg-slate-600 dark:text-gray-200">
              {/* <ThemeSwitch /> */}
              {/* <ThemeSelect /> */}
              <div
                className="my-2 ml-1 cursor-pointer font-sans font-bold text-blue-400"
                onClick={() => setIsOpen(true)}
              >
                充值
              </div>
            </div>
          </div>
          <div className="mt-1">
            <div className="h-2 w-40 rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-green-500"
                style={{ width: progressPercent }}
              />
            </div>
          </div>

          <PaymentPopUp isOpen={isOpen} onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default memo(UserCard);

import { FC } from 'react';
// import { ConnectButton } from '@mysten/wallet-kit';
import { ThemeToggle } from '@/components/utilsComponents/themeSwitch/ThemeToggle';

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
  const progressPercent = `${(progress / progressMax) * 100}%`;

  return (
    <div className="h-[150px] flex-1">
      <div className="flex h-[150px] flex-wrap items-center bg-gray-100 p-6 dark:bg-slate-600">
        <div className="mr-4 flex-shrink-0">
          <img
            src={avatar ?? getRandomAvatarUrl(name)}
            alt="Avatar"
            className="h-12 w-12 rounded-full"
          />
        </div>
        <div className="mt-2">
          <div className="text-xl font-medium text-gray-800 dark:text-gray-200">
            {name}
            <div className="flex bg-gray-100 text-gray-800 dark:bg-slate-600 dark:text-gray-200">
              {/* <ConnectButton
                className="mt-1 mr-2 p-1 shadow-none dark:text-gray-200"
                connectText={
                  <div className="text-gray-800 dark:text-gray-200">
                    绑定钱包
                  </div>
                }
              /> */}
              <ThemeToggle />
              {/* <ThemeSwitch /> */}
              {/* <ThemeSelect /> */}
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
        </div>
      </div>
    </div>
  );
};

export default UserCard;

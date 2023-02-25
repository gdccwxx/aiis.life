import { FC } from 'react';
// import { ConnectButton, useWallet, WalletProvider } from '@suiet/wallet-kit';
import { useWallet } from '@suiet/wallet-kit';
import { ConnectButton } from '@mysten/wallet-kit';

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
  const wallet = useWallet();

  return (
    <div className="h-[150px] flex-1">
      <div className="flex flex-wrap items-center bg-gray-100 p-6 shadow-lg dark:bg-slate-600">
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
          </div>
          <div className="mt-1">
            <div className="h-2 w-40 rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-green-500"
                style={{ width: progressPercent }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 p-6 text-gray-800 shadow-lg dark:bg-slate-600 dark:text-gray-200">
        {wallet.connected ? (
          <div className="">{wallet?.address}</div>
        ) : (
          //   <WalletProvider>
          //     <ConnectButton>Connect Wallet</ConnectButton>
          //   </WalletProvider>
          <ConnectButton className="m-0 p-2" />
        )}
      </div>
    </div>
  );
};

export default UserCard;

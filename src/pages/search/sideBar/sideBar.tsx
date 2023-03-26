import { LoadingPage } from '@/ui/loading';
import { FC, memo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import IssueTab from './IssueTab';
import { SideBarProps } from './types';
import UserCard from './userCard';

const SideBar: FC<SideBarProps> = ({
  tabs,
  activeIndex,
  onTabClick,
  // name,
  // progress,
  // progressMax,
  tabPageLoading,
  askFromUrlLoading
}) => {
  return (
    <div className="dark hidden bg-gray-900 md:fixed md:inset-y-0 md:flex md:w-[260px] md:flex-col">
      <div className="flex h-full min-h-0 flex-col ">
        <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
          <div className="flex h-full flex-1 flex-col space-y-1 p-2">
            {/* <a className="mb-2 flex flex-shrink-0 cursor-pointer items-center gap-3 rounded-md border border-white/20 p-3 text-sm text-white transition-colors duration-200 hover:bg-gray-500/10">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              New chat
            </a> */}
            <div className="-mr-2 flex-1 flex-col overflow-y-auto border-b border-white/20">
              {tabPageLoading || askFromUrlLoading ? (
                <LoadingPage />
              ) : (
                tabs.map((tab) => (
                  <IssueTab
                    key={uuidv4()}
                    title={tab.title}
                    onClick={() => onTabClick(tab.id)}
                    isActive={tab.id === activeIndex}
                  />
                ))
              )}
            </div>
            <a className="flex cursor-pointer items-center gap-3 rounded-md p-3 text-sm text-white transition-colors duration-200 hover:bg-gray-500/10">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              我的账户
            </a>
            {/* <a className="flex cursor-pointer items-center gap-3 rounded-md p-3 text-sm text-white transition-colors duration-200 hover:bg-gray-500/10">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Log out
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SideBar);

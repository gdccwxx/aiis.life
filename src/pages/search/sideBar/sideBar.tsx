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
  name,
  progress,
  progressMax,
  tabPageLoading,
  askFromUrlLoading
}) => {
  return (
    <div className="dark hidden bg-gray-900 md:fixed md:inset-y-0 md:flex md:w-[260px] md:flex-col">
      <div className="top-0 flex h-[150px] w-full ">
        <UserCard name={name} progress={progress} progressMax={progressMax} />
      </div>
      <div className="flex-1 flex-col overflow-y-auto border-b border-white/20 py-3">
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
    </div>
  );
};

export default memo(SideBar);

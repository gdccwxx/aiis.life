import { LoadingPage } from '@/ui/loading';
import { FC, memo, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import IssueTab from '../IssueTab';
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
    <div className="invisible w-0 md:visible md:w-1/4">
      <div className="absolute top-0 flex h-[150px] w-0 flex-col md:w-1/4 ">
        <UserCard name={name} progress={progress} progressMax={progressMax} />
      </div>
      <div className="absolute top-[150px] bottom-0 flex w-0 flex-col overflow-y-scroll md:w-1/4">
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

import { LoadingPage } from '@/ui/loading';
import { FC, memo, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import IssueTab from './IssueTab';
import UserCard from './userCard';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useDisclosure
} from '@chakra-ui/react';
import { AiOutlineClose } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { SideBarProps } from './types';

const ChakraDrawerDemo: FC<SideBarProps> = ({
  tabs,
  activeIndex,
  onTabClick,
  name,
  progress,
  progressMax,
  tabPageLoading,
  askFromUrlLoading
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 当去浏览器宽度变化时抽屉收起
  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        onClose();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [onClose]);

  return (
    <>
      {isOpen ? (
        ''
      ) : (
        <button
          className="absolute top-0 left-0 h-12 w-12 transform items-center justify-center rounded-br-full bg-blue-600"
          onClick={onOpen}
        >
          <FiMenu
            size={16}
            style={{ position: 'absolute', left: 10, top: 12 }}
            color="#fff"
          />
        </button>
      )}
      <Drawer
        colorScheme={'blackAlpha'}
        placement={'left'}
        onClose={onClose}
        isOpen={isOpen}
        onOverlayClick={onClose}
      >
        <DrawerOverlay className="h-full w-full transform bg-slate-800 bg-opacity-60">
          <DrawerContent>
            <DrawerBody>
              <div className="flex">
                <div className="w-9/12">
                  <div className="absolute top-0 flex h-[150px] w-9/12">
                    <UserCard
                      name={name}
                      progress={progress}
                      progressMax={progressMax}
                    />
                    <div className="bg-gray-100 p-6 shadow-none dark:bg-slate-600">
                      <button
                        onClick={onClose}
                        type="button"
                        className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 outline-none transition-colors duration-300 hover:bg-gray-400 focus:bg-gray-400 focus:outline-none"
                      >
                        <AiOutlineClose />
                      </button>
                    </div>
                  </div>
                  <div className="absolute top-[150px] bottom-0 flex w-9/12 flex-col overflow-y-scroll">
                    {tabPageLoading || askFromUrlLoading ? (
                      <LoadingPage />
                    ) : (
                      tabs.map((tab) => (
                        <IssueTab
                          key={uuidv4()}
                          title={tab.title}
                          onClick={() => {
                            onClose();
                            setTimeout(() => {
                              onTabClick(tab.id);
                            }, 50);
                          }}
                          isActive={tab.id === activeIndex}
                        />
                      ))
                    )}
                  </div>
                </div>
                <div className="h-screen w-3/12" onClick={onClose} />
              </div>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default memo(ChakraDrawerDemo);

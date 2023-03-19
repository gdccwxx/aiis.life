export interface SideBarProps {
  tabs: Array<{ id: number; title: string }>;
  activeIndex: number;
  onTabClick: (id: number) => void;
  name: string;
  progress: number;
  progressMax: number;
  tabPageLoading?: boolean;
  askFromUrlLoading?: boolean;
}

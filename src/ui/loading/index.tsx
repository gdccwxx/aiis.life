import { LoaderLine } from '@/ui/icon/icons';
import { IconBaseProps } from 'react-icons';

const Loading = (props: IconBaseProps) => (
  <LoaderLine {...props} className="animate-spin" />
);

export default Loading;

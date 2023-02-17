import Routes from '@/routes';
import { BrowserRouter } from 'react-router-dom';
import { AppSettingProvider } from '@/store/appSetting/context';
import { Toaster } from './ui/toast/toast';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AppSettingProvider>
        <Routes />
        <Toaster />
      </AppSettingProvider>
    </BrowserRouter>
  );
};

export default App;

import { FC } from 'react';
import { useTheme } from './ThemeToggle';

interface SwitchProps {
  onSwitch?: () => void;
}

function update() {
  const isDarkMode =
    localStorage.theme === 'dark' ||
    (!localStorage.theme &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) {
    themeColorMeta.setAttribute('content', isDarkMode ? '#0B1120' : '#f8fafc');
  }

  const htmlEl = document.documentElement;
  htmlEl.classList.add('changing-theme');
  htmlEl.classList.toggle('dark', isDarkMode);

  window.setTimeout(() => {
    htmlEl.classList.remove('changing-theme');
  });
}

const ThemeSwitch: FC<SwitchProps> = ({ onSwitch }) => {
  const theme = useTheme();
  const setting = theme.setting;
  const setSetting = theme.e;

  const handleSwitchChange = () => {
    setSetting(setting == 'dark' ? 'light' : 'dark');
    update();
    if (onSwitch) onSwitch();
  };

  return (
    <label className="flex cursor-pointer items-center space-x-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
        Light
      </span>
      <div
        className={`relative inline-block h-5 w-10 transition-colors duration-200 ease-in-out ${
          setting == 'dark'
            ? 'bg-gray-300 dark:bg-gray-600'
            : 'bg-gray-200 dark:bg-gray-500'
        } rounded-full`}
      >
        <input
          type="checkbox"
          className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
          checked={setting == 'dark'}
          onChange={handleSwitchChange}
        />
        <span
          className={`absolute top-0 left-0 block h-5 w-5 transform transition-transform duration-200 ease-in-out ${
            setting == 'dark' ? 'translate-x-5' : ''
          } rounded-full bg-white shadow-lg`}
        />
      </div>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
        Dark
      </span>
    </label>
  );
};

export default ThemeSwitch;

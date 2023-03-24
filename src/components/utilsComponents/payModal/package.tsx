import React, { useState } from 'react';
import Image from '@/ui/loadingImage';

interface PlanProps {
  name: string;
  price: string;
  description: string;
  payCodeUrl?: string;
}

function Plan({
  name,
  price,
  description,
  payCodeUrl
}: PlanProps): JSX.Element {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`mb-5 flex w-[98%] transform cursor-pointer overflow-hidden rounded-lg bg-slate-50 pl-3 transition-all duration-300 dark:bg-slate-600${
        isHover
          ? 'text-white hover:scale-105 hover:bg-blue-200 dark:hover:bg-blue-900'
          : ''
      }`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="grow">
        <h3 className="pt-3 pb-2 text-xl font-semibold text-blue-500 dark:text-blue-100">
          {name}
        </h3>
        <div className="pb-3">
          <p className="text-base font-bold text-blue-400 dark:text-blue-200">
            {description}
          </p>
        </div>
        <p className="mr-4 font-mono text-xl font-bold italic text-blue-500 dark:text-blue-100">
          {price}
        </p>
      </div>
      <Image src={payCodeUrl} className="w-3/12" />
    </div>
  );
}

const MemoizedPlan = React.memo(Plan);

interface PayPackageProps {
  payCodeUrl?: string;
}

function PayPackage({ payCodeUrl }: PayPackageProps): JSX.Element {
  const plans: PlanProps[] = [
    {
      name: '月度套餐',
      price: '26',
      description: '可使用 30 天，存储最多 1000 条数据'
    },
    {
      name: '季度套餐',
      price: '72',
      description: '可使用 90 天，存储最多 3000 条数据'
    },
    {
      name: '年度豪华套餐',
      price: '235',
      description: '可用 1 年，用量 1.2w 条，可提供 API 服务'
    }
  ];

  return (
    <div className="flex-col">
      {plans.map((plan, index) => (
        <MemoizedPlan key={index} payCodeUrl={payCodeUrl} {...plan} />
      ))}
    </div>
  );
}

export default React.memo(PayPackage);

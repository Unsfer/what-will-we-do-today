import { useState, useEffect } from 'react';
import { Prisma } from "@prisma/client";
import cn from '@/lib/classNames';

export default function Home() {
  type ActionWithCreator = Prisma.ActionGetPayload<{
    include: {
      creator: true,
    }
  }>;

  const [data, setData] = useState<[ActionWithCreator] | null>(null);
  const [isLoading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/action/all')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  let users: string[] = [...new Set((data || []).map(d => d.creator?.name))];
  users = users.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
  const colors = ['blue', 'red', 'orange'];
  const userColors = users.reduce((acc: any, user) => (acc[user] ? acc : { ...acc, [user]: colors.shift() }), {});

  return (
    <div className="mb-10">
      <h1 className="text-center font-bold text-2xl">
        Мероприятия
      </h1>
      <div className="mt-5">
        {isLoading && <p>Загрузка...</p>}
        {!isLoading && (!data || !data.length) && <p>Нет мероприятий</p>}
        {!isLoading && data && data.length > 0 && <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
            {data.map(action => (
              <div key={action.id} className="flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className={cn('flex flex-col p-2 rounded-none rounded-l-lg text-gray-200 h-full justify-center font-bold w-12 items-center', `bg-${userColors[action.creator?.name] || 'gray'}-700`)}>
                  <div className='-rotate-90'>{action.creator?.name}</div>
                </div>
                <div className="flex flex-col h-full p-4 leading-normal border-l border-gray-200 dark:border-gray-600">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{action.name}</h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{action.description}</p>
                </div>
              </div>
            ))}
          </div>
        </>}
      </div>
    </div>
  );
}

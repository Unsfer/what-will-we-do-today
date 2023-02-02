import { useState, useEffect } from 'react';
import { Prisma } from "@prisma/client";

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

  return (
    <div className="max-w-screen-sm mb-10">
      <h1 className="text-center font-bold text-2xl">
        Мероприятия
      </h1>
      <div className="mt-5">
        {isLoading && <p>Загрузка...</p>}
        {!isLoading && (!data || !data.length) && <p>Нет мероприятий</p>}
        {!isLoading && data && data.length > 0 && <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
            {data.map(action => (
              <div key={action.id} className="flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="object-cover p-4 rounded-t-lg md:h-auto md:rounded-none md:rounded-l-lg">
                  {action.creator?.name}
                </div>
                <div className="flex flex-col h-full justify-between1 p-4 leading-normal border-l border-gray-200 dark:border-gray-600">
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

import { useState, useEffect } from 'react';
import { Prisma } from "@prisma/client";
import ActionCard from '@/components/actioncard';

export default function Home() {
  type ActionWithCreator = Prisma.ActionGetPayload<{
    include: {
      creator: true,
    }
  }>;

  const [data, setData] = useState<[ActionWithCreator] | null>(null);
  const [isLoading, setLoading] = useState<Boolean>(false);
  
  const [currentRandomAction, setCurrentRandom] = useState<ActionWithCreator | null>(null);
  const [randomlyPickedAction, pickAction] = useState<ActionWithCreator | null>(null);

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

  const getRandom = (max: number) => {
    return Math.floor(Math.random() * max);
  }

  const startRandomising = () => {
    if (!data || !data.length || currentRandomAction) { return; }
    let i = 0;
    const maxI = 10;
    pickAction(null);
    setCurrentRandom(null);
    let interval = setInterval(() => {
      i++;
      const ri = getRandom(data.length);
      setCurrentRandom(data[ri]);
      scrollToAction(data[ri].id);
      if (i >= maxI) {
        clearInterval(interval);
        pickAction(data[ri]);
        setCurrentRandom(null);
      }
    }, 300);
  };

  const scrollToAction = (id: number) => {
    const element = document.getElementById(`action_${id}`);
    element?.scrollIntoView({ block: 'center',  behavior: 'smooth' });
  }

  console.log({ currentRandomAction: currentRandomAction?.id, randomlyPickedAction: randomlyPickedAction?.id });

  return (
    <div className="mb-10">
      <div className='text-center'>
        <h1 className="font-bold text-2xl">
          Мероприятия
        </h1>
        {!isLoading && data && data.length > 0 && <button
          className='w-48 mt-2 border-none bg-blue-700 text-gray-200 hover:bg-blue-800 h-10 w-full rounded-md border text-sm transition-all focus:outline-none'
          onClick={startRandomising}
        >
          Рандом
        </button>}
      </div>
      <div className="mt-5 text-center">
        {isLoading && <p>Загрузка...</p>}
        {!isLoading && (!data || !data.length) && <p>Нет мероприятий</p>}
        {!isLoading && data && data.length > 0 && <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
            {data.map(action => (
              <ActionCard key={action.id}
                action={action}
                userColors={userColors}
                currentRandom={action.id === currentRandomAction?.id}
                picked={action.id === randomlyPickedAction?.id}
              />
            ))}
          </div>
        </>}
        
        {!!(currentRandomAction || randomlyPickedAction) &&
          <div className={`grid ${randomlyPickedAction ? 'z-30' : '-z-30'}`} style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
            <ActionCard
              action={randomlyPickedAction || currentRandomAction}
              userColors={userColors}
              picked={!!randomlyPickedAction}
              fullscreen
            />

            {randomlyPickedAction && 
              <div className='flex justify-center mt-4 z-20'>
                <button
                  className='w-48 border-none bg-blue-700 text-gray-200 hover:bg-blue-800 flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none'
                  onClick={() => {
                    pickAction(null);
                    document.scrollingElement?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                  }}
                >
                  <p>OK</p>
                </button>
              </div>
            }
          </div>
        }
      </div>
    </div>
  );
}

"use client";
import { Prisma } from "@prisma/client";
import cn from '@/lib/classNames';
import styles from "./actioncard.module.css";

type ActionWithCreator = Prisma.ActionGetPayload<{
  include: {
    creator: true,
  }
}>;

export default function ActionCard({ action, userColors, currentRandom, picked, fullscreen } 
    : { action: ActionWithCreator | null, userColors: any, currentRandom?: Boolean, picked?: Boolean, fullscreen?: Boolean }) {
  if (!action) { return null; }
  return (
    <div id={`action_${action.id}`} className={cn(
      'flex flex-row text-left items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700',
      styles.actionCard,
      currentRandom ? styles.currentRandom : '',
      picked ? styles.picked : '',
      fullscreen ? styles.fullscreen : '',
    )}>
      <div className={cn(
        'flex flex-col p-2 rounded-none rounded-l-lg text-gray-200 h-full justify-center font-bold w-12 items-center opacity-70', 
        `bg-${userColors[action.creator?.name] || 'gray'}-700`,
        styles.user,
      )}>
        <div className='-rotate-90'>{action.creator?.name}</div>
      </div>
      <div className={cn(
        'flex flex-col h-full p-4 leading-normal border-l border-gray-200 dark:border-gray-600',
        styles.cardInfo,
      )}>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{action.name}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{action.description}</p>
      </div>
    </div>
  );
}

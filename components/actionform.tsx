"use client";

import { useState } from "react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Form() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        fetch("/api/action/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: e.currentTarget.atitle.value,
            description: e.currentTarget.description.value,
          }),
        }).then(async (res) => {
          setLoading(false);
          if (res.status === 200) {
            toast.success("Мероприятие создано!");
            setTimeout(() => {
              router.push("/");
            }, 2000);
          } else {
            toast.error(await res.text());
          }
        });
      }}
      className="flex flex-col space-y-4 bg-gray-50 dark:bg-gray-800 px-4 py-8 sm:px-16"
      method="POST"
      autoComplete="off"
    >
      <div>
        <label
          htmlFor="atitle"
          className="block text-xs text-gray-600 dark:text-gray-200 uppercase"
        >
          Заголовок
        </label>
        <input
          id="atitle"
          name="atitle"
          type="text"
          placeholder="Заголовок мероприятия"
          required
          className="mt-1 block w-full appearance-none rounded-md bg-gray-50 border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-xs text-gray-600 dark:text-gray-200 uppercase"
        >
          Описание
        </label>
        <textarea
          id="description"
          name="description"
          required
          className="mt-1 block w-full appearance-none rounded-md bg-gray-50 border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          rows={5}
        />
      </div>
      <button
        disabled={loading}
        className={`${
          loading
            ? "cursor-not-allowed border-gray-200 bg-gray-100"
            : "border-none bg-blue-700 text-gray-200 hover:bg-blue-800"
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <p>Создать</p>
        )}
      </button>
    </form>
  );
}

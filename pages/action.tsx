import Form from "@/components/actionform";

export default function Action() {
  return (
    <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-700 shadow-xl">
      <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 px-4 py-6 pt-8 text-center text-gray-900 dark:text-gray-200 sm:px-16">
        <h3 className="text-xl font-semibold">Создать мероприятие</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Введите заголовок и опишите новое мероприятие
        </p>
      </div>
      <Form/>
    </div>
  );
}

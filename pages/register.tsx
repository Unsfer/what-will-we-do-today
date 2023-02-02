import Form from "@/components/form";

export default function Register() {
  return (
    <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
      <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
        <h3 className="text-xl font-semibold">Регистрация</h3>
        <p className="text-sm text-gray-500">
          Создайте свой аккаунт с логином и паролем
        </p>
      </div>
      <Form type="register"/>
    </div>
  );
}

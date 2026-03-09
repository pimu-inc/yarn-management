import { logout } from "@/app/(main)/logout/actions";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-md mx-auto flex items-center justify-between px-4 h-12">
        <h1 className="text-lg font-bold text-pink-500">けいと帳</h1>
        <form action={logout}>
          <button
            type="submit"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ログアウト
          </button>
        </form>
      </div>
    </header>
  );
}

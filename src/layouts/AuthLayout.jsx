import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#f7f5f1] px-4 py-6 sm:px-6 lg:py-10">
      <Outlet />
    </main>
  );
}

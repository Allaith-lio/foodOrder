import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-page px-4 py-6 sm:px-6 lg:py-10">
      <Outlet />
    </main>
  );
}

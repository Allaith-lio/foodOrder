import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Clock3,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
  Truck,
  Utensils,
  UserRound,
} from "lucide-react";

const foodPhoto =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=85";

export default function LoginAndRegister() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === "/login";
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function switchMode() {
    setMessage("");
    setShowPassword(false);
    navigate(isLogin ? "/register" : "/login");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setMessage(
      "Authentication isn't connected yet. Your form is ready for account setup.",
    );
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#f7f5f1] px-4 py-6 sm:px-6 lg:py-10">
      <div className="grid min-h-[680px] w-full max-w-6xl overflow-hidden rounded-[28px] bg-white shadow-[0_24px_80px_rgba(47,37,24,0.12)] lg:grid-cols-[0.92fr_1.08fr]">
        <section className="flex flex-col px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2.5 no-underline"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
              <Utensils className="size-5" aria-hidden="true" />
            </span>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Crave<span className="text-primary">Dash</span>
            </span>
          </Link>

          <div className="my-auto py-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#fff3e8] px-3 py-1.5 text-xs font-semibold text-[#bd5b22]">
              <Sparkles className="size-3.5" aria-hidden="true" />
              {isLogin
                ? "Welcome back to the good stuff"
                : "Your next favorite meal awaits"}
            </div>
            <h1 className="!text-3xl !leading-tight text-slate-900 sm:!text-4xl">
              {isLogin ? "Good to see you again." : "Create your account."}
            </h1>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
              {isLogin
                ? "Sign in to pick up where you left off and get your favorites delivered."
                : "Join CraveDash for delicious discoveries and doorstep delivery."}
            </p>

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              {!isLogin && (
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">
                    Username
                  </span>
                  <span className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 px-3.5 transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
                    <UserRound
                      className="size-[18px] shrink-0 text-slate-400"
                      aria-hidden="true"
                    />
                    <input
                      name="username"
                      type="text"
                      autoComplete="username"
                      placeholder="How should we call you?"
                      required
                      className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                    />
                  </span>
                </label>
              )}

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Email address
                </span>
                <span className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 px-3.5 transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
                  <Mail
                    className="size-[18px] shrink-0 text-slate-400"
                    aria-hidden="true"
                  />
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </span>
                <span className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 px-3.5 transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
                  <LockKeyhole
                    className="size-[18px] shrink-0 text-slate-400"
                    aria-hidden="true"
                  />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    placeholder="Enter your password"
                    minLength={8}
                    required
                    className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="rounded-md p-1 text-slate-400 transition hover:text-slate-700"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="size-[18px]" aria-hidden="true" />
                    ) : (
                      <Eye className="size-[18px]" aria-hidden="true" />
                    )}
                  </button>
                </span>
              </label>

              {isLogin && (
                <div className="flex justify-end pt-0.5">
                  <button
                    type="button"
                    className="text-xs font-semibold text-primary hover:text-primary-hover"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-white shadow-[0_8px_18px_rgba(255,90,54,0.22)] transition hover:bg-primary-hover active:scale-[0.99]"
              >
                {isLogin ? "Sign in" : "Create account"}
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
              {message && (
                <p
                  className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800"
                  role="status"
                >
                  {message}
                </p>
              )}
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              {isLogin ? "New to CraveDash?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={switchMode}
                className="font-bold text-primary transition hover:text-primary-hover"
              >
                {isLogin ? "Create an account" : "Sign in"}
              </button>
            </p>
          </div>

          <p className="text-center text-xs text-slate-400">
            By continuing, you agree to our{" "}
            <a href="#terms" className="text-slate-500 underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="#privacy" className="text-slate-500 underline">
              Privacy Policy
            </a>
            .
          </p>
        </section>

        <section
          className="relative min-h-[420px] overflow-hidden bg-[#54220f] lg:min-h-[680px]"
          aria-label="CraveDash food delivery"
        >
          <img
            src={foodPhoto}
            alt="A table filled with freshly prepared food"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#27130c]/90 via-[#27130c]/20 to-[#27130c]/15" />
          <div className="absolute left-8 top-8 flex items-center gap-2 rounded-full border border-white/25 bg-black/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
            <span className="flex size-6 items-center justify-center rounded-full bg-emerald-400 text-emerald-950">
              <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
            </span>
            Your table, delivered
          </div>
          <div className="absolute inset-x-0 bottom-0 p-8 text-white sm:p-10 xl:p-14">
            <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-200">
              <span className="h-px w-8 bg-orange-200" />
              Make room for something delicious
            </p>
            <h2 className="max-w-lg !text-4xl !leading-tight text-white xl:!text-5xl">
              Good food.
              <br />
              Great mood.
              <br />
              Right on time.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/80">
              Skip the kitchen and order the city’s best. Crave it. Tap it.
              Enjoy it
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3.5 py-3 backdrop-blur-md">
                <Truck className="size-4 text-orange-200" aria-hidden="true" />
                <span className="text-xs font-semibold">Fast delivery</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3.5 py-3 backdrop-blur-md">
                <Clock3 className="size-4 text-orange-200" aria-hidden="true" />
                <span className="text-xs font-semibold">Track every order</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

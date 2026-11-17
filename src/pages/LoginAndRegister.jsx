import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Clock3,
  Eye,
  EyeOff,
  Moon,
  Sparkles,
  Sun,
  Truck,
} from "lucide-react";
import { useTheme } from "../hooks/ThemeContext";
import Logo from "../components/common/Logo";
import { loginFields, registerFields } from "../data/formFields";
import { useForm } from "../hooks/useForm";
import FormFields from "../components/common/FormFields";

const foodPhoto =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=85";

export default function LoginAndRegister() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === "/login";
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const { isDarkMode, toggleTheme } = useTheme();
  const baseFields = isLogin ? loginFields : registerFields;
  const fields = {
    ...baseFields,
    password: {
      ...baseFields.password,
      type: showPassword ? "text" : "password",
    },
  };
  const { values, errors, handleChange, handleBlur, validateAll } =
    useForm(fields);

  const passwordTrailing = (name) =>
    name === "password" ? (
      <button
        type="button"
        onClick={() => setShowPassword((visible) => !visible)}
        className="rounded-md p-1 text-muted transition hover:text-ink"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <EyeOff className="size-[18px]" aria-hidden="true" />
        ) : (
          <Eye className="size-[18px]" aria-hidden="true" />
        )}
      </button>
    ) : null;

  function switchMode() {
    setMessage("");
    setShowPassword(false);
    navigate(isLogin ? "/register" : "/login");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateAll();
    if (Object.keys(nextErrors).length > 0) {
      setMessage("Please fix the highlighted fields.");
      return;
    }
    setMessage(
      "Authentication isn't connected yet. Your form is ready for account setup.",
    );
  }

  return (
    <div className="grid grid-cols-1 min-h-[680px] w-full max-w-6xl overflow-hidden rounded-[28px] bg-surface shadow-card lg:grid-cols-[0.92fr_1.08fr]">
      <section className="order-2 flex flex-col px-6 py-8 sm:px-10 sm:py-10 lg:order-1 lg:px-14 lg:py-12">
        <div className="flex items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2.5 no-underline"
          >
            <Logo />
          </Link>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-line bg-surface text-ink transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
          >
            {isDarkMode ? (
              <Sun className="size-[21px] text-amber-400" strokeWidth={1.9} />
            ) : (
              <Moon className="size-[21px]" strokeWidth={1.9} />
            )}
          </button>
        </div>

        <div className="my-auto py-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" aria-hidden="true" />
            {isLogin
              ? "Welcome back to the good stuff"
              : "Your next favorite meal awaits"}
          </div>
          <h1 className="!text-3xl !leading-tight text-ink sm:!text-4xl">
            {isLogin ? "Good to see you again." : "Create your account."}
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
            {isLogin
              ? "Sign in to pick up where you left off and get your favorites delivered."
              : "Join CraveDash for delicious discoveries and doorstep delivery."}
          </p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <FormFields
              fields={fields}
              values={values}
              errors={errors}
              onChange={handleChange}
              onBlur={handleBlur}
              trailingFor={passwordTrailing}
            />

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

          <p className="mt-6 text-center text-sm text-muted">
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

        <p className="text-center text-xs text-muted">
          By continuing, you agree to our{" "}
          <a href="#terms" className="text-muted underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="#privacy" className="text-muted underline">
            Privacy Policy
          </a>
          .
        </p>
      </section>

      <section
        className="order-1 relative min-h-[320px] overflow-hidden bg-[#54220f] lg:order-2 lg:min-h-[680px]"
        aria-label="CraveDash food delivery"
      >
        <img
          src={foodPhoto}
          alt="A table filled with freshly prepared food"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#27130c]/90 via-[#27130c]/20 to-[#27130c]/15" />
        <div className="absolute left-4 top-4 sm:left-8 sm:top-8 flex items-center gap-2 rounded-full border border-white/25 bg-black/30 px-3 py-1.5 text-xs sm:text-sm font-medium text-white backdrop-blur-md">
          <span className="flex size-5 sm:size-6 items-center justify-center rounded-full bg-emerald-400 text-emerald-950">
            <Check className="size-3 sm:size-3.5" strokeWidth={3} aria-hidden="true" />
          </span>
          Your table, delivered
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-10 xl:p-14">
          <p className="mb-2 sm:mb-4 flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-orange-200">
            <span className="h-px w-6 sm:w-8 bg-orange-200" />
            Make room for something delicious
          </p>
          <h2 className="max-w-lg text-2xl sm:text-3xl lg:!text-4xl xl:!text-5xl !leading-tight text-white">
            Good food.
            <br />
            Great mood.
            <br />
            Right on time.
          </h2>
          <p className="mt-2 sm:mt-4 max-w-md text-xs sm:text-sm leading-relaxed text-white/80">
            Skip the kitchen and order the city’s best. Crave it. Tap it.
            Enjoy it
          </p>
          <div className="mt-4 sm:mt-8 flex flex-row flex-wrap gap-2 sm:gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 sm:px-3.5 sm:py-3 backdrop-blur-md">
              <Truck className="size-3.5 sm:size-4 text-orange-200" aria-hidden="true" />
              <span className="text-[11px] sm:text-xs font-semibold">Fast delivery</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 sm:px-3.5 sm:py-3 backdrop-blur-md">
              <Clock3 className="size-3.5 sm:size-4 text-orange-200" aria-hidden="true" />
              <span className="text-[11px] sm:text-xs font-semibold">Track every order</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

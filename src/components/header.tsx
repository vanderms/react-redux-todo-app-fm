import { useAppDispatch, useAppSelector } from "@/services/hooks/app-hooks";
import { toggleTheme } from "@/services/features/theme-slice";

const getSrc = (mode: string, viewport: string): string => {
  return `images/bg-${viewport}-${mode}.jpg`;
};

export function Header() {
  const mode = useAppSelector((state) => state.theme.mode);
  const dispatch = useAppDispatch();

  return (
    <header className="relative pt-12 w-full xl:pt-[4.375rem]">
      <picture className="absolute top-0 left-0 w-full h-[12.5rem] xl:h-[18.75rem]">
        <source media="(min-width: 45rem)" srcSet={getSrc(mode, "desktop")} />
        <img
          src={getSrc(mode, "mobile")}
          alt=""
          className="max-w-none absolute top-0 left-0 w-full h-full object-cover object-center"
        />
      </picture>
      <div className="container relative z-10 flex items-center justify-between xl:h-[2.5rem]">
        <h1 className="sr-only"> Todo</h1>
        <div className="w-[6.8125rem] xl:w-[10.4375rem]">
          <img src="/images/logo.svg" alt="" className="xl:" />
        </div>

        <button
          aria-label="toggle theme"
          onClick={() => dispatch(toggleTheme())}
          className="w-5 xl:w-[1.625rem]"
        >
          <img src={`icons/${mode === "light" ? "icon-moon" : "icon-sun"}.svg`} alt="" />
        </button>
      </div>
    </header>
  );
}

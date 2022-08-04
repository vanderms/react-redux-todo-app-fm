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
      <div className="container relative z-10 flex items-center justify-between">
        <h1 className="text-[2.5rem] leading-[1] tracking-[15px] text-[#fff] font-bold">
          TODO
        </h1>
        <button aria-label="toggle theme" onClick={() => dispatch(toggleTheme())}>
          <img src={`icons/${mode === "light" ? "icon-moon" : "icon-sun"}.svg`} alt="" />
        </button>
      </div>
    </header>
  );
}

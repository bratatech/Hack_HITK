import React from "react";

export default function Button({
  as,
  href,
  to,
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const Comp = as || (href ? "a" : "button");
  const base =
    "inline-flex items-center justify-center rounded-xl font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary:
      "bg-primary text-navy hover:bg-primary/90 active:scale-[0.99] px-5 py-3 ring-primary/40 ring-offset-transparent",
    ghost:
      "bg-white/10 text-ivory hover:bg-white/20 px-5 py-3 ring-white/30 ring-offset-transparent",
  };
  const cls = `${base} ${variants[variant] ?? variants.primary} ${className}`;
  const extra = {};
  if (href) extra.href = href;
  if (to) extra.href = to; // keep simple; we pass Link via `as` when routing

  return (
    <Comp className={cls} {...extra} {...props}>
      {children}
    </Comp>
  );
}

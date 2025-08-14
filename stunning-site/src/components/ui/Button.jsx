import React from "react";

/**
 * Tiny helper to join class strings safely
 */
function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Button
 * - Variants: "primary" (solid mint) and "glass" (frosted/translucent)
 * - Works as <button> or <a> via the `as` prop
 * - Accessible focus styles, disabled state, small press animation
 */
export default function Button({
  as = "button",
  variant = "primary",
  href,
  className = "",
  disabled = false,
  children,
  ...props
}) {
  const Comp = as === "a" ? "a" : "button";

  const base =
    "inline-flex items-center justify-center rounded-2xl px-5 py-3 " +
    "font-medium transition active:scale-[0.98] will-change-transform " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
    "focus-visible:ring-offset-transparent";

  const stylesByVariant = {
    primary:
      // Mint pill with dark text, soft shadow + hover
      "bg-primary text-navy shadow-soft hover:opacity-90 ",
    glass:
      // Translucent, blurred glass with subtle border
      "bg-white/10 text-ivory border border-white/15 backdrop-blur-md " +
      "hover:bg-white/15 ",
  };

  const disabledClasses = disabled ? "opacity-60 pointer-events-none" : "";

  const classes = cx(base, stylesByVariant[variant] || stylesByVariant.primary, disabledClasses, className);

  const extraProps = {};
  if (Comp === "a") {
    extraProps.href = href || "#";
    extraProps.role = "button";
  } else {
    extraProps.type = props.type || "button";
    extraProps.disabled = disabled;
  }

  return (
    <Comp className={classes} {...extraProps} {...props}>
      {children}
    </Comp>
  );
}

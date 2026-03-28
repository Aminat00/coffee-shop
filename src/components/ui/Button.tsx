import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "gold";
  href?: string;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  fullWidth = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full font-semibold text-sm tracking-wide transition-all duration-300";
  const variants = {
    primary:
      "bg-navy text-white border-2 border-navy px-9 py-4 hover:bg-navy-dark",
    secondary:
      "bg-transparent text-navy border-2 border-navy px-9 py-4 hover:bg-navy-pale",
    gold: "bg-gold text-navy-deeper font-bold px-9 py-4 hover:bg-gold-light",
  };
  const width = fullWidth ? "w-full" : "";
  const classes = `${base} ${variants[variant]} ${width} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

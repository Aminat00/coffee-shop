interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variants = {
    default: "bg-white text-navy font-semibold",
    outline: "bg-transparent text-navy border border-navy",
  };

  return (
    <span
      className={`inline-block rounded-full px-4 py-1.5 text-xs tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

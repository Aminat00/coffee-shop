import Link from "next/link";

interface SectionHeaderProps {
  tag: string;
  title: string;
  link?: { text: string; href: string };
  tagColor?: string;
  titleColor?: string;
}

export function SectionHeader({
  tag,
  title,
  link,
  tagColor = "text-navy",
  titleColor = "text-text-dark",
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-4">
        <span
          className={`text-xs font-semibold uppercase tracking-[4px] ${tagColor}`}
        >
          {tag}
        </span>
        <h2
          className={`font-heading text-3xl md:text-4xl lg:text-5xl font-normal leading-tight ${titleColor}`}
        >
          {title}
        </h2>
      </div>
      {link && (
        <Link
          href={link.href}
          className="text-sm font-semibold text-navy tracking-wide border-b-2 border-navy pb-0.5 transition-opacity hover:opacity-70 shrink-0"
        >
          {link.text}
        </Link>
      )}
    </div>
  );
}

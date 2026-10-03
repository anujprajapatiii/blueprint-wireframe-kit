import type { ComponentProps, ReactNode } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Info,
  Layers3,
  LoaderCircle,
  TriangleAlert,
  X,
} from "lucide-react";
import { Button, cn } from "./kit";

const alertIcons = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  error: CircleAlert,
};

export function Alert({
  title,
  children,
  variant = "info",
  className,
  ...props
}: Omit<ComponentProps<"div">, "title"> & {
  title: ReactNode;
  variant?: keyof typeof alertIcons;
}) {
  const Icon = alertIcons[variant];
  return (
    <div
      className={cn(
        "flex gap-3 rounded-md border border-border bg-muted/50 p-4 text-foreground",
        className,
      )}
      {...props}
    >
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <div className="min-w-0 space-y-1">
        <p className="text-sm font-semibold leading-5">
          <span className="sr-only">{variant}: </span>
          {title}
        </p>
        {children && (
          <div className="text-sm leading-6 text-muted-foreground">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

export function Table({ className, ...props }: ComponentProps<"table">) {
  return (
    <div className="w-full overflow-x-auto">
      <table
        className={cn("w-full border-collapse text-left text-sm", className)}
        {...props}
      />
    </div>
  );
}

export function TableHeader({ className, ...props }: ComponentProps<"thead">) {
  return (
    <thead
      className={cn("border-b border-border bg-muted/50", className)}
      {...props}
    />
  );
}

export function TableBody({ className, ...props }: ComponentProps<"tbody">) {
  return (
    <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  );
}

export function TableRow({ className, ...props }: ComponentProps<"tr">) {
  return <tr className={cn("border-b border-border", className)} {...props} />;
}

export function TableHead({
  className,
  scope = "col",
  ...props
}: ComponentProps<"th">) {
  return (
    <th
      scope={scope}
      className={cn(
        "h-11 px-4 py-3 font-medium text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: ComponentProps<"td">) {
  return (
    <td
      className={cn("px-4 py-3 align-middle text-foreground", className)}
      {...props}
    />
  );
}

export function TableCaption({
  className,
  ...props
}: ComponentProps<"caption">) {
  return (
    <caption
      className={cn(
        "caption-bottom px-4 pt-4 text-left text-sm leading-5 text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumb({
  items,
  className,
  ...props
}: ComponentProps<"nav"> & { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className={className} {...props}>
      <ol className="flex flex-wrap items-center gap-x-2 text-sm">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          return (
            <li
              key={`${item.label}-${index}`}
              className="flex min-h-10 items-center gap-2"
            >
              {index > 0 && (
                <ChevronRight
                  className="size-3.5 text-muted-foreground"
                  aria-hidden="true"
                />
              )}
              {isCurrent ? (
                <span
                  aria-current="page"
                  className="font-medium text-foreground"
                >
                  {item.label}
                </span>
              ) : item.href && item.href !== "#" ? (
                <a
                  href={item.href}
                  className="inline-flex min-h-10 items-center rounded-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-muted-foreground">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
  ...props
}: Omit<ComponentProps<"nav">, "onChange"> & {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const count = Number.isFinite(totalPages)
    ? Math.max(1, Math.floor(totalPages))
    : 1;
  const current = Number.isFinite(page)
    ? Math.min(count, Math.max(1, Math.floor(page)))
    : 1;
  const visiblePages = Array.from(
    new Set([
      1,
      ...Array.from(
        { length: Math.min(3, count) },
        (_, index) =>
          Math.min(Math.max(current - 1, 1), Math.max(count - 2, 1)) + index,
      ),
      count,
    ]),
  ).sort((a, b) => a - b);

  return (
    <nav aria-label="Pagination" className={className} {...props}>
      <ul className="flex flex-wrap items-center gap-1">
        <li>
          <Button
            variant="outline"
            className="size-10 p-0"
            disabled={current === 1}
            aria-label="Previous page"
            onClick={() => onPageChange(current - 1)}
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </Button>
        </li>
        {visiblePages.map((number, index) => (
          <li key={number} className="flex items-center gap-1">
            {index > 0 && number - visiblePages[index - 1] > 1 && (
              <span
                className="flex size-10 items-center justify-center text-muted-foreground"
                aria-hidden="true"
              >
                …
              </span>
            )}
            <Button
              variant={number === current ? "default" : "ghost"}
              className="size-10 p-0"
              aria-label={`Page ${number}`}
              aria-current={number === current ? "page" : undefined}
              onClick={() => onPageChange(number)}
            >
              {number}
            </Button>
          </li>
        ))}
        <li>
          <Button
            variant="outline"
            className="size-10 p-0"
            disabled={current === count}
            aria-label="Next page"
            onClick={() => onPageChange(current + 1)}
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export function EmptyState({
  title,
  description,
  children,
  className,
  ...props
}: Omit<ComponentProps<"div">, "title"> & {
  title: ReactNode;
  description: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-md border border-dashed border-border px-6 py-8 text-center",
        className,
      )}
      {...props}
    >
      <div className="mb-4 flex size-11 items-center justify-center rounded-md border border-border bg-muted">
        <Layers3 className="size-5 text-muted-foreground" aria-hidden="true" />
      </div>
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="mt-2 max-w-72 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      {children && (
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {children}
        </div>
      )}
    </div>
  );
}

export function ImagePlaceholder({
  label = "Image placeholder",
  className,
  ...props
}: ComponentProps<"div"> & { label?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative flex aspect-video items-center justify-center overflow-hidden rounded-md border border-dashed border-border bg-muted/40",
        className,
      )}
      {...props}
    >
      <svg
        className="pointer-events-none absolute inset-0 size-full text-border"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0 0L100 100M100 0L0 100"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span
        className="relative rounded-sm border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground"
        aria-hidden="true"
      >
        {label}
      </span>
    </div>
  );
}

export function Toast({
  message,
  announce = true,
  onDismiss,
  className,
  ...props
}: ComponentProps<"div"> & {
  message: string;
  announce?: boolean;
  onDismiss: () => void;
}) {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-3 rounded-md border border-border bg-card p-3 text-foreground",
        className,
      )}
      {...props}
    >
      <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
      <p
        role={announce ? "status" : undefined}
        aria-atomic="true"
        className="flex-1 text-sm leading-6"
      >
        {message}
      </p>
      <Button
        variant="ghost"
        className="size-10 shrink-0 p-0"
        aria-label="Dismiss notification"
        onClick={onDismiss}
      >
        <X className="size-4" aria-hidden="true" />
      </Button>
    </div>
  );
}

export function Spinner({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  const icon = (
    <LoaderCircle
      className={cn(
        "size-4 animate-spin motion-reduce:animate-none",
        className,
      )}
      aria-hidden="true"
    />
  );
  return label ? (
    <span role="status" className="inline-flex items-center gap-2">
      {icon}
      <span className="sr-only">{label}</span>
    </span>
  ) : (
    icon
  );
}

export function KeyboardKey({ className, ...props }: ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "inline-flex min-h-6 min-w-6 items-center justify-center rounded-sm border border-border bg-muted px-1.5 font-mono text-sm text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PlaceType } from "@/lib/supabase";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        cafe: "border-transparent bg-amber-100 text-amber-800 hover:bg-amber-200/90 dark:bg-amber-900/30 dark:text-amber-400",
        restaurant: "border-transparent bg-red-100 text-red-800 hover:bg-red-200/90 dark:bg-red-900/30 dark:text-red-400",
        attraction: "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200/90 dark:bg-blue-900/30 dark:text-blue-400",
        recommendation: "border-transparent bg-green-100 text-green-800 hover:bg-green-200/90 dark:bg-green-900/30 dark:text-green-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export function PlaceTypeBadge({ type }: { type: PlaceType }) {
  const labels = {
    cafe: '카페',
    restaurant: '맛집',
    attraction: '관광지',
    recommendation: '추천'
  };

  return (
    <Badge variant={type as any}>{labels[type]}</Badge>
  );
}

export { Badge, badgeVariants };
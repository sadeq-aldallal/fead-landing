import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 touch-target active:scale-[0.98] select-none button-mobile-touch",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm [@media(hover:hover)]:hover:bg-primary/90 active:bg-primary/95",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm [@media(hover:hover)]:hover:bg-destructive/90 active:bg-destructive/95",
        outline:
          "border border-input bg-background shadow-sm [@media(hover:hover)]:hover:bg-accent [@media(hover:hover)]:hover:text-accent-foreground active:bg-accent/80",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm [@media(hover:hover)]:hover:bg-secondary/80 active:bg-secondary/90",
        ghost: "[@media(hover:hover)]:hover:bg-accent [@media(hover:hover)]:hover:text-accent-foreground active:bg-accent/80",
        link: "text-primary underline-offset-4 [@media(hover:hover)]:hover:underline active:underline",
        brand:
          "bg-primary text-primary-foreground shadow-sm [@media(hover:hover)]:hover:bg-primary/90 active:bg-primary/95 focus-visible:ring-primary",
        "brand-outline":
          "border border-primary text-primary bg-transparent shadow-sm [@media(hover:hover)]:hover:bg-primary [@media(hover:hover)]:hover:text-primary-foreground active:bg-primary/95 focus-visible:ring-primary",
        "brand-ghost": 
          "text-primary [@media(hover:hover)]:hover:bg-primary/10 active:bg-primary/20 focus-visible:ring-primary/20",
        success:
          "bg-green-600 text-white shadow-sm [@media(hover:hover)]:hover:bg-green-700 active:bg-green-800",
        warning:
          "bg-yellow-600 text-white shadow-sm [@media(hover:hover)]:hover:bg-yellow-700 active:bg-yellow-800",
        info:
          "bg-blue-600 text-white shadow-sm [@media(hover:hover)]:hover:bg-blue-700 active:bg-blue-800",
      },
      size: {
        xs: "min-h-[36px] px-3 py-1.5 text-xs [&_svg]:size-3",
        sm: "min-h-[44px] px-4 py-2 text-sm [&_svg]:size-4",
        default: "min-h-[48px] px-6 py-3 text-base sm:text-sm [&_svg]:size-4",
        lg: "min-h-[52px] px-8 py-4 text-lg [&_svg]:size-5",
        xl: "min-h-[56px] px-10 py-5 text-xl [&_svg]:size-6",
        icon: "min-h-[48px] min-w-[48px] [&_svg]:size-5",
        "icon-sm": "min-h-[44px] min-w-[44px] [&_svg]:size-4",
        "icon-lg": "min-h-[52px] min-w-[52px] [&_svg]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  loadingText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    loading = false,
    loadingText,
    leftIcon,
    rightIcon,
    disabled,
    children,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    const isDisabled = disabled || loading
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading && (
          <Loader2 className="animate-spin" aria-hidden="true" />
        )}
        {!loading && leftIcon && (
          <span aria-hidden="true">{leftIcon}</span>
        )}
        
        <span className={cn(loading && loadingText && "sr-only")}>
          {children}
        </span>
        
        {loading && loadingText && (
          <span>{loadingText}</span>
        )}
        
        {!loading && rightIcon && (
          <span aria-hidden="true">{rightIcon}</span>
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

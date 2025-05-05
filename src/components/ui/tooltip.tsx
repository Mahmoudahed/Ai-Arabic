import * as React from "react"
import { cn } from "@/lib/utils"

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  delayDuration?: number;
  className?: string;
  sideOffset?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  delayDuration = 700,
  className,
  sideOffset = 4,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [timer, setTimer] = React.useState<NodeJS.Timeout | null>(null);
  const triggerRef = React.useRef<HTMLDivElement>(null);
  
  const handleMouseEnter = React.useCallback(() => {
    const timeoutId = setTimeout(() => setIsOpen(true), delayDuration);
    setTimer(timeoutId);
  }, [delayDuration]);
  
  const handleMouseLeave = React.useCallback(() => {
    if (timer) {
      clearTimeout(timer);
    }
    setIsOpen(false);
  }, [timer]);
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={triggerRef}
    >
      {children}
      
      {isOpen && (
        <div
          role="tooltip"
          className={cn(
            "z-50 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full",
            "overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm",
            "text-popover-foreground shadow-md",
            className
          )}
          style={{ marginTop: `-${sideOffset}px` }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

// Re-export with the original API structure to maintain compatibility
const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

interface TooltipRootProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
}

const TooltipRoot: React.FC<TooltipRootProps> = ({ children }) => {
  return <>{children}</>;
};

interface TooltipTriggerProps {
  children: React.ReactNode;
}

const TooltipTrigger = React.forwardRef<HTMLDivElement, TooltipTriggerProps & React.HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  }
);
TooltipTrigger.displayName = "TooltipTrigger";

interface TooltipContentProps {
  children: React.ReactNode;
  sideOffset?: number;
  className?: string;
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps & React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className, sideOffset = 4, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TooltipContent.displayName = "TooltipContent";

export { 
  Tooltip as SimpleTooltip,
  // Exporting the original API structure for compatibility
  TooltipRoot as Tooltip, 
  TooltipTrigger, 
  TooltipContent, 
  TooltipProvider 
}

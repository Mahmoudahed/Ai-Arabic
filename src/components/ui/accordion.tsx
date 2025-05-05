import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

interface AccordionProps {
  type?: "single" | "multiple"
  collapsible?: boolean
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  className?: string
  children?: React.ReactNode
}

const AccordionContext = React.createContext<{
  value: string | string[]
  onValueChange: (value: string | string[]) => void
  type: "single" | "multiple"
  collapsible: boolean
}>({
  value: "",
  onValueChange: () => {},
  type: "single",
  collapsible: false,
})

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ 
    type = "single", 
    collapsible = false, 
    defaultValue, 
    value, 
    onValueChange, 
    className, 
    children, 
    ...props 
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState<string | string[]>(
      defaultValue || (type === "single" ? "" : [])
    )
    
    const resolvedValue = value !== undefined ? value : internalValue
    
    const handleValueChange = React.useCallback((itemValue: string) => {
      let newValue: string | string[];
      
      if (type === "single") {
        if (collapsible && resolvedValue === itemValue) {
          newValue = ""
        } else {
          newValue = itemValue
        }
      } else {
        const values = Array.isArray(resolvedValue) ? [...resolvedValue] : []
        const index = values.indexOf(itemValue)
        
        if (index > -1) {
          values.splice(index, 1)
        } else {
          values.push(itemValue)
        }
        
        newValue = values
      }
      
      setInternalValue(newValue)
      onValueChange?.(newValue)
    }, [resolvedValue, type, collapsible, onValueChange])
    
    return (
      <AccordionContext.Provider
        value={{
          value: resolvedValue,
          onValueChange: handleValueChange,
          type,
          collapsible,
        }}
      >
        <div
          ref={ref}
          className={cn("space-y-1", className)}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    )
  }
)
Accordion.displayName = "Accordion"

interface AccordionItemProps {
  value: string
  className?: string
  children?: React.ReactNode
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, children, value, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("border-b", className)}
        {...props}
        data-value={value}
      >
        {children}
      </div>
    )
  }
)
AccordionItem.displayName = "AccordionItem"

interface AccordionTriggerProps {
  className?: string
  children?: React.ReactNode
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const id = React.useId()
    const { value, onValueChange, type } = React.useContext(AccordionContext)
    const accordionItemEl = React.useRef<HTMLElement | null>(null)
    const itemValue = React.useMemo(() => {
      if (!accordionItemEl.current) return ""
      return accordionItemEl.current.dataset.value || ""
    }, [])
    
    React.useEffect(() => {
      if (!ref) return
      const el = (ref as React.RefObject<HTMLButtonElement>).current
      if (!el) return
      accordionItemEl.current = el.closest('[data-value]')
    }, [ref])
    
    const isOpen = React.useMemo(() => {
      if (!itemValue) return false
      return type === "single" 
        ? value === itemValue
        : Array.isArray(value) && value.includes(itemValue)
    }, [itemValue, type, value])
    
    const handleClick = () => {
      if (!itemValue) return
      onValueChange(itemValue as string & string[])
    }
    
    return (
      <div className="flex">
        <button
          ref={ref}
          type="button"
          aria-expanded={isOpen}
          aria-controls={id}
          className={cn(
            "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline",
            className
          )}
          onClick={handleClick}
          {...props}
        >
          {children}
          <ChevronDown 
            className={cn(
              "h-4 w-4 shrink-0 transition-transform duration-200",
              isOpen && "rotate-180"
            )} 
          />
        </button>
      </div>
    )
  }
)
AccordionTrigger.displayName = "AccordionTrigger"

interface AccordionContentProps {
  className?: string
  children?: React.ReactNode
}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const id = React.useId()
    const { value, type } = React.useContext(AccordionContext)
    const accordionItemEl = React.useRef<HTMLElement | null>(null)
    const itemValue = React.useMemo(() => {
      if (!accordionItemEl.current) return ""
      return accordionItemEl.current.dataset.value || ""
    }, [])
    
    React.useEffect(() => {
      if (!ref) return
      const el = (ref as React.RefObject<HTMLDivElement>).current
      if (!el) return
      accordionItemEl.current = el.closest('[data-value]')
    }, [ref])
    
    const isOpen = React.useMemo(() => {
      if (!itemValue) return false
      return type === "single" 
        ? value === itemValue
        : Array.isArray(value) && value.includes(itemValue)
    }, [itemValue, type, value])
    
    if (!isOpen) return null
    
    return (
      <div
        ref={ref}
        id={id}
        className={cn(
          "overflow-hidden",
          className
        )}
        {...props}
      >
        <div className="pb-4 pt-0">{children}</div>
      </div>
    )
  }
)

AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

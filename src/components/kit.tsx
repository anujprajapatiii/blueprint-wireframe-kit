import * as React from 'react'
import {
  Accordion as AccordionPrimitive,
  Avatar as AvatarPrimitive,
  Checkbox as CheckboxPrimitive,
  Dialog as DialogPrimitive,
  DropdownMenu as DropdownMenuPrimitive,
  Popover as PopoverPrimitive,
  RadioGroup as RadioGroupPrimitive,
  Select as SelectPrimitive,
  Slider as SliderPrimitive,
  Slot as SlotPrimitive,
  Switch as SwitchPrimitive,
  Tabs as TabsPrimitive,
  Tooltip as TooltipPrimitive,
} from 'radix-ui'
import { Check, ChevronDown, ChevronUp, Minus, X } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring'
const disabled = 'disabled:pointer-events-none disabled:opacity-45'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  size?: 'default' | 'sm' | 'icon'
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, type = 'button', ...props }, ref) => {
    const Comp = asChild ? SlotPrimitive.Root : 'button'
    return <Comp ref={ref} type={asChild ? undefined : type} className={cn(
      'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md border font-medium text-sm transition-colors motion-reduce:transition-none [&_svg]:size-4 [&_svg]:shrink-0',
      focus, disabled,
      {
        default: 'border-primary bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border-input bg-transparent text-foreground hover:bg-muted',
        ghost: 'border-transparent bg-transparent text-foreground hover:bg-muted',
        destructive: 'border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90',
      }[variant],
      { default: 'h-10 px-4', sm: 'h-9 px-3 text-sm', icon: 'size-10 p-0' }[size],
      className,
    )} {...props} />
  },
)
Button.displayName = 'Button'

export function Badge({ className, variant = 'default', ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: 'default' | 'outline' }) {
  return <span className={cn('inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-sm font-medium leading-5', variant === 'default' ? 'border-border bg-muted text-foreground' : 'border-input bg-transparent text-foreground', className)} {...props} />
}

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type = 'text', ...props }, ref) => (
  <input ref={ref} type={type} className={cn('flex h-10 w-full min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground file:mr-3 file:border-0 file:bg-transparent file:text-sm file:text-foreground aria-invalid:border-destructive', focus, disabled, className)} {...props} />
))
Input.displayName = 'Input'

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn('flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground aria-invalid:border-destructive', focus, disabled, className)} {...props} />
))
Textarea.displayName = 'Textarea'

export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(({ className, ...props }, ref) => (
  <label ref={ref} className={cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-45', className)} {...props} />
))
Label.displayName = 'Label'

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-md border border-border bg-card text-foreground', className)} {...props} />
}
export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-1.5 p-5', className)} {...props} />
}
export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-base font-medium leading-tight tracking-tight', className)} {...props} />
}
export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm leading-relaxed text-muted-foreground', className)} {...props} />
}
export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-5 pt-0', className)} {...props} />
}
export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex items-center gap-2 p-5 pt-0', className)} {...props} />
}
export function Separator({ className, orientation = 'horizontal', decorative = true, ...props }: React.HTMLAttributes<HTMLDivElement> & { orientation?: 'horizontal' | 'vertical'; decorative?: boolean }) {
  return <div role={decorative ? 'none' : 'separator'} aria-orientation={decorative ? undefined : orientation} className={cn('shrink-0 bg-border', orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px', className)} {...props} />
}
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div aria-hidden="true" className={cn('rounded-md border border-border bg-muted', className)} {...props} />
}
export function Progress({ className, value = 0, max = 100, ...props }: React.ProgressHTMLAttributes<HTMLProgressElement>) {
  return <progress value={value} max={max} className={cn('block h-2 w-full overflow-hidden rounded-full border border-input bg-muted text-primary [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-muted [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-primary [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-primary', className)} {...props} />
}

export const Checkbox = React.forwardRef<React.ComponentRef<typeof CheckboxPrimitive.Root>, React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root ref={ref} className={cn('peer group relative flex size-5 shrink-0 items-center justify-center rounded-[3px] border border-input bg-background after:absolute after:-inset-1 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground', focus, disabled, className)} {...props}>
    <CheckboxPrimitive.Indicator className="flex items-center justify-center"><Check className="size-3.5 group-data-[state=indeterminate]:hidden" strokeWidth={2.5} aria-hidden="true" /><Minus className="hidden size-3.5 group-data-[state=indeterminate]:block" strokeWidth={2.5} aria-hidden="true" /></CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = 'Checkbox'

export const Switch = React.forwardRef<React.ComponentRef<typeof SwitchPrimitive.Root>, React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root ref={ref} className={cn('peer inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-input bg-background p-0.5 data-[state=checked]:border-primary data-[state=checked]:bg-primary', focus, disabled, className)} {...props}>
    <SwitchPrimitive.Thumb className="pointer-events-none block size-4 rounded-full bg-muted-foreground transition-transform data-[state=checked]:translate-x-5 data-[state=checked]:bg-primary-foreground data-[state=unchecked]:translate-x-0 motion-reduce:transition-none" />
  </SwitchPrimitive.Root>
))
Switch.displayName = 'Switch'

export const Slider = React.forwardRef<React.ComponentRef<typeof SliderPrimitive.Root>, React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>>(({ className, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, ...props }, ref) => {
  const values = props.value ?? props.defaultValue ?? [0]
  return <SliderPrimitive.Root ref={ref} className={cn('relative flex w-full touch-none select-none items-center py-2 data-[disabled]:opacity-45', className)} {...props}>
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full border border-input bg-muted"><SliderPrimitive.Range className="absolute h-full bg-primary" /></SliderPrimitive.Track>
    {values.map((_, index) => <SliderPrimitive.Thumb key={index} className={cn('relative block size-4 rounded-full border-2 border-primary bg-background after:absolute after:-inset-2', focus)} aria-label={values.length > 1 ? `${ariaLabel ?? 'Value'} ${index + 1}` : ariaLabel} aria-labelledby={ariaLabelledBy} />)}
  </SliderPrimitive.Root>
})
Slider.displayName = 'Slider'

export const RadioGroup = React.forwardRef<React.ComponentRef<typeof RadioGroupPrimitive.Root>, React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>>(({ className, ...props }, ref) => <RadioGroupPrimitive.Root ref={ref} className={cn('grid gap-3', className)} {...props} />)
RadioGroup.displayName = 'RadioGroup'
export const RadioGroupItem = React.forwardRef<React.ComponentRef<typeof RadioGroupPrimitive.Item>, React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item ref={ref} className={cn('relative size-5 shrink-0 rounded-full border border-input bg-background text-primary after:absolute after:-inset-1 data-[state=checked]:border-primary', focus, disabled, className)} {...props}>
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center"><span className="size-2.5 rounded-full bg-current" /></RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
))
RadioGroupItem.displayName = 'RadioGroupItem'

export const Tabs = TabsPrimitive.Root
export const TabsList = React.forwardRef<React.ComponentRef<typeof TabsPrimitive.List>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>>(({ className, ...props }, ref) => <TabsPrimitive.List ref={ref} className={cn('inline-flex h-10 items-center gap-1 rounded-md border border-border bg-muted p-1 text-muted-foreground', className)} {...props} />)
TabsList.displayName = 'TabsList'
export const TabsTrigger = React.forwardRef<React.ComponentRef<typeof TabsPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>>(({ className, ...props }, ref) => <TabsPrimitive.Trigger ref={ref} className={cn('inline-flex h-8 items-center justify-center whitespace-nowrap rounded-[3px] border border-transparent px-3 text-sm font-medium data-[state=active]:border-input data-[state=active]:bg-background data-[state=active]:text-foreground', focus, disabled, className)} {...props} />)
TabsTrigger.displayName = 'TabsTrigger'
export const TabsContent = React.forwardRef<React.ComponentRef<typeof TabsPrimitive.Content>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>>(({ className, ...props }, ref) => <TabsPrimitive.Content ref={ref} className={cn('mt-4', focus, className)} {...props} />)
TabsContent.displayName = 'TabsContent'

export const Accordion = AccordionPrimitive.Root
export const AccordionItem = React.forwardRef<React.ComponentRef<typeof AccordionPrimitive.Item>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>>(({ className, ...props }, ref) => <AccordionPrimitive.Item ref={ref} className={cn('border-b border-border last:border-b-0', className)} {...props} />)
AccordionItem.displayName = 'AccordionItem'
export const AccordionTrigger = React.forwardRef<React.ComponentRef<typeof AccordionPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex"><AccordionPrimitive.Trigger ref={ref} className={cn('group flex flex-1 items-center justify-between gap-4 rounded-sm py-4 text-left text-sm font-medium hover:text-primary', focus, disabled, className)} {...props}>{children}<ChevronDown className="size-4 shrink-0 text-muted-foreground group-data-[state=open]:rotate-180" aria-hidden="true" /></AccordionPrimitive.Trigger></AccordionPrimitive.Header>
))
AccordionTrigger.displayName = 'AccordionTrigger'
export const AccordionContent = React.forwardRef<React.ComponentRef<typeof AccordionPrimitive.Content>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>>(({ className, ...props }, ref) => <AccordionPrimitive.Content ref={ref} className={cn('overflow-hidden pb-4 text-sm leading-relaxed text-muted-foreground', className)} {...props} />)
AccordionContent.displayName = 'AccordionContent'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close
export const DialogContent = React.forwardRef<React.ComponentRef<typeof DialogPrimitive.Content>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60" />
    <DialogPrimitive.Content ref={ref} className={cn('fixed left-1/2 top-1/2 z-50 grid max-h-[85dvh] w-[calc(100%_-_2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-5 overflow-y-auto rounded-md border border-input bg-background p-6 text-foreground shadow-2xl', className)} {...props}>
      {children}
      <DialogPrimitive.Close className={cn('absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground', focus)}><X className="size-4" aria-hidden="true" /><span className="sr-only">Close dialog</span></DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))
DialogContent.displayName = 'DialogContent'
export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn('space-y-2 pr-6', className)} {...props} /> }
export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn('flex flex-wrap justify-end gap-2', className)} {...props} /> }
export const DialogTitle = React.forwardRef<React.ComponentRef<typeof DialogPrimitive.Title>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>>(({ className, ...props }, ref) => <DialogPrimitive.Title ref={ref} className={cn('text-lg font-medium tracking-tight', className)} {...props} />)
DialogTitle.displayName = 'DialogTitle'
export const DialogDescription = React.forwardRef<React.ComponentRef<typeof DialogPrimitive.Description>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>>(({ className, ...props }, ref) => <DialogPrimitive.Description ref={ref} className={cn('text-sm leading-relaxed text-muted-foreground', className)} {...props} />)
DialogDescription.displayName = 'DialogDescription'

export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
export const DropdownMenuContent = React.forwardRef<React.ComponentRef<typeof DropdownMenuPrimitive.Content>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>>(({ className, sideOffset = 6, ...props }, ref) => <DropdownMenuPrimitive.Portal><DropdownMenuPrimitive.Content ref={ref} sideOffset={sideOffset} className={cn('z-50 min-w-44 rounded-md border border-input bg-card p-1 text-foreground shadow-xl', className)} {...props} /></DropdownMenuPrimitive.Portal>)
DropdownMenuContent.displayName = 'DropdownMenuContent'
export const DropdownMenuItem = React.forwardRef<React.ComponentRef<typeof DropdownMenuPrimitive.Item>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>>(({ className, ...props }, ref) => <DropdownMenuPrimitive.Item ref={ref} className={cn('relative flex min-h-9 cursor-default select-none items-center gap-2 rounded-sm px-2.5 py-2 text-sm outline-none focus:bg-muted focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring data-[disabled]:pointer-events-none data-[disabled]:opacity-45 [&_svg]:size-4', className)} {...props} />)
DropdownMenuItem.displayName = 'DropdownMenuItem'
export const DropdownMenuSeparator = React.forwardRef<React.ComponentRef<typeof DropdownMenuPrimitive.Separator>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>>(({ className, ...props }, ref) => <DropdownMenuPrimitive.Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-border', className)} {...props} />)
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator'
export const DropdownMenuLabel = React.forwardRef<React.ComponentRef<typeof DropdownMenuPrimitive.Label>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>>(({ className, ...props }, ref) => <DropdownMenuPrimitive.Label ref={ref} className={cn('px-2.5 py-2 text-xs font-medium text-muted-foreground', className)} {...props} />)
DropdownMenuLabel.displayName = 'DropdownMenuLabel'

export const TooltipProvider = TooltipPrimitive.Provider
export const Tooltip = TooltipPrimitive.Root
export const TooltipTrigger = TooltipPrimitive.Trigger
export const TooltipContent = React.forwardRef<React.ComponentRef<typeof TooltipPrimitive.Content>, React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>>(({ className, sideOffset = 6, ...props }, ref) => <TooltipPrimitive.Portal><TooltipPrimitive.Content ref={ref} sideOffset={sideOffset} className={cn('z-50 max-w-64 rounded-md border border-input bg-primary px-3 py-2 text-sm leading-relaxed text-primary-foreground shadow-md', className)} {...props} /></TooltipPrimitive.Portal>)
TooltipContent.displayName = 'TooltipContent'

export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger
export const PopoverContent = React.forwardRef<React.ComponentRef<typeof PopoverPrimitive.Content>, React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>>(({ className, align = 'center', sideOffset = 6, ...props }, ref) => <PopoverPrimitive.Portal><PopoverPrimitive.Content ref={ref} align={align} sideOffset={sideOffset} className={cn('z-50 w-72 max-w-[calc(100vw_-_2rem)] rounded-md border border-input bg-card p-4 text-foreground shadow-xl', focus, className)} {...props} /></PopoverPrimitive.Portal>)
PopoverContent.displayName = 'PopoverContent'

export const Avatar = React.forwardRef<React.ComponentRef<typeof AvatarPrimitive.Root>, React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>>(({ className, ...props }, ref) => <AvatarPrimitive.Root ref={ref} className={cn('relative flex size-9 shrink-0 overflow-hidden rounded-full border border-input', className)} {...props} />)
Avatar.displayName = 'Avatar'
export const AvatarFallback = React.forwardRef<React.ComponentRef<typeof AvatarPrimitive.Fallback>, React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>>(({ className, ...props }, ref) => <AvatarPrimitive.Fallback ref={ref} className={cn('flex size-full items-center justify-center rounded-full bg-muted text-xs font-medium', className)} {...props} />)
AvatarFallback.displayName = 'AvatarFallback'

export const Select = SelectPrimitive.Root
export const SelectValue = SelectPrimitive.Value
export const SelectTrigger = React.forwardRef<React.ComponentRef<typeof SelectPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>>(({ className, children, ...props }, ref) => <SelectPrimitive.Trigger ref={ref} className={cn('flex h-10 w-full items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm data-[placeholder]:text-muted-foreground [&>span]:truncate', focus, disabled, className)} {...props}>{children}<SelectPrimitive.Icon asChild><ChevronDown className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" /></SelectPrimitive.Icon></SelectPrimitive.Trigger>)
SelectTrigger.displayName = 'SelectTrigger'
export const SelectContent = React.forwardRef<React.ComponentRef<typeof SelectPrimitive.Content>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>>(({ className, children, position = 'popper', sideOffset = 6, ...props }, ref) => <SelectPrimitive.Portal><SelectPrimitive.Content ref={ref} position={position} sideOffset={sideOffset} className={cn('relative z-50 max-h-[var(--radix-select-content-available-height)] min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-input bg-card text-foreground shadow-xl', className)} {...props}><SelectPrimitive.ScrollUpButton className="flex h-6 items-center justify-center"><ChevronUp className="size-4" /></SelectPrimitive.ScrollUpButton><SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport><SelectPrimitive.ScrollDownButton className="flex h-6 items-center justify-center"><ChevronDown className="size-4" /></SelectPrimitive.ScrollDownButton></SelectPrimitive.Content></SelectPrimitive.Portal>)
SelectContent.displayName = 'SelectContent'
export const SelectItem = React.forwardRef<React.ComponentRef<typeof SelectPrimitive.Item>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>>(({ className, children, ...props }, ref) => <SelectPrimitive.Item ref={ref} className={cn('relative flex min-h-9 w-full cursor-default select-none items-center rounded-sm py-2 pl-8 pr-3 text-sm outline-none focus:bg-muted focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring data-[disabled]:pointer-events-none data-[disabled]:opacity-45', className)} {...props}><span className="absolute left-2 flex size-4 items-center justify-center"><SelectPrimitive.ItemIndicator><Check className="size-3.5" aria-hidden="true" /></SelectPrimitive.ItemIndicator></span><SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText></SelectPrimitive.Item>)
SelectItem.displayName = 'SelectItem'

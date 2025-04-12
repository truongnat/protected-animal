import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalloutProps {
  children: React.ReactNode
  type?: "default" | "warning" | "success" | "error" | "info",
  className?: HTMLDivElement['className']
}

const icons = {
  default: Info,
  warning: AlertTriangle,
  success: CheckCircle2,
  error: XCircle,
  info: Info,
}

export function Callout({ children, className, type = "default" }: CalloutProps) {
  const Icon = icons[type]

  return (
    <div
      className={cn(
        "flex items-start gap-4 p-4 rounded-lg border",
        {
          "bg-muted": type === "default",
          "bg-warning/10 border-warning/20 text-warning": type === "warning",
          "bg-success/10 border-success/20 text-success": type === "success",
          "bg-error/10 border-error/20 text-error": type === "error",
          "bg-info/10 border-info/20 text-info": type === "info",
        },
        className
      )}
    >
      <Icon className="h-5 w-5 mt-0.5" />
      <div className="flex-1">{children}</div>
    </div>
  )
} 
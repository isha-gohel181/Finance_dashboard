import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-3xl border border-slate-200 bg-slate-50/50 px-4 py-1 text-base transition-all outline-none placeholder:text-slate-400 focus-visible:border-indigo-500 focus-visible:ring-4 focus-visible:ring-indigo-500/10 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900/50 dark:focus-visible:border-indigo-400 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }

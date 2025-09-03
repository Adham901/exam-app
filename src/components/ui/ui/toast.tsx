"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cn } from "@/lib/utils"

type ToastOptions = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

const ToastContext = React.createContext<{ toast: (opts: ToastOptions) => void } | null>(null)

export function ToastProviderCustom({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<
    { id: number; title?: string; description?: string; variant?: "default" | "destructive" }[]
  >([])

  const toast = (opts: ToastOptions) => {
    setToasts((prev) => [...prev, { id: Date.now(), ...opts }])
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastPrimitives.Provider>
        {children}

        {toasts.map((t) => (
          <ToastPrimitives.Root
            key={t.id}
            open
            onOpenChange={(open) => !open && setToasts((ts) => ts.filter((x) => x.id !== t.id))}
            className={cn(
              "relative flex w-full max-w-sm items-center justify-between space-x-2 rounded-md border p-4 shadow-lg",
              t.variant === "destructive"
                ? "bg-red-600 text-white border-red-700"
                : "bg-white text-black border-gray-200"
            )}
          >
            <div className="flex flex-col gap-1">
              {t.title && <span className="font-semibold">{t.title}</span>}
              {t.description && <span className="text-sm opacity-90">{t.description}</span>}
            </div>
            <ToastPrimitives.Close className="ml-2 text-sm opacity-70 hover:opacity-100">✖</ToastPrimitives.Close>
          </ToastPrimitives.Root>
        ))}

        <ToastPrimitives.Viewport className="fixed bottom-0 right-0 z-[100] flex flex-col gap-2 p-4 w-full sm:max-w-sm" />
      </ToastPrimitives.Provider>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used inside <ToastProviderCustom>")
  return ctx.toast
}

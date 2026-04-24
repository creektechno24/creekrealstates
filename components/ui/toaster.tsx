"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            className="
              border-2 border-green-500 
              bg-gradient-to-r from-green-50 to-green-100 
              shadow-xl shadow-green-300 
              rounded-xl
            "
          >
            <div className="grid gap-1">
              
              {/* 🔥 TITLE */}
              {title && (
                <ToastTitle className="text-green-800 font-semibold text-base">
                  {title}
                </ToastTitle>
              )}

              {/* 🔥 DESCRIPTION */}
              {description && (
                <ToastDescription className="text-green-700 text-sm">
                  {description}
                </ToastDescription>
              )}

            </div>

            {action}

            {/* 🔥 CLOSE BUTTON */}
            <ToastClose className="text-green-700 hover:text-green-900" />
          </Toast>
        )
      })}

      {/* 🔥 POSITION */}
      <ToastViewport className="bottom-5 right-5" />
    </ToastProvider>
  )
}
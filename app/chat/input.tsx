"use client";

import { FormControl, FormField, FormSubmit } from "@radix-ui/react-form";
import { ActionStatus } from "components/actions/use-action";
import { LoadingSpinner } from "components/loading-spinner";
import { Placeholders } from "components/placeholders";
import { motion } from "framer-motion";
import { cn } from "lib/cn";
import { ArrowRightIcon } from "lucide-react";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

type Pixel = {
  x: number,
  y: number,
  r: number,
  color: string
}

type ChatInputProps = {
  className: string
  name: string
  placeholders: string[]
  status: ActionStatus
}

export type ChatInputRef = {
  clear: () => void
}

export const ChatInput = forwardRef<ChatInputRef, ChatInputProps>(({ className, name, placeholders, status }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState("")
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement
    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = rect.width + "px"
    canvas.style.height = rect.height + "px"
  }, [])

  const animateEvaporate = useCallback((onAnimationEnd?: () => void) => {
    const canvas = canvasRef.current as HTMLCanvasElement
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const computedStyles = getComputedStyle(inputRef.current as HTMLInputElement)
    const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"))
    const dpr = window.devicePixelRatio || 1
    ctx.font = `${fontSize * dpr}px ${computedStyles.fontFamily}`
    ctx.textAlign = "left"
    ctx.textBaseline = "middle"
    ctx.fillStyle = "#FFFFFF"
    ctx.fillText(value, 0, canvas.height / 2)

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    let pixels: Pixel[] = []
    let position = 0
    for (let y = 0; y < canvas.height; y++) {
      const row = y * (4 * canvas.width)
      for (let x = 0; x < canvas.width; x++) {
        const i = row + (4 * x)

        const a = imageData[i + 3]
        if (!a) continue

        const r = imageData[i]
        const g = imageData[i + 1]
        const b = imageData[i + 2]

        pixels.push({
          x: x,
          y: y,
          r: 1,
          color: `rgba(${r}, ${g}, ${b}, ${a})`
        })
        if (x > position) position = x
      }
    }

    const animateFrame = () => {
      const visiblePixels = []
      for (const pixel of pixels) {
        if (pixel.r <= 0) continue
        visiblePixels.push(pixel)

        if (pixel.x < position) continue
        pixel.x += Math.random() > 0.5 ? 1 : -1;
        pixel.y += Math.random() > 0.5 ? 1 : -1;
        pixel.r -= 0.05 * Math.random()
      }

      ctx.clearRect(position, 0, canvas.width, canvas.height)

      for (const { x, y, r, color } of visiblePixels) {
        if (x < position) continue
        ctx.beginPath()
        ctx.rect(x, y, r, r)
        ctx.fillStyle = color
        ctx.strokeStyle = color
        ctx.stroke()
      }

      if (visiblePixels.length > 0) {
        pixels = visiblePixels
        position -= 12
        requestAnimationFrame(animateFrame)
      } else if (onAnimationEnd) onAnimationEnd()
    }

    requestAnimationFrame(animateFrame)
  }, [value])

  useImperativeHandle(ref, () => ({
    clear: () => {
      if (animating) return
      setAnimating(true)
      animateEvaporate(() => {
        setAnimating(false)
        setValue("")
      })
    }
  }), [animateEvaporate, animating])

  const waiting = status === "executing" || animating

  return (
    <motion.div
      className={cn(
        "h-12 bg-background border rounded-full p-2 flex items-center",
        className
      )}
      layout
    >
      <FormField
        className="mx-2 relative grow"
        name={name}
      >
        <canvas
          ref={canvasRef}
          className={cn(
            "absolute inset-0 w-full h-full pointer-events-none invert dark:invert-0",
            animating ? "opacity-100" : "opacity-0"
          )}
        />
        <FormControl
          ref={inputRef}
          className={cn(
            "w-full h-full text-sm bg-transparent focus:outline-none",
            animating && "text-transparent"
          )}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="absolute inset-0 pointer-events-none flex items-center">
          <Placeholders placeholders={placeholders} show={!value} />
        </div>
      </FormField>
      <FormSubmit
        className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50"
        disabled={!value || waiting}
      >
        {waiting ? <LoadingSpinner className="h-4 w-4" /> : <ArrowRightIcon className="h-4 w-4" />}
      </FormSubmit>
    </motion.div>
  );
})
ChatInput.displayName = "ChatInput"

"use client";

import { FormControl, FormField, FormSubmit } from "@radix-ui/react-form";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "lib/cn";
import { ArrowRightIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface Pixel {
  x: number,
  y: number,
  r: number,
  color: string
}

interface PlaceholdersInputProps {
  className: string
  name: string
  placeholders: string[]
}

export function ChatInput({ className, name, placeholders }: PlaceholdersInputProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState("")
  const [animating, setAnimating] = useState(false)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [placeholder, setPlaceholder] = useState<string | null>(placeholders[placeholderIndex])

  const selectPlaceholder = useCallback(() => {
    const i = (placeholderIndex + 1) % placeholders.length
    setPlaceholderIndex(i)
    setPlaceholder(placeholders[i])
  }, [placeholderIndex, placeholders])

  useEffect(() => {
    const timeout = setTimeout(() => setPlaceholder(null), 4000)
    return () => clearTimeout(timeout)
  }, [placeholderIndex])

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

  // useEffect(() => {
  //   if (!pending) return

  //   setAnimating(true)
  //   animateEvaporate(() => setAnimating(false))
  // }, [animateEvaporate, pending])

  return (
    <div
      className={cn(
        "h-12 bg-background border rounded-full p-2 flex items-center",
        className
      )}
    >
      <FormField
        className="mx-2 relative grow"
        name={name}
      >
        <canvas
          className={cn(
            "absolute inset-0 w-full h-full pointer-events-none invert dark:invert-0",
            animating ? "opacity-100" : "opacity-0"
          )}
          ref={canvasRef}
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
          <AnimatePresence onExitComplete={selectPlaceholder}>
            {!value && (
              <motion.p
                key={placeholder}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3, ease: "linear" }}
                className="text-sm text-muted-foreground"
              >
                {placeholder}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </FormField>
      <AnimatePresence>
        {value && <FormSubmit asChild>
          <motion.button
            key="sumbit"
            className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "linear" }}
          >
            <ArrowRightIcon className="h-4 w-4" />
          </motion.button>
        </FormSubmit>}
      </AnimatePresence>
    </div>
  );
}

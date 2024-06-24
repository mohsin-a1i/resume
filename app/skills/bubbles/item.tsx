"use client"

import { MotionValue, motion, useMotionValue } from "framer-motion"
import { icon } from "./settings"
import { useIconTransform } from "./use-icon-transform"

type ItemProps = {
  row: number
  col: number
  planeX: MotionValue<number>
  planeY: MotionValue<number>
}

export function Item({ row, col, planeX, planeY }: ItemProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const scale = useMotionValue(1)

  // Calculate the origin x and y offsets of this icon based on
  // its column and row position
  const xOffset = col * (icon.size + icon.margin) +
    (row % 2) * ((icon.size + icon.margin) / 2)
  const yOffset = row * icon.size

  // Transform the icon's x, y and scale based on the position of the draggable plane
  useIconTransform({ x, y, scale, planeX, planeY, xOffset, yOffset })

  return (
    <motion.div
      className="absolute bg-primary rounded-full"
      style={{
        left: xOffset,
        top: yOffset,
        x,
        y,
        scale,
        width: icon.size,
        height: icon.size,
      }}
    />
  )
}

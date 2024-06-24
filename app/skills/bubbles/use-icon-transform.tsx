"use client"

import { MotionValue, transform } from "framer-motion"
import { useEffect, useRef } from "react"
import { device, icon } from "./settings"

type useIconTransformProps = {
  x: MotionValue<number>
  y: MotionValue<number>
  scale: MotionValue<number>
  planeX: MotionValue<number>
  planeY: MotionValue<number>
  xOffset: number
  yOffset: number
}

// Transform the provided x, y and scale motion values based on changes
// in the provided planeX and planeY motion values
export function useIconTransform({
  x,
  y,
  scale,
  planeX,
  planeY,
  xOffset,
  yOffset
}: useIconTransformProps) {
  // Keep track of our calculated x and y scales - we'll
  // set scale to the smallest of the two
  const xScale = useRef(1)
  const yScale = useRef(1)

  // We can useMemo as it'll work before any visual changes. With the underlying
  // production-ready code this will make the icon transformation work even in SSR
  useEffect(() => {
    // Transform x and scale based on planeX
    const transform = (v: number) => {
      // Calculate the offset of the icon relative to its position on the screen
      const screenOffset = v + xOffset + 20

      // Save the xScale to also be used in the planeY useMemo below.
      xScale.current = mapScreenXToScale(screenOffset)
      const newScale = Math.min(xScale.current, yScale.current)

      // Any changed motion values are only rendered once per frame,
      // so we can repeat the scale.set and it'll only render once,
      // with latest values passed to it
      scale.set(newScale)
      x.set(mapScreenToXOffset(screenOffset))
    }

    return planeX.on("change", transform)
  }, [planeX, scale, x, xOffset])

  useEffect(() => {
    // Transform y and scale based on planeY
    const transform = (v: number) => {
      const screenOffset = v + yOffset + 20
      yScale.current = mapScreenYToScale(screenOffset)
      const newScale = Math.min(xScale.current, yScale.current)
      scale.set(newScale)
      y.set(mapScreenToYOffset(screenOffset))
    }

    return planeY.on("change", transform)
  }, [planeY, scale, y, yOffset])
}

// As the draggable plane moves around we want to map each icon's position
// on the screen to new x/y positions and scale. As they get smaller we move them
// back into the screen slightly until they disappear.
// This function basically generates an inputRange for the `transform` function
// that's maps from when an icon is 60px outside an edge of the screen to
// when it's 80px inside the screen.
const createScreenRange = (axis: "width" | "height") => [
  -60,
  80,
  device[axis] - (icon.size + icon.margin) / 2 - 80,
  device[axis] - (icon.size + icon.margin) / 2 + 60
]
// Try changing these values to see how scrolling affects the scale and position of the icons
const scaleRange = [0, 1, 1, 0]
const xRange = createScreenRange("width")
const yRange = createScreenRange("height")
const mapScreenToXOffset = transform(xRange, [50, 0, 0, -50])
const mapScreenToYOffset = transform(yRange, [50, 0, 0, -50])
const mapScreenXToScale = transform(xRange, scaleRange)
const mapScreenYToScale = transform(yRange, scaleRange)

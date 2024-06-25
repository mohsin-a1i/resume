import { useEffect, useRef, useState } from "react"

type Dimensions = {
  width?: number
  height?: number
}

export const useDimensions = <T extends HTMLElement>() => {
  const ref = useRef<T>(null)
  const [dimensions, setDimensions] = useState<Dimensions>({})

  useEffect(() => {
    const updateDimensions = () => {
      if (!ref.current) return
      setDimensions({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      })
    }
    updateDimensions()

    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  return { ref, dimensions }
}
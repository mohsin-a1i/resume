import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useEffect, useState } from "react"

type PlaceholdersProps = {
  placeholders: string[]
  show: boolean
}

export const Placeholders = ({ placeholders, show }: PlaceholdersProps) => {
  const [index, setIndex] = useState(0)
  const [placeholder, setPlaceholder] = useState<string | null>(placeholders[index])

  const selectPlaceholder = useCallback(() => {
    const i = (index + 1) % placeholders.length
    setIndex(i)
    setPlaceholder(placeholders[i])
  }, [index, placeholders])

  useEffect(() => {
    const timeout = setTimeout(() => setPlaceholder(null), 4000)
    return () => clearTimeout(timeout)
  }, [index])

  return (
    <AnimatePresence onExitComplete={selectPlaceholder}>
      {show && (
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
  )
}
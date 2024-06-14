"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

interface FlipSentencesProps {
  className?: string
  sentences: string[]
  duration?: number
}

export const FlipSentences = ({ className, sentences, duration = 4000 }: FlipSentencesProps) => {
  const [index, setIndex] = useState(0)
  const [sentence, setSentence] = useState<string | null>(sentences[index])

  const selectSentence = useCallback(() => {
    const i = (index + 1) % sentences.length
    setIndex(i)
    setSentence(sentences[i])
  }, [index, sentences])

  useEffect(() => {
    const timeout = setTimeout(() => setSentence(null), duration)
    return () => clearTimeout(timeout)
  }, [duration, selectSentence])

  return (
    <AnimatePresence onExitComplete={selectSentence}>
      {sentence && <motion.span
        key={sentence}
        className={className}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
        exit={{
          opacity: 0,
          filter: "blur(8px)",
          scale: 1.5
        }}
      >
        {sentence.split("").map((letter, index) => (
          <motion.span
            key={`${sentence} ${index}`}
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: index * 0.08,
              duration: 0.4,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.span>}
    </AnimatePresence>
  );
};

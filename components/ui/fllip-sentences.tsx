"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

interface FlipSentencesProps {
  className?: string
  sentences: string[]
  duration?: number
}

export const FlipSentences = ({ className, sentences, duration = 4000 }: FlipSentencesProps) => {
  const [sentence, setSentence] = useState<string>(sentences[0])

  const selectSentence = useCallback(() => {
    const index = (sentences.indexOf(sentence) + 1) % sentences.length
    setSentence(sentences[index])
  }, [sentences, sentence])

  useEffect(() => {
    const timeout = setTimeout(selectSentence, duration)
    return () => clearTimeout(timeout)
  }, [duration, selectSentence])

  return (
    <AnimatePresence mode="wait">
      <motion.span
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
        className={className}
        key={sentence}
      >
        {sentence.split("").map((letter, index) => (
          <motion.span
            key={index}
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
      </motion.span>
    </AnimatePresence>
  );
};

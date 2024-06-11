"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

import { cn } from "lib/utils";

interface FlipSentencesProps {
  className?: string
  sentences: string[]
  duration?: number
}

export const FlipSentences = ({ className, sentences, duration = 3000 }: FlipSentencesProps) => {
  const [currentSentence, setCurrentSentence] = useState(sentences[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const startAnimation = useCallback(() => {
    const word = sentences[sentences.indexOf(currentSentence) + 1] || sentences[0];
    setCurrentSentence(word);
    setIsAnimating(true);
  }, [currentSentence, sentences]);

  useEffect(() => {
    if (!isAnimating) setTimeout(startAnimation, duration);
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      <motion.span
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
        exit={{
          opacity: 0,
          y: -40,
          x: 40,
          filter: "blur(8px)",
          scale: 2,
          position: 'absolute'
        }}
        className={cn(
          "relative",
          className
        )}
        key={currentSentence}
      >
        {currentSentence.split("").map((letter, index) => (
          <motion.span
            key={`sentence-${currentSentence}-${index}`}
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

"use client"

import { motion, useMotionValue } from "framer-motion";
import { Item } from "./item";
import { device } from "./settings";

// Download the Framer Beta: https://www.framer.com/beta/
// Framer Beta API documentation: https://www.framer.com/api/

// Fill a grid of numbers to represent each app icon
const grid: number[][] = new Array(10).fill([0, 1, 2, 3, 4, 5, 6, 7]);

export function Bubbles() {
  // We manually create x/y motion values for the draggable plane as it allows us to pass these to
  // icon children, which can then listen to when they change and respond.
  // -220 is an arbitrary position that centers an initial icon - this could be calculated
  const x = useMotionValue(-225);
  const y = useMotionValue(-225);

  return (
    <div className="device" style={device}>
      <motion.div
        drag
        // These constraints could be calculated dynamically based on icon.size and grid length
        dragConstraints={{ left: -650, right: 50, top: -600, bottom: 50 }}
        style={{
          // Likewise these draggable plane dimensions could be calculated, but 1000x1000 is arbitrary and big

          width: 1000,
          height: 1000,
          x,
          y,
          background: "transparent"
        }}
      >
        {grid.map((rows, rowIndex) =>
          rows.map(colIndex => (
            <Item key={`${rowIndex}-${colIndex}`} row={rowIndex} col={colIndex} planeX={x} planeY={y} />
          ))
        )}
      </motion.div>
    </div>
  )
}

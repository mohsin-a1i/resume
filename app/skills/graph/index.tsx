"use client"

import { useDimensions } from "components/use-dimensions"
import * as d3 from "d3-force"
import { cn } from "lib/cn"
import { useTheme } from "next-themes"
import { useEffect, useRef } from "react"
import ForceGraph2D, { ForceGraphMethods } from "react-force-graph-2d"
import { GraphNode, useGraphData } from "./data"

type SimulationNode = GraphNode & d3.SimulationNodeDatum & {
  x: number
  y: number
}

type SkillsGraphProps = {
  className: string
}

export default function SkillsGraph({ className }: SkillsGraphProps) {
  const { theme } = useTheme()
  const { ref: containerRef, dimensions } = useDimensions<HTMLDivElement>()
  const graphRef = useRef<ForceGraphMethods>()
  const graphData = useGraphData()

  useEffect(() => {
    const graph = graphRef.current
    if (!graph || !graphData) return

    const { nodes } = graphData
    graph.d3Force("charge", d3.forceManyBody().strength(-50))
    graph.d3Force("collide", d3.forceCollide(nodes[0].size))
  }, [graphData])

  return (
    <div ref={containerRef} className={cn("border rounded-lg", className)}>
      <ForceGraph2D
        ref={graphRef}
        height={500}
        width={dimensions.width}
        graphData={graphData}
        nodeRelSize={12}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const { x, y, size, name, image } = node as SimulationNode

          ctx.fillStyle = "rgb(59, 130, 246)"
          ctx.beginPath()
          ctx.arc(x, y, size, 0, 2 * Math.PI)
          ctx.fill()
          ctx.closePath()

          let textY = y

          if (image) {
            const imageX = x - image.width / 2
            let imageY = y - image.height / 2

            if (name) {
              imageY -= 2
              textY = imageY + image.height + 1
            }

            ctx.drawImage(image, imageX, imageY, image.width, image.height)
          }

          if (name) {
            const textWidth = ctx.measureText(name).width;
            const textX = x - textWidth / 2
            ctx.font = "3px sans-serif"
            ctx.textBaseline = "top"
            ctx.fillStyle = "rgb(255, 255, 255)"
            ctx.fillText(name, textX, textY)
          }

        }}
        linkColor={() => theme === "dark" ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)"}
        cooldownTicks={100}
        onEngineStop={() => graphRef.current?.zoomToFit(400)}
      />
    </div>
  )
}

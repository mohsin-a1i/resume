"use client"

import { useCallback, useEffect, useState } from "react"

type DataNode = {
  id: string
  name?: string
  x?: number
  y?: number
  size?: number
  image?: string
  children?: DataNode[]
}

const dataNode: DataNode = {
  id: "skills",
  children: [
    {
      id: "frontend",
      children: [
        { id: "ReactJS" },
        { id: "nextjs" }
      ]
    },
    {
      id: "backend",
      children: [
        { id: "nodejs" },
        { id: "spring" }
      ]
    },
    {
      id: "databases",
      children: [
        { id: "mysql", image: "icons/mysql.svg" },
        { id: "postgres", name: "Postgres", image: "icons/postgres.svg" },
        { id: "dynamodb", name: "DynamoDB" },
        { id: "neo4j" }
      ]
    },
    {
      id: "data-streams",
      children: [
        { id: "kafka" },
        { id: "rabbitmq" }
      ]
    }
  ]
}

export type GraphNode = {
  id: string
  x?: number
  y?: number
  size: number
  name?: string
  image?: HTMLImageElement
}

export type GraphLink = {
  source: string
  target: string
}

type GraphData = {
  nodes: GraphNode[],
  links: GraphLink[]
}

export const useGraphData = () => {
  const [graphData, setGraphData] = useState<GraphData>()

  const createHTMLImageElement = useCallback(async (url: string, size: number) => {
    const image = new Image()

    await new Promise(resolve => {
      image.onload = resolve
      image.src = url
    })

    const aspectRatio = image.width / image.height
    if (aspectRatio >= 1) {
      image.width = size;
      image.height = image.width / aspectRatio
    } else {
      image.height = size;
      image.width = image.height * aspectRatio
    }

    return image
  }, [])

  const createGraphNode = useCallback(async ({ id, x, y, size, name, image }: DataNode) => {
    const graphNode: GraphNode = { id, x, y, name, size: size || 12 }

    if (image) graphNode.image = await createHTMLImageElement(image, graphNode.size - 1)

    return graphNode
  }, [createHTMLImageElement])

  const createGraphData = useCallback(async (graphNodes: GraphNode[], graphLinks: GraphLink[], dataNode: DataNode, parentGraphNode?: GraphNode) => {
    const graphNode = await createGraphNode(dataNode)
    graphNodes.push(graphNode)

    if (parentGraphNode) {
      const link: GraphLink = { source: parentGraphNode.id, target: graphNode.id }
      graphLinks.push(link)
    }

    if (dataNode.children) {
      for (const childDataNode of dataNode.children) {
        await createGraphData(graphNodes, graphLinks, childDataNode, graphNode)
      }
    }
  }, [createGraphNode])

  useEffect(() => {
    const loadGraphData = async () => {
      const graphNodes: GraphNode[] = []
      const graphLinks: GraphLink[] = []
      const dataNodes = Array.isArray(dataNode) ? dataNode : [dataNode]
      for (const dataNode of dataNodes) await createGraphData(graphNodes, graphLinks, dataNode)
      setGraphData({ nodes: graphNodes, links: graphLinks })
    }
    loadGraphData()
  }, [createGraphData])

  return graphData
}
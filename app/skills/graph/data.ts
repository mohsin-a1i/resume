"use client"

import { useCallback, useEffect, useState } from "react"

type DataNode = {
  id: string
  label?: string
  x?: number
  y?: number
  size?: number
  image?: string
  children?: DataNode[]
}

const dataNode: DataNode = {
  id: "skills",
  label: "Skills",
  image: "icons/stars.svg",
  children: [
    {
      id: "frontend",
      label: "Front End",
      image: "icons/frontend.svg",
      children: [
        { id: "reactjs", label: "ReactJS", image: "icons/react.svg" },
        { id: "nextjs", label: "NextJS", image: "icons/next.svg" },
        { id: "flutter", label: "Flutter", image: "icons/flutter.svg" }
      ]
    },
    {
      id: "backend",
      label: "Back End",
      image: "icons/backend.svg",
      children: [
        { id: "nodejs", label: "NodeJS", image: "icons/node.svg" },
        { id: "spring", label: "Spring", image: "icons/spring.svg" }
      ]
    },
    {
      id: "databases",
      label: "Databases",
      image: "icons/database.svg",
      children: [
        { id: "mysql", image: "icons/mysql.svg" },
        { id: "postgres", label: "Postgres", image: "icons/postgres.svg" },
        { id: "dynamodb", label: "DynamoDB", image: "icons/database.svg", },
        { id: "neo4j", label: "Neo4J", image: "icons/neo4j.svg" }
      ]
    },
    {
      id: "streams",
      label: "Streaming",
      image: "icons/data-stream.svg",
      children: [
        { id: "kafka", label: "Kafka", image: "icons/kafka.svg" },
        { id: "rabbitmq", label: "RabbitMQ", image: "icons/rabbitmq.svg" }
      ]
    }
  ]
}

export type GraphNode = {
  id: string
  x?: number
  y?: number
  size: number
  label?: string
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

  const createGraphNode = useCallback(async ({ id, x, y, size, label, image }: DataNode) => {
    const graphNode: GraphNode = { id, x, y, label, size: size || 12 }

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
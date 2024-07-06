import { AndroidStudioIcon } from "components/icons/android-studio"
import { AWSIcon } from "components/icons/aws"
import { AzureIcon } from "components/icons/azure"
import { DatabaseIcon } from "components/icons/database"
import { DockerIcon } from "components/icons/docker"
import { FastAPIIcon } from "components/icons/fastapi"
import { FlutterIcon } from "components/icons/flutter"
import { KafkaIcon } from "components/icons/kafka"
import { KubernetesIcon } from "components/icons/kubernetes"
import { MySQLIcon } from "components/icons/mysql"
import { Neo4JIcon } from "components/icons/neo4j"
import { NextIcon } from "components/icons/next"
import { NodeIcon } from "components/icons/node"
import { PostgresIcon } from "components/icons/postgres"
import { RabbitMQIcon } from "components/icons/rabbitmq"
import { ReactIcon } from "components/icons/react"
import { SpringIcon } from "components/icons/spring"
import { ComponentType, SVGProps } from "react"

type Skill = {
  id: string
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

export const skills: Record<string, Skill[]> = {
  "frontend": [
    { id: "reactjs", label: "ReactJS", icon: ReactIcon },
    { id: "nextjs", label: "NextJS", icon: NextIcon },
    { id: "flutter", label: "Flutter", icon: FlutterIcon },
    { id: "android-studio", label: "Android Studio", icon: AndroidStudioIcon }
  ],
  "backend": [
    { id: "nodejs", label: "NodeJS", icon: NodeIcon },
    { id: "spring", label: "Spring", icon: SpringIcon },
    { id: "fast-api", label: "Fast API", icon: FastAPIIcon },
  ],
  "database": [
    { id: "mysql", label: "MySQL", icon: MySQLIcon },
    { id: "postgres", label: "Postgres", icon: PostgresIcon },
    { id: "dynamodb", label: "DynamoDB", icon: DatabaseIcon },
    { id: "neo4j", label: "Neo4J", icon: Neo4JIcon },
  ],
  "data-engineering": [
    { id: "kafka", label: "Kafka", icon: KafkaIcon },
    { id: "rabbitmq", label: "RabbitMQ", icon: RabbitMQIcon }
  ],
  "devops": [
    { id: "aws", label: "Amazon Web Services", icon: AWSIcon },
    { id: "azure", label: "Azure", icon: AzureIcon },
    { id: "docker", label: "Docker", icon: DockerIcon },
    { id: "kubernetes", label: "Kubernetes", icon: KubernetesIcon }
  ]
}
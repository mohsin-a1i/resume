import { DatabaseIcon } from "components/icons/database"
import { FlutterIcon } from "components/icons/flutter"
import { KafkaIcon } from "components/icons/kafka"
import { MySQLIcon } from "components/icons/mysql"
import { Neo4JIcon } from "components/icons/neo4j"
import { NextIcon } from "components/icons/next"
import { NodeIcon } from "components/icons/node"
import { RabbitMQIcon } from "components/icons/rabbitmq"
import { ReactIcon } from "components/icons/react"
import { SpringIcon } from "components/icons/spring"
import { ComponentType, SVGProps } from "react"

type Skill = {
  id: string
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

export const skills: Skill[] = [
  { id: "reactjs", label: "ReactJS", icon: ReactIcon },
  { id: "nextjs", label: "NextJS", icon: NextIcon },
  { id: "flutter", label: "Flutter", icon: FlutterIcon },
  { id: "nodejs", label: "NodeJS", icon: NodeIcon },
  { id: "spring", label: "Spring", icon: SpringIcon },
  { id: "mysql", label: "MySQL", icon: MySQLIcon },
  { id: "postgres", label: "Postgres", icon: DatabaseIcon },
  { id: "dynamodb", label: "DynamoDB", icon: ReactIcon },
  { id: "neo4j", label: "Neo4J", icon: Neo4JIcon },
  { id: "kafka", label: "Kafka", icon: KafkaIcon },
  { id: "rabbitmq", label: "RabbitMQ", icon: RabbitMQIcon }
]
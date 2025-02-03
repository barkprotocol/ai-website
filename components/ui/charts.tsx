import { Bar, Line, Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string
    borderWidth?: number
  }[]
}

interface ChartProps {
  data: ChartData
}

export function BarChart({ data }: ChartProps) {
  return <Bar data={data} />
}

export function LineChart({ data }: ChartProps) {
  return <Line data={data} />
}

export function PieChart({ data }: ChartProps) {
  return <Pie data={data} />
}


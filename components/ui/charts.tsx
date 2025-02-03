"use client"

import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts"

export const LineChart = ({ data, xKey, yKey }: { data: any[]; xKey: string; yKey: string }) => (
  <ResponsiveContainer width="100%" height={300}>
    <RechartsLineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xKey} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={yKey} stroke="#8884d8" activeDot={{ r: 8 }} />
    </RechartsLineChart>
  </ResponsiveContainer>
)

export const BarChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <RechartsBarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </RechartsBarChart>
  </ResponsiveContainer>
)

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export const PieChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <RechartsPieChart>
      <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </RechartsPieChart>
  </ResponsiveContainer>
)


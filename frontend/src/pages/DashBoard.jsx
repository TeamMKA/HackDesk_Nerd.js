import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { AlertTriangle, BarChart2 } from 'lucide-react'

// Mock data for incidents
const incidents = [
  { id: 1, title: 'Traffic accident on Main St', severity: 'High', time: '2 hours ago' },
  { id: 2, title: 'Power outage in Downtown', severity: 'Medium', time: '5 hours ago' },
  { id: 3, title: 'Fallen tree blocking sidewalk', severity: 'Low', time: '1 day ago' },
  { id: 4, title: 'Water main break on Elm St', severity: 'High', time: '2 days ago' },
]

// Mock data for the chart
const chartData = [
  { name: 'Mon', incidents: 4 },
  { name: 'Tue', incidents: 3 },
  { name: 'Wed', incidents: 2 },
  { name: 'Thu', incidents: 5 },
  { name: 'Fri', incidents: 1 },
  { name: 'Sat', incidents: 6 },
  { name: 'Sun', incidents: 3 },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen glassmorphism p-4 w-full ">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Crowdfeed Dashboard</h1>
        
        <div className="flex flex-col gap-6">
          {/* Incidents Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <AlertTriangle className="mr-2 text-red-500" />
              Recent Incidents
            </h2>
            <div className="space-y-4">
              {incidents.map((incident) => (
                <div key={incident.id} className="border-b pb-2">
                  <h3 className="font-medium">{incident.title}</h3>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Severity: {incident.severity}</span>
                    <span>{incident.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Graphical Analysis Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BarChart2 className="mr-2 text-blue-500" />
              Incident Analysis
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="incidents" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
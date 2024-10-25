import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts"
import { AlertTriangle, BarChart2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

// Mock data for the chart
const chartData = [
    { name: "Mon", incidents: 4 },
    { name: "Tue", incidents: 3 },
    { name: "Wed", incidents: 2 },
    { name: "Thu", incidents: 5 },
    { name: "Fri", incidents: 1 },
    { name: "Sat", incidents: 6 },
    { name: "Sun", incidents: 3 },
]

export default function Dashboard() {
    const router = useNavigate()
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/posts/get-post"
                )
                console.log(response.data.data)
                if (Array.isArray(response.data.data)) {
                    setData(response.data.data)
                } else {
                    console.error("API response is not an array")
                }
            } catch (error) {
                console.error(error)
            }
        }

        fetchDataAsync()
    }, [])

    const handleIncidentPage = () => {
        router("/incident")
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/posts/delete-post/${id}`
            )
            console.log(response.data)
            setData(data.filter((incident) => incident._id !== id))
        } catch (error) {
            console.error(error)
        }
        console.log("Delete incident with id", id)
    }

    return (
        <div className="min-h-screen bg-inherit p-4 w-full ">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Crowdfeed Dashboard
                </h1>

                <div className="flex flex-col gap-6">
                    {/* Graphical Analysis Section */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
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

                    {/* Incidents Section */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4 flex items-center">
                            <AlertTriangle className="mr-2 text-red-500" />
                            Recent Incidents
                        </h2>
                        <div className="space-y-4">
                            {Array.isArray(data) && data.length > 0 ? (
                                data.map((incident) => (
                                    <div
                                        key={incident._id}
                                        className="border-b pb-2 "
                                    >
                                        <h3 className="font-medium">
                                            {incident.type}
                                        </h3>
                                        <div className="flex justify-between text-sm text-gray-500">
                                            <span
                                                className="cursor-pointer"
                                                onClick={handleIncidentPage}
                                            >
                                                Severity: {incident.description}
                                            </span>
                                            <div className="flex space-x-5">
                                                <button
                                                    className="bg-orange-900 text-white px-3 py-2 rounded-full"
                                                    onClick={() =>
                                                        handleDelete(
                                                            incident._id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>
                                                <span>5 hours ago</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No incidents available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

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
import { Search, LayoutGrid, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { HfInference } from "@huggingface/inference"

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
    const [summaryData, setSummaryData] = useState({}) // New state for summaries
    const client = new HfInference("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") // Initialize client

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/posts/get-post"
                )
                if (Array.isArray(response.data.data)) {
                    setData(response.data.data)
                    response.data.data.forEach((incident) => {
                        // Call LLaMA for each incident
                        fetchSummaryAndSeverity(incident)
                    })
                } else {
                    console.error("API response is not an array")
                }
            } catch (error) {
                console.error(error)
            }
        }

        fetchDataAsync()
    }, [])

    const fetchSummaryAndSeverity = async (incident) => {
        const messages = [
            {
                role: "user",
                content: `Please summarize the following incident and provide a severity level:\n\nIncident Description: ${
                    incident.description
                }\n\nComments: ${incident.comments.join(", ")}`,
            },
        ]

        try {
            const stream = client.chatCompletionStream({
                model: "meta-llama/Llama-3.2-1B-Instruct",
                messages,
                max_tokens: 150,
            })

            let summary = ""
            for await (const chunk of stream) {
                if (chunk.choices && chunk.choices.length > 0) {
                    summary += chunk.choices[0].delta.content
                }
            }

            // Set summary and severity in state
            setSummaryData((prev) => ({
                ...prev,
                [incident._id]: summary, // Store summary keyed by incident ID
            }))
        } catch (error) {
            console.error("Error fetching summary and severity:", error)
        }
    }

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
            const newSummaryData = { ...summaryData }
            delete newSummaryData[id] // Remove summary of deleted incident
            setSummaryData(newSummaryData)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="min-h-screen bg-inherit p-4 w-[120%] ">
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
                    <main className="flex-1 overflow-y-auto text-2xl">
                        <div className="container mx-auto py-6">
                            <h1 className="text-2xl font-bold mb-2">
                                Incident Reports
                            </h1>
                            <p className="text-muted-foreground mb-6">
                                Below you can find all the reported incidents
                                with their respective details.
                            </p>
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center space-x-2">
                                    <Button variant="outline">
                                        All Incidents
                                    </Button>
                                    <Button>Recent</Button>
                                </div>
                                <div className="flex space-x-2">
                                    <Button variant="outline" size="icon">
                                        <Search className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon">
                                        <LayoutGrid className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon">
                                        <Filter className="h-4 w-4" />
                                    </Button>
                                    <Button>Export</Button>
                                </div>
                            </div>

                            {/* Incident Table */}
                            <Table className="text-lg">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Comments</TableHead>
                                        <TableHead>Severity</TableHead>{" "}
                                        {/* Added Severity Column */}
                                        <TableHead>Likes</TableHead>
                                        <TableHead>Dislikes</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.map((incident, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {incident.type}
                                            </TableCell>
                                            <TableCell>
                                                {incident.location}
                                            </TableCell>
                                            <TableCell>
                                                {incident.description}
                                            </TableCell>
                                            <TableCell>
                                                <ul>
                                                    {incident.comments.map(
                                                        (comment, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="text-sm italic"
                                                            >
                                                                {comment}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </TableCell>
                                            <TableCell>
                                                {summaryData[incident._id]
                                                    ? summaryData[incident._id]
                                                    : "Loading..."}{" "}
                                                {/* Display summary */}
                                            </TableCell>
                                            <TableCell>
                                                {incident.like}
                                            </TableCell>
                                            <TableCell>
                                                {incident.dislike}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(
                                                    incident.createdAt
                                                ).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleDelete(
                                                            incident._id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleIncidentPage()
                                                    }
                                                >
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    MapPin,
    Clock,
    MessageSquare,
    ThumbsUp,
    ThumbsDown,
    Image,
    Video,
    ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocation } from "react-router-dom"
import { HfInference } from "@huggingface/inference"

export default function IncidentDashboard() {
    const location = useLocation()
    const { incident } = location.state || {}
    const [summary, setSummary] = useState("")
    const [severityLevel, setSeverityLevel] = useState("")
    const [severityColor, setSeverityColor] = useState("")

    // Initialize the Hugging Face Inference client with your API token
    const client = new HfInference(import.meta.env.VITE_HUGGING_FACE)

    // Function to fetch summary and severity level
    const fetchSummaryAndSeverity = async () => {
        try {
            const prompt = `
                You are an expert analyst. Please summarize the following incident and its comments. After the summary, provide a clear severity level based on the content. 

                The severity levels are defined as follows:
                - Low: Minor issues with little impact.
                - Medium: Noticeable issues that may require attention.
                - High: Serious issues that require immediate action.

                Please format your response as follows:
                1. Summary: [Your summary here]
                2. Severity Level: [Low/Medium/High]
                Dont give anything other than the format given below
                Dont give unnecessary newlines
                No newline after Summary: 

                Incident Title: ${incident.title}
                Description: ${incident.description}
                Comments: ${incident.comments.join(" ")}
            `

            const response = await client.chatCompletionStream({
                model: "meta-llama/Llama-3.2-1B-Instruct",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 500,
            })

            let out = ""
            for await (const chunk of response) {
                if (chunk.choices && chunk.choices.length > 0) {
                    out += chunk.choices[0].delta.content
                }
            }

            // Assuming the response follows the specified format
            const lines = out.split("\n")
            console.log(out)

            setSummary(
                lines
                    .find((line) => line.includes("Summary:"))
                    ?.replace("Summary:", "")
                    .trim() || ""
            ) // Extract summary
            const severity =
                lines
                    .find((line) => line.includes("Severity Level:"))
                    ?.replace("Severity Level:", "")
                    .replace("**", "")
                    .trim() || "" // Extract severity
            setSeverityLevel(severity)
            console.log(severity)

            // Set severity color based on the severity level
            switch (severity.toLowerCase()) {
                case "low":
                    setSeverityColor("bg-green-200 text-green-800")
                    break
                case "medium":
                    setSeverityColor("bg-yellow-200 text-yellow-800")
                    break
                case "high":
                    setSeverityColor("bg-red-200 text-red-800")
                    break
                default:
                    setSeverityColor("bg-gray-200 text-gray-800")
            }
        } catch (error) {
            console.error("Error fetching summary and severity:", error)
        }
    }

    useEffect(() => {
        if (incident) {
            fetchSummaryAndSeverity()
        }
    }, [incident])

    if (!incident) {
        return <div>No incident data available.</div>
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Incident Report</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Incident Type
                        </CardTitle>
                        <Badge variant="default">{incident.type}</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {incident.type}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Reported at{" "}
                            {new Date(incident.createdAt).toLocaleString()}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Location
                        </CardTitle>
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {incident.location}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Lat: {incident.latitude}, Long: {incident.longitude}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Description
                        </CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">{incident.description}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Comments
                        </CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[100px]">
                            {incident.comments.map((comment, index) => (
                                <p key={index} className="text-sm mb-2">
                                    "{comment}"
                                </p>
                            ))}
                        </ScrollArea>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Reactions
                        </CardTitle>
                        <div className="flex space-x-2">
                            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                            <ThumbsDown className="h-4 w-4 text-muted-foreground" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between">
                            <div>
                                <div className="text-2xl font-bold text-green-600">
                                    {incident.like}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Likes
                                </p>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-red-600">
                                    {incident.dislike}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Dislikes
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Images
                        </CardTitle>
                        <Image className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {incident.imageFiles.length}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Image files
                        </p>
                        <div className="mt-4 grid grid-cols-3 gap-2">
                            {incident.imageFiles.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative aspect-square"
                                >
                                    <img
                                        src={image}
                                        alt={`Incident image ${index + 1}`}
                                        className="object-cover rounded-md w-full h-full"
                                    />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Video
                        </CardTitle>
                        <Video className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {incident.videoFile ? (
                            <div>
                                <div className="text-2xl font-bold">1</div>
                                <p className="text-xs text-muted-foreground mb-2">
                                    Video file
                                </p>
                                <video
                                    controls
                                    className="w-full rounded-md"
                                    src={incident.videoFile}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        ) : (
                            <p>No video file available.</p>
                        )}
                    </CardContent>
                </Card>

                {/* Media Links Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Media Links
                        </CardTitle>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {incident.imageFiles.length > 0 && (
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    asChild
                                >
                                    <a
                                        href={incident.imageFiles[0]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image className="mr-2 h-4 w-4" />
                                        View Images
                                    </a>
                                </Button>
                            )}
                            {incident.videoFile && (
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    asChild
                                >
                                    <a
                                        href={incident.videoFile}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Video className="mr-2 h-4 w-4" />
                                        View Video
                                    </a>
                                </Button>
                            )}
                            {incident.audioFile && (
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    asChild
                                >
                                    <a
                                        href={incident.audioFile}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <audio className="mr-2 h-4 w-4" />
                                        Listen to Audio
                                    </a>
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* AI Summary Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">
                            AI Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">{summary}</p>
                    </CardContent>
                </Card>

                {/* Severity Level Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">
                            Severity Level
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${severityColor}`}>
                            {severityLevel}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

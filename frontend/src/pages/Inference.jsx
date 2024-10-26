import React, { useState } from "react"
import { Send, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { HfInference } from "@huggingface/inference"

const ChatbotWithLLM = () => {
    const [messages, setMessages] = useState([
        {
            text: "How can I assist you with safety information today?",
            isUser: false,
        },
    ])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)

    // Initialize the Hugging Face Inference client
    const client = new HfInference(import.meta.env.VITE_HUGGING_FACE)

    const handleSend = async () => {
        if (input.trim()) {
            // Add user message to chat
            setMessages((prev) => [...prev, { text: input, isUser: true }])
            setLoading(true)

            try {
                // Create a stream from the LLM
                const stream = client.chatCompletionStream({
                    model: "meta-llama/Llama-3.2-1B-Instruct",
                    messages: [{ role: "user", content: input }],
                    max_tokens: 250,
                })

                // Initialize temporary storage for building the response
                let responseText = ""

                // Process the stream chunks
                for await (const chunk of stream) {
                    if (chunk.choices && chunk.choices.length > 0) {
                        const newContent = chunk.choices[0].delta.content
                        responseText += newContent
                        // Update messages with the accumulated response
                        setMessages((prev) => {
                            const newMessages = [...prev]
                            // Check if we already have a response message
                            const lastMessage =
                                newMessages[newMessages.length - 1]
                            if (!lastMessage.isUser) {
                                // Update existing response
                                newMessages[newMessages.length - 1].text =
                                    responseText
                            } else {
                                // Add new response message
                                newMessages.push({
                                    text: responseText,
                                    isUser: false,
                                })
                            }
                            return newMessages
                        })
                    }
                }
            } catch (error) {
                console.error("Error getting response:", error)
                setMessages((prev) => [
                    ...prev,
                    {
                        text: "I apologize, but I encountered an error processing your request. Please try again.",
                        isUser: false,
                    },
                ])
            }

            setLoading(false)
            setInput("")
        }
    }

    return (
        <div className="flex flex-col h-[500px] max-w-md mx-auto border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-pink-100 to-green-100 p-4 flex items-center">
                <Bot className="w-6 h-6 text-red-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-800">Chat</h2>
            </div>

            <ScrollArea className="flex-grow p-4 bg-white">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`mb-4 ${
                            message.isUser ? "text-right" : "text-left"
                        }`}
                    >
                        <div
                            className={`inline-block p-2 rounded-lg ${
                                message.isUser
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-800"
                            }`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="text-left mb-4">
                        <div className="inline-block p-2 rounded-lg bg-gray-200 text-gray-800">
                            Thinking...
                        </div>
                    </div>
                )}
            </ScrollArea>

            <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex space-x-2">
                    <Input
                        type="text"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSend()}
                        className="flex-grow"
                        disabled={loading}
                    />
                    <Button
                        onClick={handleSend}
                        className="bg-red-500 hover:bg-red-600 text-white"
                        disabled={loading}
                    >
                        <Send className="w-4 h-4" />
                        <span className="sr-only">Send</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ChatbotWithLLM

import React, { useState, useEffect } from "react"
import { HfInference } from "@huggingface/inference"

const ChatComponent = () => {
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [loading, setLoading] = useState(false)

    // Initialize the Hugging Face Inference client with your API token
    const client = new HfInference("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")

    const handleInputChange = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setOutput("")

        const stream = client.chatCompletionStream({
            model: "meta-llama/Llama-3.2-1B-Instruct",
            messages: [{ role: "user", content: input }],
            max_tokens: 500,
        })

        // Collect chunks from the stream
        let out = ""
        for await (const chunk of stream) {
            if (chunk.choices && chunk.choices.length > 0) {
                const newContent = chunk.choices[0].delta.content
                out += newContent
                setOutput((prev) => prev + newContent) // Update output as chunks arrive
            }
        }

        setLoading(false) // Set loading to false after receiving all chunks
    }

    return (
        <div>
            <h1>Chat with LLaMA</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask me anything..."
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Send"}
                </button>
            </form>
            <div>
                <h2>Response:</h2>
                <p>{output}</p>
            </div>
        </div>
    )
}

export default ChatComponent

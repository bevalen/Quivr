import { XCircleIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from "react";
import LoadingWheel from "./LoadingWheel";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

export default function ScriptureChat({ chatData, prompt, handleCloseChatModal }) {

    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState("");

    const messages = [
        { role: "user", content: prompt },
        { role: "assistant", content: `Here's a scripture passage that may help: ${chatData.reference}: ${chatData.content}` },
        { role: "user", content: "Can you briefly help me understand how to apply that to my situation?" },
        { role: "assistant", content: "Here's how you can apply it to your situation:" },
    ];

    const handleChat = async () => {
        try {
            const res = await fetch("/api/openai/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ messages }),
            });

            const data = await res.json();
            console.log('Chat Response:', data.response);
            setResponse(data.response);
        } catch (error) {
            console.error("Error fetching the response:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleChat();
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Darkened background */}
            <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={handleCloseChatModal}
            ></div>
            
            {/* Chat modal */}
            <div className="relative z-10 bg-white border shadow-lg rounded-lg p-4 w-full max-w-md sm:max-w-lg lg:max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold">Practical Application</h3>
                        {/* Add the chatData.reference here */}
                        <p className="text-sm sm:text-base text-gray-600 mt-1">{chatData.reference}</p>
                    </div>
                    <button onClick={handleCloseChatModal} className="ml-4">
                        <XCircleIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                    </button>
                </div>

                {/* Display loading wheel or the response */}
                {loading ? (
                    <div className="flex justify-center items-center">
                        <LoadingWheel />
                    </div>
                ) : (
                    <div className="max-h-96 sm:max-h-[32rem] overflow-y-auto">
                        <ReactMarkdown 
                            rehypePlugins={[rehypeRaw]} 
                            remarkPlugins={[remarkGfm]} 
                            components={{
                                h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-2" {...props} />,
                                h2: ({node, ...props}) => <h2 className="text-xl font-semibold mb-2" {...props} />,
                                h3: ({node, ...props}) => <h3 className="text-lg font-semibold mb-2" {...props} />,
                                p: ({node, ...props}) => <p className="text-base mb-4" {...props} />,
                                ul: ({node, ...props}) => <ul className="list-disc ml-5 mb-4" {...props} />,
                                ol: ({node, ...props}) => <ol className="list-decimal ml-5 mb-4" {...props} />,
                                blockquote: ({node, ...props}) => <blockquote className="border-l-4 pl-4 italic mb-4" {...props} />,
                            }}>
                            {response}
                        </ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
}
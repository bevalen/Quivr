"use client";
import { useState } from "react";
import ScriptureCard from './components/ScriptureCard'; // Adjust the path as needed
import LoadingWheel from "./components/LoadingWheel";
import ScriptureChat from "./components/ScriptureChat";

export default function Home() {
  const [emotion, setEmotion] = useState("");
  const [situation, setSituation] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [passages, setPassages] = useState([]); // Always initialize as an array
  const [loading, setLoading] = useState(false);
  const [chatModal, setChatModal] = useState(false);
  const [chatData, setChatData] = useState({});
  const [prompt, setPrompt] = useState(""); // Add this line

  const emotions = ["Angry", "Sad", "Anxious", "Happy", "Confused", "Tempted", "Doubt", "Weak Faith"];
  const situations = ["Family", "Marriage", "Children", "Finances", "Work", "Health", "Relationships", "Decision Making", "Sinful Desires", "Faith"];

  const handleSubmit = async () => {
    setLoading(true);
    setPassages([]); // Clear previous passages and ensure it's an array
  
    const generatedPrompt = `I feel ${emotion} about ${situation}. ${additionalNotes}`;
    setPrompt(generatedPrompt); // Save the prompt to state
  
    try {
      const res = await fetch("/api/openai/scripture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: generatedPrompt }),
      });
  
      const data = await res.json();
      const parsedResponse = JSON.parse(data.response);
      console.log('Parsed Passages:', parsedResponse.passages); // Log the passages array
  
      setPassages(parsedResponse.passages || []); // Ensure passages is always an array
  
    } catch (error) {
      console.error("Error fetching the response:", error);
      setPassages([{ reference: "Error", version: "", content: "Something went wrong." }]);
    }
  
    setLoading(false);
  };  

  const handleChatClick = (cardData) => {
    setChatData(cardData);
    setChatModal(true);
  }

  const handleCloseChatModal = () => {
    setChatModal(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 py-10 px-4 lg:px-0">

      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome to Quivr</h1>
        <p className="text-lg text-gray-600">A place to find scripture for spiritual battles.</p>
        {/* Explain how to use it */}
        <p className="text-lg text-gray-600">Select how you&apos;re feeling and the situation you&apos;re facing.</p>
        <p className="text-lg text-gray-600">Add any additional notes and click submit to receive relevant passages to help you through it.</p>
      </div>


      {/* Divider line */}

      <div className="w-80 md:w-2/3 border-t border-gray-300 my-10"></div>

      <h1 className="text-xl font-bold text-center">How are you feeling?</h1>
      <div className="flex flex-wrap justify-center space-x-2">
        {emotions.map((em) => (
          <div
            key={em}
            onClick={() => setEmotion(em)}
            className={`cursor-pointer px-4 py-2 rounded border text-center mb-2 ${emotion === em ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
          >
            {em}
          </div>
        ))}
      </div>

      <h1 className="text-xl font-bold text-center">What&apos;s the situation?</h1>
      <div className="flex flex-wrap justify-center space-x-2">
        {situations.map((sit) => (
          <div
            key={sit}
            onClick={() => setSituation(sit)}
            className={`cursor-pointer px-4 py-2 rounded border text-center mb-2 ${situation === sit ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
          >
            {sit}
          </div>
        ))}
      </div>

      {/* Conditional Emotions and Situation Prompt */}

      {emotion && situation && (
        <div className="text-center">
          <p className="text-lg mt-4">
            &quot;I&apos;m feeling <strong>{emotion}</strong> about my <strong>{situation}</strong>.&quot;
          </p>
        </div>
      )}

      <textarea
        value={additionalNotes}
        onChange={(e) => setAdditionalNotes(e.target.value)}
        placeholder="Can you share more?"
        className="border rounded px-4 py-2 w-full max-w-md h-24 mt-4"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={loading}
      >
        {loading ? "Loading..." : "Submit"}
      </button>
      {loading && <p>Quivr is looking for scripture passages..</p>}
      {loading && <LoadingWheel />}

      {passages.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mx-2 lg:mx-20">
          {passages.map((passage, index) => (
            <ScriptureCard
              key={index}
              reference={passage.reference}
              version={passage.version}
              content={passage.content}
              handleChatClick={handleChatClick}
            />
          ))}
        </div>
      )}
        
        {/* chatModal && Show ScriptureChat.js */}
      {chatModal && (
        <ScriptureChat
        chatData={chatData}
        prompt={prompt}
        handleCloseChatModal={handleCloseChatModal}
        />
      )}
    </div>
  );
}
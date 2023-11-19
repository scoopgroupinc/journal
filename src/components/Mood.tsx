import React from "react";

function Mood({ mood, setMood }: { mood: number; setMood: any }) {
  const count = ["😩", "😔", "😐", "🙂", "😄"];
  console.log(mood);
  return (
    <div className="flex items-center space-x-3">
      {count.map((emoji, index) => {
        console.log(index == mood ? mood : "");
        return (
          <button
            className={` text-4xl w-[50px] ${index !== mood ? "opacity-30" : ""}`}
            key={index}
            onClick={() => setMood(index)}
          >
            {emoji}
          </button>
        );
      })}
    </div>
  );
}

export default Mood;

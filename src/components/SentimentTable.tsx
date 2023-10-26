import React from "react";

export const FEELINGS = {
  AFFECTIONATE: { id: "AFFECTIONATE", name: "Affectionate", emoji: "😍" },
  CONFIDENT: { id: "CONFIDENT", name: "Confident", emoji: "😎" },
  ENGAGED: { id: "ENGAGED", name: "Engaged", emoji: "🤩" },
  EXCITED: { id: "EXCITED", name: "Excited", emoji: "🤪" },
  EXHILARATED: { id: "EXHILARATED", name: "Exhilarated", emoji: "😃" },
  GRATEFUL: { id: "GRATEFUL", name: "Grateful", emoji: "🥰" },
  HOPEFUL: { id: "HOPEFUL", name: "Hopeful", emoji: "🤗" },
  JOYFUL: { id: "JOYFUL", name: "Joyful", emoji: "😂" },
  INSPIRED: { id: "INSPIRED", name: "Inspired", emoji: "🥲" },
  PEACEFUL: { id: "PEACEFUL", name: "Peaceful", emoji: "😌" },
  REFRESHED: { id: "REFRESHED", name: "Refreshed", emoji: "😊" },
  AFRAID: { id: "AFRAID", name: "Afraid", emoji: "😨" },
  ANNOYED: { id: "ANNOYED", name: "Annoyed", emoji: "😒" },
  ANGRY: { id: "ANGRY", name: "Angry", emoji: "😡" },
  AVERSION: { id: "AVERSION", name: "Aversion", emoji: "😖" },
  CONFUSED: { id: "CONFUSED", name: "Confused", emoji: "🤔" },
  DISCONNECTED: { id: "DISCONNECTED", name: "Disconnected", emoji: "😔" },
  DISQUIET: { id: "DISQUIET", name: "Disquiet", emoji: "🫨" },
  EMBARRASSED: { id: "EMBARRASSED", name: "Embarrassed", emoji: "😳" },
  FATIGUED: { id: "FATIGUED", name: "Fatigued", emoji: "🥱" },
  PAIN: { id: "PAIN", name: "Pain", emoji: "😣" },
  SAD: { id: "SAD", name: "Sad", emoji: "😢" },
  TENSE: { id: "TENSE", name: "Tense", emoji: "😬" },
  VULNERABLE: { id: "VULNERABLE", name: "Vulnerable", emoji: "😰" },
  YEARNING: { id: "YEARNING", name: "Yearning", emoji: "🥺" },
};

const SentimentTable = ({ sentiment }) => {
  // Function to determine the appropriate CSS class based on sentiment
  const determineClass = (sentiment) => {
    switch (sentiment) {
      case "POSITIVE":
        return "bg-teal-700 text-white";
      case "NEGATIVE":
        return "bg-rose-800 text-white";
      case "NEUTRAL":
        return "bg-amber-400 text-black";
      default:
        return "bg-gray-100 text-black";
    }
  };
  if (!sentiment || sentiment.length === 0) {
    return null;
  }
  return (
    <div className="py-8">
      <h2 className="text-2xl text-white mb-0">Sentiment Analysis</h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-800 rounded-lg not-prose">
          <thead className="text-sm text-white uppercase bg-zinc-600 dark:bg-zinc-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-white ">
                Sentence
              </th>
              <th scope="col" className="px-6 py-3 text-white ">
                Feelings
              </th>
              <th scope="col" className="px-6 py-3 text-white ">
                Sentiment
              </th>
            </tr>
          </thead>
          <tbody>
            {sentiment.map((item, index) => {
              // Extract feelings from the item
              const feelings = [...(item?.FEELINGS?.MET || []), ...(item?.FEELINGS?.NOT_MET || [])];
              console.log(feelings);
              const feelingsList = feelings.map(
                (key) => `${FEELINGS[key]?.emoji || ""} ${FEELINGS[key].name}`
              );

              return (
                <tr key={index}>
                  <td className="border px-6 py-4 bg-white">{item.SENTENCE}</td>
                  <td className="border px-6 py-4 bg-white">{feelingsList.join(", ")}</td>
                  <td className={`border px-6 py-4 ${determineClass(item.SENTENCE_SENTIMENT)}`}>
                    {item.SENTENCE_SENTIMENT}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SentimentTable;

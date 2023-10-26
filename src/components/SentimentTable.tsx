import React from "react";
import { FEELINGS } from "@/lib/nonviolentcommunication";
const SentimentTable = ({ sentiment }) => {
  // Function to determine the appropriate CSS class based on sentiment
  const determineClass = (sentiment) => {
    switch (sentiment) {
      case "POSITIVE":
        return "bg-teal-100 text-white";
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
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-800">
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
              const feelings = item.FEELINGS.MET || item.FEELINGS.NOT_MET;
              const met_condition_feelings = FEELINGS[item.FEELINGS.MET ? "MET" : "NOT_MET"];
              const feelingsList = Object.keys(feelings).map(
                (key) => `${met_condition_feelings[key]?.emoji || ""} ${key} (${feelings[key]})`
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

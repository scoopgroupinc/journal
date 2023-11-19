"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FEELINGS, SIMILAR_FEELINGS } from "@/lib/nonviolentcommunication";
import ChevronLeft from "@/components/icons/chevron-left";
import TinyMCE from "@/components/TinyMCE";
import SentimentTable from "@/components/SentimentTable";
import { downloadHtmlFile } from "@/lib/downloadHtml";
import { constructHtmlFile } from "@/lib/constructHtmlFile";

function Dashboard({ params: { token } }: { params: { token: string } }) {
  const [sentiment, setSentiment] = useState([]);

  const router = useRouter();

  let now = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const [selectedFeeling, setSelectedFeeling] = useState<{
    [key: string]: {
      feeling: string;
      selected: boolean;
      sad: boolean;
      emoji: string;
    };
  }>({});

  const options = Object.values(FEELINGS.MET);
  const unmet_options = Object.values(FEELINGS.NOT_MET);
  let selectedArray = Object.values(selectedFeeling);

  const onSelectFeeling = (feeling, emoji, sad) => {
    setSelectedFeeling(
      Object.assign({}, selectedFeeling, {
        [feeling]: { selected: !selectedFeeling[feeling]?.selected, emoji, sad, feeling },
      })
    );
  };

  const editorRef = useRef(null);
  const download = () => {
    if (editorRef.current) {
      const htmlString = editorRef.current.getContent();
      downloadHtmlFile(constructHtmlFile(htmlString));
      // try {
      //   fetch("/api/save_html", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ data: constructHtmlFile(htmlString).toString() }), // send the HTML data as a JSON payload
      //   })
      //     .then((response) => response.json())
      //     .then((data) => console.log(data));
      // } catch (error) {
      //   console.error("Error:", error);
      // }
    }
  };

  const getAnalysis = () => {
    if (editorRef.current) {
      const text = editorRef.current.getContent({ format: "text" });
      console.log(text);
      try {
        fetch("/api/sentiment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 40000,
          body: JSON.stringify({ data: text }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.data);
            const sent = JSON.parse(data.data);
            if (sent?.records) {
              setSentiment(sent.records);
            }
          });
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const onInit = (evt, editor) => (editorRef.current = editor);

  return (
    <>
      <div className="bg-gradient"></div>
      <button
        className="bg-white rounded-[5px] w-[45px] h-[45px] flex justify-center items-center font-bold p-2 m-2 shadow focus:outline-none focus:shadow-outline"
        onClick={() => router.back()}
      >
        <ChevronLeft />
      </button>
      <div className="max-w-screen-md mx-auto w-full prose p-[10px]">
        <div className="grid sm:grid-cols-2 gap-2 mt-[16px]">
          <div className="card w-full w-90 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Identify Your Feelings</h2>
              <p>
                Identifying your feelings is important for emotional regulation. When you can
                express yourself, it allows for deeper emotional connections with others.
              </p>
            </div>
          </div>
          <div>
            {selectedArray.map(({ feeling, selected, sad, emoji }) => {
              return (
                selected && (
                  <div className={`badge${sad ? " badge-neutral" : ""}`} key={feeling}>
                    {emoji} {feeling}
                  </div>
                )
              );
            })}
          </div>
        </div>
        <h4 className="text-white">Select what you&rsquo;re feeling</h4>
        <div className="collapse bg-white">
          <input type="radio" name="feeling-accordion" />
          <div className="collapse-title text-xl font-medium">When your needs feel met</div>
          <div className="collapse-content bg-zinc-200">
            <div className="grid sm:grid-cols-3 gap-2 mt-[16px]">
              {options &&
                options.map(({ id, name, emoji }) => (
                  <div key={id} className="flex flex-col items-center">
                    <div className="collapse bg-white">
                      <input type="radio" name="met-accordion" />
                      <div className="collapse-title">
                        <div className="text-3xl border-white">
                          {emoji} <span className="text-base text-center leading-2">{name}</span>
                        </div>
                      </div>
                      <div className="collapse-content bg-white">
                        {SIMILAR_FEELINGS[id] &&
                          SIMILAR_FEELINGS[id].map((feeling) => (
                            <button
                              key={feeling}
                              className={`btn btn-xs ${
                                selectedFeeling[feeling] && "btn-active btn-primary"
                              }`}
                              onClick={() => {
                                onSelectFeeling(feeling, emoji, false);
                              }}
                            >
                              {feeling}
                              {selectedFeeling[feeling] && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              )}
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="collapse bg-white">
          <input type="radio" name="feeling-accordion" />
          <div className="collapse-title text-xl font-medium">When your needs aren&rsquo;t met</div>
          <div className="collapse-content bg-zinc-200">
            <div className="grid sm:grid-cols-3 gap-2 mt-[16px]">
              {unmet_options &&
                unmet_options.map(({ id, name, emoji }) => (
                  <div key={id} className="flex flex-col items-center">
                    {" "}
                    {/* Adjusted classes here */}
                    <div className="collapse bg-white">
                      <input type="radio" name="unmet-accordion" />
                      <div className="collapse-title">
                        <div className="text-3xl border-white">
                          {emoji} <span className="text-base text-center leading-2">{name}</span>
                        </div>
                      </div>
                      <div className="collapse-content bg-white">
                        {SIMILAR_FEELINGS[id] &&
                          SIMILAR_FEELINGS[id].map((feeling) => (
                            <button
                              key={feeling}
                              className={`btn btn-xs ${
                                selectedFeeling[feeling] && "btn-active btn-primary"
                              }`}
                              onClick={() => {
                                onSelectFeeling(feeling, emoji, true);
                              }}
                            >
                              {feeling}
                              {selectedFeeling[feeling] && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              )}
                            </button>
                          ))}
                      </div>
                    </div>
                    <div className="w-full text-center"></div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <h4 className="text-white">What happened?</h4>
        <TinyMCE onInit={onInit} />
        <button className="btn mt-4 btn-secondary" onClick={download}>
          Download as HTML
        </button>

        <button className="btn mt-4 btn-secondary" onClick={getAnalysis}>
          Get Sentiment Analysis
        </button>

        <SentimentTable sentiment={sentiment} />

        {sentiment && (
          <div>
            <h4 className="prose text-white">What would you do differently now?</h4>
            <textarea className="textarea w-full" />
          </div>
        )}
      </div>
      <footer className="footer p-10 bg-neutral text-neutral-content mt-[100px]">
        <nav>
          <header className="footer-title">Facets</header>
          <a className="link link-hover" href="https://facets.one" target="_blank">
            Website
          </a>
          <a className="link link-hover" href="https://facets.one/about" target="_blank">
            About Facets
          </a>
        </nav>
        <nav>
          <header className="footer-title">Resources</header>
          <a className="link link-hover" href="https://www.cnvc.org/learn/what-is-nvc">
            Non Violent Communication
          </a>
          <a
            className="link link-hover"
            href="https://hbr.org/2016/11/3-ways-to-better-understand-your-emotions"
          >
            Harvard Business Review: 3 Ways To Better Understand Your Emotions
          </a>
        </nav>
      </footer>
    </>
  );
}

export default Dashboard;

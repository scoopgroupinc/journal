"use client";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { FEELINGS, SIMILAR_FEELINGS } from "../../lib/nonviolentcommunication";
import { constructHtmlFile } from "../../lib/constructHtmlFile";

function Dashboard({ params: { token } }: { params: { token: string } }) {
  const openai_key = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  const tinymce_key = process.env.NEXT_PUBLIC_TINYMCE_API_KEY;
  console.log("tinymce_key", tinymce_key);
  console.log("openai_key", process.env.NEXT_PUBLIC_OPENAI_API_KEY);

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
  const log = () => {
    if (editorRef.current) {
      const htmlString = editorRef.current.getContent();
      const text = editorRef.current.getContent({ format: "text" });
      console.log(text);
      console.log("------");
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

      try {
        fetch("/api/sentiment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: text }),
        })
          .then((response) => response.json())
          .then((data) => console.log("sentiment", data));
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      <div className="bg-gradient"></div>

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
        <h4 className="text-white">What happened?</h4>

        <Editor
          apiKey={tinymce_key}
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{
            plugins:
              "insertdatetime ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat | insertdatetime",
            insertdatetime_dateformat: "%d-%m-%Y",
            tinycomments_mode: "embedded",
            tinycomments_author: "Author name",
            mergetags_list: [
              { value: "First.Name", title: "First Name" },
              { value: "Email", title: "Email" },
            ],
            ai_request: (request, respondWith) => {
              const openAiOptions = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${openai_key}`,
                },
                body: JSON.stringify({
                  model: "gpt-3.5-turbo",
                  temperature: 0.7,
                  max_tokens: 800,
                  messages: [{ role: "user", content: request.prompt }],
                }),
              };
              respondWith.string((signal) =>
                window
                  .fetch("https://api.openai.com/v1/chat/completions", { signal, ...openAiOptions })
                  .then((response) => (response.ok ? response.json() : response.text()))
                  .then((data) => {
                    console.log("data", data);
                    if (typeof data === "string") {
                      Promise.reject(`Failed to communicate with the ChatGPT API. ${data}`);
                    } else if (data.error) {
                      Promise.reject(
                        `Failed to communicate with the ChatGPT API because of ${data.error.type} error: ${data.error.message}`
                      );
                    } else {
                      // Extract the response content from the data returned by the API
                      return data?.choices[0]?.message?.content?.trim();
                    }
                  })
              );
            },
          }}
          initialValue="Welcome to TinyMCE!"
        />
        <button onClick={log}>Log editor content</button>
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
                    <div className="w-full text-center"></div>
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

"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { constructHtmlFile } from "@/lib/constructHtmlFile";
import ChevronLeft from "@/components/icons/chevron-left";
import TinyMCE from "@/components/TinyMCE";
import { downloadHtmlFile } from "@/lib/downloadHtml";

function Journal({ params: { token } }: { params: { token: string } }) {
  const router = useRouter();

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

  const onInit = (evt, editor) => (editorRef.current = editor);

  return (
    <>
      <div className="bg-gradient"></div>
      <button
        className="bg-white rounded-[5px] w-[45px] h-[45px] flex justify-center items-center font-bold p-2 m-2 shadow focus:outline-none focus:shadow-outline"
        onClick={() => router.push("/")}
      >
        <ChevronLeft />
      </button>
      <div className="max-w-screen-md mx-auto w-full prose p-[10px]">
        <div className="grid sm:grid-cols-2 gap-2 mt-[16px]">
          <div className="card w-full w-90 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Journal</h2>
              <p>
                Journaling is a practice that people have been engaged in for centuries, providing a
                range of mental, emotional, and even physical health benefits. Benefits include:
                Enhancement of Creativity, Clarification of Thoughts and Feelings, Increased
                Self-Confidence, and Stress Reduction.
              </p>
            </div>
          </div>
        </div>
        <h4 className="text-white">What happened?</h4>
        <TinyMCE onInit={onInit} />
        <button className="btn mt-4 btn-secondary" onClick={download}>
          Download Journal as HTML
        </button>
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

export default Journal;

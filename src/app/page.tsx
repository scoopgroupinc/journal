"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FacetsLogoWithText from "@/components/FacetsLogoWithText";
import moment from "moment";
import Water from "@/components/Water";
import Mood from "@/components/Mood";

function Index() {
  const [message, setMessage] = useState<string>("Loading...");
  const [water, setWater] = useState<number>(-1);
  const [mood, setMood] = useState<number>(-1);
  const router = useRouter();
  useEffect(() => {
    fetch("/api/json")
      .then((res) => res.json())
      .then((data) => console.log(setMessage(data.message)));
  }, []);

  const now = moment();
  const formattedDate = now.format("dddd, MMMM D, YYYY");
  return (
    <>
      <div className="bg-gradient"></div>
      <div className="flex flex-row min-h-screen" style={{ paddingBottom: 150 }}>
        <div className="max-w-screen-md mx-auto w-full">
          <div className="flex justify-center mt-10">
            <FacetsLogoWithText width={50} />
          </div>
          <div
            className="flex justify-center mt-5 mb-5 rounded-full mx-auto"
            style={{ width: 100, height: 100, backgroundColor: "#333" }}
          >
            <Image
              className="not-prose"
              style={{ borderRadius: "50%" }}
              width={100}
              height={100}
              src="https://media.licdn.com/dms/image/C5603AQEMItwK7rS6vw/profile-displayphoto-shrink_400_400/0/1611383726778?e=1703721600&v=beta&t=LEMA3XTJn7uM0VNCjlMWNvb6LUUBQAdQxjVDR6Mxgkk"
              alt="profile image"
              placeholder="blur"
              blurDataURL="https://media.licdn.com/dms/image/C5603AQEMItwK7rS6vw/profile-displayphoto-shrink_400_400/0/1611383726778?e=1703721600&v=beta&t=LEMA3XTJn7uM0VNCjlMWNvb6LUUBQAdQxjVDR6Mxgkk"
            />
          </div>
          <div className="text-white text-lg text-center mt-[-40px] prose">
            <span className="text-3xl">😃</span>
            <h4 className=" text-white">Hi Natalie!</h4>
            <div className="text-sm pb-[20px]">{formattedDate}</div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="flex">
                <div className="pt-[15px] pr-1">Water: </div>
                <Water cups={8} water={water} setWater={setWater} />
              </div>
              <div className="flex pt-3">
                <div className="pt-[5px] pr-2">Mood: </div>
                <Mood mood={mood} setMood={setMood} />
              </div>
            </div>
          </div>

          <h4 className="py-[40px] text-white text-lg text-center prose">
            What would you like to do today?
          </h4>
          <div className="flex flex-row flex-wrap justify-evenly">
            <button
              className="card w-[220px] h-[210px] bg-base-100 shadow-xl text-black mb-[10px]"
              onClick={() => router.push("/feelings")}
            >
              <div className="card-body">
                <h4 className="card-title">Identify Your Feelings</h4>
                <p className="text-xs text-left">
                  Having strong emotions or no emotions at all? Get in touch with your feelings
                  through this jounraling activity.
                </p>
              </div>
            </button>
            <button
              className="card w-[220px] h-[210px] bg-base-100 shadow-xl text-black mb-[10px]"
              onClick={() => router.push("/goals")}
            >
              <div className="card-body">
                <h4 className="card-title">Identify Your Goals</h4>
                <p className="text-xs text-left">
                  Identifying your goals is about creating a vision for what you want and providing
                  yourself with a clear method to realize that vision.
                </p>
              </div>
            </button>
            <button
              className="card w-[220px] h-[210px] bg-base-100 shadow-xl text-black mb-[10px]"
              onClick={() => router.push("/values")}
            >
              <div className="card-body">
                <h4 className="card-title">Identify Your Values</h4>
                <p className="text-xs text-left">
                  Values evolve with experience, so it&rsquo;s good to revisit your values
                  periodically.
                </p>
              </div>
            </button>
            <button
              className="card w-[220px] h-[210px] bg-base-100 shadow-xl text-black mb-[10px]"
              onClick={() => router.push("/journal")}
            >
              <div className="card-body">
                <h4 className="card-title">Journal</h4>
                <p className="text-xs text-left">Blank slate to write about anything you want.</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;

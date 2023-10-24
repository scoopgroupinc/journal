"use client";
import React, { use, useEffect, useState } from "react";

function Main() {
  const [message, setMessage] = useState<string>("Loading...");
  useEffect(() => {
    fetch("/api/json")
      .then((res) => res.json())
      .then((data) => console.log(setMessage(data.message)));
  }, []);

  return <div>{message}</div>;
}

export default Main;

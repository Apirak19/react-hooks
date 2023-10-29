import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar.jsx";

const coverCount = 10;
const MIN = 1;

export const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionDuration, setTransitionDuration] = useState(1);

  const getCoverImage = (url, initialValue = null) => {
    const [result, setResult] = useState(initialValue);
    useEffect(() => {
      fetch(url).then(async (res) => {
        const json = await res.json();
        setResult(json);
      });
    }, []);
    return result;
  };

  const getJoke = (url, initialJoke = null) => {
    const [joke, setJoke] = useState(initialJoke);
    useEffect(() => {
      fetch(url).then(async (res) => {
        const json = await res.json();
        setJoke(json);
      });
    }, []);
    return joke;
  };

  useEffect(() => {
    const duration = transitionDuration < MIN ? MIN : transitionDuration;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 10);
    }, duration * 1000);

    return () => {
      console.log("clear");
      clearInterval(interval);
    };
  }, [transitionDuration]);

  const coverImage = getCoverImage(
    `https://shibe.online/api/shibes?count=${coverCount}`,
    []
  );

  const joke = getJoke("https://official-joke-api.appspot.com/random_ten", []);
  return (
    <>
      <Navbar />
      <h1>Welcome to my homepage</h1>
      {/*  TODO: Cover Images */}
      <h1>Set Duration</h1>
      <input
        type="number"
        value={transitionDuration}
        onChange={(e) => setTransitionDuration(e.target.value)}
      />

      <div>
        <img height={200} src={coverImage[currentIndex]} alt="" />
      </div>
      {/*  TODO: Jokes */}
      <div>
        <h1>Jokes</h1>
        {joke.map((joke, index) => (
          <div key={index}>
            <p>{joke.setup}</p>;<p>{joke.punchline}</p>;
          </div>
        ))}
      </div>
    </>
  );
};

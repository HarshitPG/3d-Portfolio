import React, { useState, useEffect } from "react";

const Preloader = ({ onComplete }) => {
  // State to track whether the assets are loaded or not
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading time (You can replace this with actual asset loading logic)
    const loadingTime = 40000; // 3 seconds
    const timer = setTimeout(() => {
      setLoaded(true);
    }, loadingTime);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // If assets are loaded, trigger the onComplete callback
    if (loaded) {
      onComplete();
    }
  }, [loaded, onComplete]);

  return (
    <div className="loader">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Preloader;

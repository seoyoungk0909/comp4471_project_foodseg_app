import React, { useState, useRef, useEffect } from "react";
import UploadForm from "./components/UploadForm";
import ResultsPage from "./components/ResultsPage";
import "./styles/App.css";

const App = () => {
  const [result, setResult] = useState(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [result]);

  return (
    <div className="wrapper">
      <div className="content">
        <h1>Food Segmentation Tool</h1>
        <p>Upload a food image for detailed nutritional breakdown</p>
        <UploadForm setResult={setResult} />
        <div ref={resultsRef}>
          <ResultsPage result={result} />
        </div>
      </div>
      <footer>
        COMP4471 Group Project: Food instance segmentation with YOLO
        <br />
        KIM Seoyoung | WAN Nga Chi | WONG Pak Sing
        <br />
        <a href="https://github.com/seoyoungk0909/comp4471_project">
          Link to Github Repository
        </a>
      </footer>
    </div>
  );
};

export default App;

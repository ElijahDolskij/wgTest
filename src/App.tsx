import { EllepsisText } from "./EllepsisText/EllepsisText";
import { ProgressBarContainer } from "./ProgressBar";
import "./App.css";
import { SyntheticEvent, useState } from "react";

function App() {
  const [progressStub, setProgressStub] = useState(0);
  const [containerWidth, setContainerWidth] = useState("auto");
  const [containerHeight, setContainerHeight] = useState("auto");

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    setProgressStub((stub) => (progressStub < 1200_000 ? stub + 50_000 : 0));
  };

  return (
    <>
      <div className="demo-divider" />
      <button onClick={handleClick}>Next</button>
      <ProgressBarContainer
        comaInThausand
        current={progressStub}
        max={1200_000}
      />
      <div className="demo-divider" />
      <input
        type="text"
        value={containerWidth}
        onChange={(e) => setContainerWidth((prev) => e.target.value)}
      />
      <input
        type="text"
        value={containerHeight}
        onChange={(e) => setContainerHeight((prev) => e.target.value)}
      />
      <div
        style={{
          width:
            containerWidth === "auto" ? containerWidth : containerWidth + "px",
          height:
            containerHeight === "auto"
              ? containerHeight
              : containerHeight + "px",
          lineHeight: 1.2
        }}
      >
        <EllepsisText lineHeight={1.2}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </EllepsisText>
      </div>
    </>
  );
}

export default App;

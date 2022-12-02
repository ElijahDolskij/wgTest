import { EllipsisText } from "./EllipsisText";
import { ProgressBarContainer } from "./ProgressBar";
import "./App.css";
import { SyntheticEvent, useState } from "react";

const LOADER_MAX_VALUE = 1200_000;

function App() {
  const [progressStub, setProgressStub] = useState(0);
  const [containerWidth, setContainerWidth] = useState("auto");
  const [containerHeight, setContainerHeight] = useState("auto");

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    setProgressStub((stub) =>
      progressStub < LOADER_MAX_VALUE ? stub + 50_000 : 0
    );
  };

  return (
    <div id="demoStand">
      <button onClick={handleClick} style={{ marginBottom: 10 }}>
        Next
      </button>
      <ProgressBarContainer
        comaInThausand
        currentValue={progressStub}
        maxValue={LOADER_MAX_VALUE}
      />
      <div className="demo-divider" />
      <input
        type="text"
        value={containerWidth}
        onChange={(e) => setContainerWidth((prev) => e.target.value)}
        title="Text container width"
      />
      <input
        type="text"
        value={containerHeight}
        onChange={(e) => setContainerHeight((prev) => e.target.value)}
        title="Text container height"
      />
      <div
        style={{
          width:
            containerWidth === "auto" ? containerWidth : containerWidth + "px",
          height:
            containerHeight === "auto"
              ? containerHeight
              : containerHeight + "px",
          marginTop: 10,
          backgroundColor: "lightgray",
          lineHeight: 1.2,
        }}
      >
        <EllipsisText>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </EllipsisText>
      </div>
    </div>
  );
}

export default App;

import { forwardRef } from "react";
import "./ProgressBar.css";

interface IProgressBarProps {
  progressText: string;
  arrowOffsetLeft: string;
  boatOffsetLeft: string;
  boatImageWidth?: number;
}

const ProgressBar = forwardRef<HTMLDivElement, IProgressBarProps>(
  (
    {
      progressText,
      arrowOffsetLeft,
      boatOffsetLeft,
      boatImageWidth = 40,
    }: IProgressBarProps,
    ref
  ) => {
    
    return (
      <div className="UUID_RootStylesIsolation" ref={ref}>
        <div className="water" />
        <div className="progress">
          <div className="progressArrow" style={{ left: arrowOffsetLeft }} />
        </div>
        <div
          className="boat"
          style={{ left: boatOffsetLeft, width: boatImageWidth }}
        >
          <div className="boatText">{progressText}</div>
        </div>
      </div>
    );
  }
);

export { ProgressBar };

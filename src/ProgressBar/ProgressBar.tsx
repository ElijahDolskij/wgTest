import { forwardRef } from "react";
import "./ProgressBar.css";
import Boat from './img/boatImg.svg'

interface IProgressBarProps {
  progressText: string;
  arrowOffsetLeft: string;
  boatOffsetLeft: string;
  boatImageWidth?: number;
  comaInThausand?: boolean;
  arrowWidth?: number;
}

const ProgressBar = forwardRef<HTMLDivElement, IProgressBarProps>(
  (
    {
      progressText,
      arrowOffsetLeft,
      boatOffsetLeft,
      boatImageWidth,
      comaInThausand,
      arrowWidth,
    }: IProgressBarProps,
    sceneElRef
  ) => {
    return (
      <div className="generatedHashPrefix-scene" ref={sceneElRef}>
        <div className="water" />
        <div className="progress">
          <div className="progressFill" style={{ width: arrowOffsetLeft }} />
          <div
            className="progressArrow"
            style={{ left: arrowOffsetLeft, width: arrowWidth }}
          />
        </div>
        <div
          className="boat"
          style={{ left: boatOffsetLeft, width: boatImageWidth + "px" }}
        >
          <img src={Boat} alt="boat" />
          <div className="boatText">
            {comaInThausand
              ? progressText.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : progressText}
          </div>
        </div>
      </div>
    );
  }
);

export { ProgressBar };

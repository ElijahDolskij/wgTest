import { useEffect, useRef, useState, memo } from "react";
import { ProgressBar } from "./ProgressBar";

const ProgressBarMemoized = memo(
  ProgressBar,
  (prev, next) =>
    prev.arrowOffsetLeft === next.arrowOffsetLeft &&
    prev.boatOffsetLeft === next.boatOffsetLeft
);

interface IProgressBarContainerProps {
  percentage: number;
  boatImageWidth?: number;
  arrowWidth?: number;
}

const ProgressBarContainer = ({
  percentage,
  boatImageWidth = 40,
  arrowWidth = 2,
}: IProgressBarContainerProps) => {
  const scene = useRef<HTMLDivElement>(null);
  const [boatOffsetLeft, setBoatOffsetLeft] = useState<string>("0");
  const [arrowOffsetLeft, setArrowOffsetLeft] = useState<string>("0");

  useEffect(() => {
    const halfOfBoat = boatImageWidth / 2;
    const halfOfArrow = arrowWidth / 2;
    const sceneWidth = scene.current?.clientWidth ?? 0;
    const percentInPx = sceneWidth / 100;

    const calculateOffsetFor = (width: number, half: number) => {
      if (percentInPx * percentage > half) {
        if (percentInPx * percentage + half > sceneWidth) {
          return `calc(100% - ${width}px)`;
        } else {
          return `calc(${percentage}% - ${half}px)`;
        }
      } else {
        return "0";
      }
    };

    setBoatOffsetLeft(calculateOffsetFor(boatImageWidth, halfOfBoat));
    setArrowOffsetLeft(calculateOffsetFor(arrowWidth, halfOfArrow));
  }, [percentage, boatImageWidth, arrowWidth]);

  return (
    <ProgressBarMemoized
      progressText={percentage.toString()}
      boatImageWidth={boatImageWidth}
      boatOffsetLeft={boatOffsetLeft}
      arrowOffsetLeft={arrowOffsetLeft}
      ref={scene}
    />
  );
};

export { ProgressBarContainer };

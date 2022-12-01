import { useEffect, useRef, useState, memo } from "react";
import { ProgressBar } from "./ProgressBar";

const ProgressBarMemoized = memo(
  ProgressBar,
  (prev, next) =>
    prev.arrowOffsetLeft === next.arrowOffsetLeft &&
    prev.boatOffsetLeft === next.boatOffsetLeft
);

interface IProgressBarContainerProps {
  current: number;
  max: number;
  boatImageWidth?: number;
  arrowWidth?: number;
  comaInThausand?: boolean;
}

const ProgressBarContainer = ({
  current,
  max,
  boatImageWidth = 80,
  arrowWidth = 2,
  comaInThausand,
}: IProgressBarContainerProps) => {
  const scene = useRef<HTMLDivElement>(null);
  const [boatOffsetLeft, setBoatOffsetLeft] = useState<string>("0");
  const [arrowOffsetLeft, setArrowOffsetLeft] = useState<string>("0");

  useEffect(() => {
    const onePercentOfMax = max / 100;
    const currentInPercent = current / onePercentOfMax;
    const halfOfBoat = boatImageWidth / 2;
    const halfOfArrow = arrowWidth / 2;
    const sceneWidth = scene.current?.clientWidth ?? 0;
    const scenePercInPx = sceneWidth / 100;

    const calculateOffsetFor = (width: number, half: number) => {
      if (scenePercInPx * currentInPercent > half) {
        if (scenePercInPx * currentInPercent + half > sceneWidth) {
          return `calc(100% - ${width}px)`;
        } else {
          return `calc(${currentInPercent}% - ${half}px)`;
        }
      } else {
        return "0";
      }
    };

    setBoatOffsetLeft(calculateOffsetFor(boatImageWidth, halfOfBoat));
    setArrowOffsetLeft(calculateOffsetFor(arrowWidth, halfOfArrow));
  }, [boatImageWidth, arrowWidth, max, current]);

  return (
    <ProgressBarMemoized
      progressText={current.toString()}
      boatImageWidth={boatImageWidth}
      boatOffsetLeft={boatOffsetLeft}
      arrowOffsetLeft={arrowOffsetLeft}
      comaInThausand={comaInThausand}
      ref={scene}
    />
  );
};

export { ProgressBarContainer };

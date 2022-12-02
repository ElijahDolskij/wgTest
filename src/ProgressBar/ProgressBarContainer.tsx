import { useEffect, useRef, useState, memo } from "react";
import { ProgressBar } from "./ProgressBar";

const ProgressBarMemoized = memo(
  ProgressBar,
  (prev, next) =>
    prev.arrowOffsetLeft === next.arrowOffsetLeft &&
    prev.boatOffsetLeft === next.boatOffsetLeft
);

interface IProgressBarContainerProps {
  currentValue: number;
  maxValue: number;
  boatImageWidth?: number;
  arrowWidth?: number;
  comaInThausand?: boolean;
}

const ProgressBarContainer = ({
  currentValue,
  maxValue,
  boatImageWidth = 80,
  arrowWidth = 2,
  comaInThausand,
}: IProgressBarContainerProps) => {
  const sceneEl = useRef<HTMLDivElement>(null);
  const [boatOffsetLeft, setBoatOffsetLeft] = useState<string>("0");
  const [arrowOffsetLeft, setArrowOffsetLeft] = useState<string>("0");

  useEffect(() => {
    const onePercentOfMax = maxValue / 100;
    const currentInPercs = currentValue / onePercentOfMax;
    const halfOfBoatWIdth = boatImageWidth / 2;
    const halfOfArrowWidth = arrowWidth / 2;
    const sceneWidth = sceneEl.current?.clientWidth ?? 0;
    const scenePercInPx = sceneWidth / 100;

    const calculateOffsetFor = (width: number, half: number) => {
      if (scenePercInPx * currentInPercs > half) {
        if (scenePercInPx * currentInPercs + half > sceneWidth) {
          return `calc(100% - ${width}px)`;
        } else {
          return `calc(${currentInPercs}% - ${half}px)`;
        }
      } else {
        return "0";
      }
    };

    setBoatOffsetLeft(calculateOffsetFor(boatImageWidth, halfOfBoatWIdth));
    setArrowOffsetLeft(calculateOffsetFor(arrowWidth, halfOfArrowWidth));
  }, [boatImageWidth, arrowWidth, maxValue, currentValue]);

  return (
    <ProgressBarMemoized
      progressText={currentValue.toString()}
      boatImageWidth={boatImageWidth}
      boatOffsetLeft={boatOffsetLeft}
      arrowOffsetLeft={arrowOffsetLeft}
      comaInThausand={comaInThausand}
      arrowWidth={arrowWidth}
      ref={sceneEl}
    />
  );
};

export { ProgressBarContainer };

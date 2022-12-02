import { useEffect, useRef, useState } from "react";
import throttle from "lodash/throttle";
import "./EllipsisText.css";

interface IEllipsisTextProps {
  children: JSX.Element | string;
  lineHeight?: number;
}

const EllipsisText = ({ lineHeight = 1.2, children }: IEllipsisTextProps) => {
  const parentEl = useRef<HTMLDivElement>(null);
  const textEl = useRef<HTMLDivElement>(null);
  const [clamp, setClamp] = useState<number | string>("unset");

  useEffect(() => {
    if (!textEl.current) {
      return;
    }

    const textLineHeight =
      parseInt(
        window.getComputedStyle(textEl.current).getPropertyValue("font-size")
      ) * lineHeight;

    const reCalculateClamp: ResizeObserverCallback = (
      elements: ReadonlyArray<ResizeObserverEntry>
    ) => {
      const element = elements[0]
      const parentElHeight = (element.target.parentNode as Element)
        ?.clientHeight;
      const currentTextElHeight = (element.target.firstElementChild as Element)
        ?.clientHeight;
      const childMoreOn = parentElHeight - currentTextElHeight;

      if (
        Number.isFinite(parentElHeight) &&
        Number.isFinite(currentTextElHeight) &&
        Number.isFinite(childMoreOn)
      ) {

        setClamp((prev) =>
          childMoreOn ? Math.floor(parentElHeight / textLineHeight) : prev
        );
      }
    };

    const observer = new ResizeObserver(
      throttle(reCalculateClamp, 500, {
        leading: false,
      })
    );

    parentEl.current && observer.observe(parentEl.current);

    return () => observer.disconnect();
  }, [lineHeight]);

  return (
    <div ref={parentEl} id="generatedHashPrefix-text">
      <div ref={textEl} style={{ WebkitLineClamp: clamp }}>
        {children}
      </div>
    </div>
  );
};

export { EllipsisText };

import { useEffect, useRef, useState } from "react";
import throttle from "lodash/throttle";
import "./EllepsisText.css";

interface IEllepsisTextProps {
  children: JSX.Element | string;
  lineHeight?: number;
}

const EllepsisText = ({ lineHeight = 1.2, children }: IEllepsisTextProps) => {
  const parent = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLDivElement>(null);
  const [clamp, setClamp] = useState<number | string>("unset");

  useEffect(() => {
    const oneLineHeight =
      text.current &&
      parseInt(
        window.getComputedStyle(text.current).getPropertyValue("font-size")
      ) * lineHeight;

    const recalCulateStrings = (entries: any) => {
      entries.forEach((entry: any) => {
        const currentHeight = entry.contentRect.height;
        const parentHeight = entry.target.parentNode.clientHeight;
        const childHeight = entry.target.firstElementChild.clientHeight;

        if (oneLineHeight) {
          setClamp((prev) => {
            if (childHeight > parentHeight) {
              return Math.floor(currentHeight / oneLineHeight) - 1;
            } else if (parentHeight > childHeight + oneLineHeight / 2) {
              return "unset";
            }

            return prev;
          });
        }
      });
    };

    const observer = new ResizeObserver(
      throttle(recalCulateStrings, 500, {
        leading: false,
      })
    );

    parent.current && observer.observe(parent.current);

    return () => observer.disconnect();
  }, [lineHeight]);

  return (
    <div ref={parent} id="text">
      <div ref={text} style={{ WebkitLineClamp: clamp }}>
        {children}
      </div>
    </div>
  );
};

export { EllepsisText };

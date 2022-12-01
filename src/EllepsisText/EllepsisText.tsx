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
    if (!text.current) {
      return;
    }

    const oneLineTextSize =
      parseInt(
        window.getComputedStyle(text.current).getPropertyValue("font-size")
      ) * lineHeight;

    const reCalculateStrings = (entries: any) => {
      entries.forEach((entry: any) => {
        const parentHeight = entry.target.parentNode.clientHeight;
        const childHeight = entry.target.firstElementChild.clientHeight;
        const childMoreOn = parentHeight - childHeight;

        setClamp((prev) => {
          if (childMoreOn) {
            const r = Math.floor(parentHeight / oneLineTextSize);
          
            return r;
          }

          return prev;
        });
      });
    };

    const observer = new ResizeObserver(
      throttle(reCalculateStrings, 500, {
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

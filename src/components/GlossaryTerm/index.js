import React, {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Link from "@docusaurus/Link";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

const TOOLTIP_GAP = 8;
const VIEWPORT_MARGIN = 8;

const useIsomorphicLayoutEffect = ExecutionEnvironment.canUseDOM
  ? useLayoutEffect
  : useEffect;

export default function GlossaryTerm({ href, summary, title, children }) {
  const tooltipId = useId();
  const wrapperRef = useRef(null);
  const tooltipRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({
    top: 0,
    left: 0,
    arrowLeft: 0,
    placement: "top",
    measured: false,
  });

  const updateCoords = useCallback(() => {
    const wrapper = wrapperRef.current;
    const tooltip = tooltipRef.current;
    if (!wrapper || !tooltip) return;
    const rects = wrapper.getClientRects();
    const rect = rects.length > 0 ? rects[0] : wrapper.getBoundingClientRect();
    const tipRect = tooltip.getBoundingClientRect();
    const spaceAbove = rect.top;
    const placement =
      spaceAbove > tipRect.height + TOOLTIP_GAP ? "top" : "bottom";
    const top =
      placement === "top"
        ? rect.top - tipRect.height - TOOLTIP_GAP
        : rect.bottom + TOOLTIP_GAP;
    const linkCenterX = rect.left + rect.width / 2;
    const half = tipRect.width / 2;
    const minCenterX = VIEWPORT_MARGIN + half;
    const maxCenterX = window.innerWidth - VIEWPORT_MARGIN - half;
    const centerX = Math.min(Math.max(linkCenterX, minCenterX), maxCenterX);
    const arrowLeft = linkCenterX - (centerX - half);
    setCoords({ top, left: centerX, arrowLeft, placement, measured: true });
  }, []);

  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => {
    setVisible(false);
    setCoords((c) => ({ ...c, measured: false }));
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!visible) return undefined;
    updateCoords();
    const onScrollOrResize = () => updateCoords();
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [visible, updateCoords]);

  const tooltip =
    summary && visible && ExecutionEnvironment.canUseDOM
      ? createPortal(
          <span
            ref={tooltipRef}
            id={tooltipId}
            className={`glossary-term__tooltip glossary-term__tooltip--${coords.placement}`}
            role="tooltip"
            style={{
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              opacity: coords.measured ? 1 : 0,
              "--glossary-term-arrow-x": `${coords.arrowLeft}px`,
            }}
          >
            <span className="glossary-term__tooltip-title">{title}</span>
            <span>{summary}</span>
          </span>,
          document.body
        )
      : null;

  return (
    <span
      ref={wrapperRef}
      className="glossary-term"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <Link
        className="glossary-term__link"
        to={href}
        aria-describedby={summary ? tooltipId : undefined}
      >
        {children}
      </Link>
      {tooltip}
    </span>
  );
}

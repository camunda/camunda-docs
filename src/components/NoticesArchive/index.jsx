import React, { useEffect, useRef, useState } from "react";

// Collapsible section for older security notices. It opens itself when the URL
// hash points at an element inside it, so links like #notice-30 keep working.
export default function NoticesArchive({ summary, children }) {
  const detailsRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openForHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const target = document.getElementById(id);
      if (target && detailsRef.current?.contains(target)) {
        setOpen(true);
        requestAnimationFrame(() => target.scrollIntoView());
      }
    };

    openForHash();
    window.addEventListener("hashchange", openForHash);
    return () => window.removeEventListener("hashchange", openForHash);
  }, []);

  return (
    <details
      ref={detailsRef}
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
        {summary}
      </summary>
      {children}
    </details>
  );
}

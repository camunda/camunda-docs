import { useEffect, useRef, useState } from "react";

export default function ExpandableTable({ title, children }) {
  const [showFullscreen, setShowFullscreen] = useState(false);
  const closeButtonRef = useRef(null);
  const expandButtonRef = useRef(null);

  const handleShowFullscreen = () => setShowFullscreen(true);
  const handleClose = () => setShowFullscreen(false);

  useEffect(() => {
    if (!showFullscreen) return;

    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      expandButtonRef.current?.focus();
    };
  }, [showFullscreen]);

  return (
    <>
      <div className="expandable-table-container">
        <div className="expandable-table-header">
          <span className="expandable-table-header-title">{title}</span>
          <button
            ref={expandButtonRef}
            className="expand-button"
            onClick={handleShowFullscreen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                fill="currentColor"
                d="m21 15.344l-2.121 2.121l-3.172-3.172l-1.414 1.414l3.172 3.172L15.344 21H21zM3 8.656l2.121-2.121l3.172 3.172l1.414-1.414l-3.172-3.172L8.656 3H3zM21 3h-5.656l2.121 2.121l-3.172 3.172l1.414 1.414l3.172-3.172L21 8.656zM3 21h5.656l-2.121-2.121l3.172-3.172l-1.414-1.414l-3.172 3.172L3 15.344z"
              />
            </svg>
            Show full table
          </button>
        </div>
        {children}
      </div>

      {showFullscreen ? (
        <div
          className="expanded-table-modal"
          role="dialog"
          aria-modal="true"
          aria-label={title || "Expanded table"}
        >
          <div
            className="expanded-table-modal-backdrop"
            onClick={handleClose}
          />
          <div className="expanded-table-modal-contents">
            <div className="expanded-table-modal-header">
              {title ? (
                <h2 className="expanded-table-modal-title">{title}</h2>
              ) : null}

              <button
                ref={closeButtonRef}
                className="close-button"
                aria-label="Close"
                onClick={handleClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 32 32"
                >
                  <path d="M0 0h32v32H0z" fill="none" />
                  <path
                    fill="currentColor"
                    d="M17.414 16L24 9.414L22.586 8L16 14.586L9.414 8L8 9.414L14.586 16L8 22.586L9.414 24L16 17.414L22.586 24L24 22.586z"
                  />
                </svg>
              </button>
            </div>
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
}

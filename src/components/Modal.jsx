import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

/**
 * 공통 모달 — children만 바꿔 재사용
 */
function Modal({ open, onClose, title, children, className }) {
  const titleId = useId();
  const panelRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;

    const html = document.documentElement;
    const body = document.body;

    const prev = {
      htmlOverflow: html.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyOverscroll: body.style.overscrollBehavior,
    };

    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";

    const onKey = (e) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prev.htmlOverflow;
      html.style.overscrollBehavior = prev.htmlOverscroll;
      body.style.overflow = prev.bodyOverflow;
      body.style.overscrollBehavior = prev.bodyOverscroll;
    };
  }, [open]);

  useEffect(() => {
    if (!open || !panelRef.current) return;
    const focusable = panelRef.current.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable) focusable.focus();
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[2000] flex items-end justify-center sm:items-center p-0 sm:p-4 overflow-hidden overscroll-none">
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-label="모달 닫기"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={clsx(
          "relative z-[1] flex min-h-0 w-full max-h-[92vh] flex-col sm:max-h-[92vh] overflow-y-auto overscroll-contain rounded-t-3xl sm:rounded-3xl",
          "bg-white dark:bg-[#22272e] border border-gray-200 dark:border-white/10 shadow-2xl",
          className ?? "sm:max-w-2xl",
        )}
      >
        <div className="sticky top-0 z-[2] flex items-start justify-between gap-3 px-5 pt-4 pb-3 border-b border-gray-200/80 dark:border-white/10 bg-white/95 dark:bg-[#22272e]/95 backdrop-blur-md">
          {title ? (
            <h2
              id={titleId}
              className="text-primary text-[18px] sm:text-[20px] font-bold leading-snug pr-2"
            >
              {title}
            </h2>
          ) : (
            <span className="sr-only">상세</span>
          )}
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-secondary hover:text-primary hover:bg-gray-100 dark:hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-[var(--point)] focus-visible:outline-none"
            aria-label="닫기"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-5 py-4 sm:py-5">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;

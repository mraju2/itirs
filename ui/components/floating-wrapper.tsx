"use client";

import React, { useState, useRef } from "react";
import {
  useFloating,
  offset,
  shift,
  arrow,
  useInteractions,
  useHover,
  useClick,
  useDismiss,
  useRole,
  Placement,
} from "@floating-ui/react";

interface FloatingWrapperProps<T extends HTMLElement = HTMLElement> {
  mode?: "hover" | "click";
  placement?: Placement;
  offsetValue?: number;
  renderTrigger: (
    props: React.HTMLProps<T>,
    ref: React.Ref<T>
  ) => React.ReactNode;
  renderContent: () => React.ReactNode;
  className?: string;
}

export const FloatingWrapper = <T extends HTMLElement = HTMLElement>({
  mode = "hover",
  placement = "top",
  offsetValue = 8,
  renderTrigger,
  renderContent,
  className = "",
}: FloatingWrapperProps<T>) => {
  const arrowRef = useRef(null);
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context, middlewareData } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    middleware: [offset(offsetValue), shift(), arrow({ element: arrowRef })],
  });

  const hover = useHover(context, { enabled: mode === "hover" });
  const click = useClick(context, { enabled: mode === "click" });
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    click,
    dismiss,
    role,
  ]);

  return (
    <>
      {renderTrigger(
        getReferenceProps() as React.HTMLProps<T>,
        refs.setReference as React.Ref<T>
      )}

      {open && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className={`z-50 bg-white border border-gray-300 rounded shadow-md text-sm p-3 ${className}`}
        >
          <div
            ref={arrowRef}
            className="bg-white w-2 h-2 rotate-45 border-t border-l border-gray-300 absolute"
            style={{
              left:
                middlewareData.arrow?.x != null
                  ? `${middlewareData.arrow.x}px`
                  : "",
              top:
                middlewareData.arrow?.y != null
                  ? `${middlewareData.arrow.y}px`
                  : "",
            }}
          />
          {renderContent()}
        </div>
      )}
    </>
  );
};

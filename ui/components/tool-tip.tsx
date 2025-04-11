import {
  useFloating,
  offset,
  useHover,
  useFocus,
  useRole,
  useInteractions,
  FloatingPortal,
  arrow,
} from "@floating-ui/react";
import React, { useRef, useState } from "react";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
}

export const Tooltip = ({ children, content }: TooltipProps) => {
  const arrowRef = useRef(null);
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context, middlewareData } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(8), arrow({ element: arrowRef })],
    placement: "top",
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    role,
  ]);

  return (
    <>
      <span ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </span>
      {open && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className="bg-gray-800 text-white text-xs rounded px-2 py-1 z-50 shadow-md max-w-xs"
            {...getFloatingProps()}
          >
            {content}
            <div
              ref={arrowRef}
              className="absolute w-2 h-2 bg-gray-800 rotate-45"
              style={{
                left: middlewareData.arrow?.x,
                top: middlewareData.arrow?.y,
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

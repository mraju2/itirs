import React, { useEffect } from "react";
import {
  useFloating,
  offset,
  useDismiss,
  useClick,
  useInteractions,
  FloatingPortal,
} from "@floating-ui/react";

interface FloatingConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  referenceRef: React.RefObject<HTMLElement>;
  message: string;
}

export const FloatingConfirmDialog: React.FC<FloatingConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  referenceRef,
  message,
}) => {
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: (open) => !open && onClose(),
    placement: "right",
    middleware: [offset(8)],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getFloatingProps } = useInteractions([click, dismiss]);

  // Connect trigger button to the floating context
  useEffect(() => {
    const refEl = referenceRef.current;
    if (refEl) refs.setReference(refEl);
  }, [referenceRef]);

  if (!open) return null;

  return (
    <FloatingPortal>
      <div
        ref={refs.setFloating}
        style={floatingStyles}
        className="z-50 bg-white border shadow-xl rounded-lg p-4 w-64"
        {...getFloatingProps()}
      >
        <p className="text-sm text-gray-800 mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </FloatingPortal>
  );
};

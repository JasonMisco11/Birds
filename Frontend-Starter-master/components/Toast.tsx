    import React, { useEffect } from "react";

type Props = { message: string | null; onClose: () => void };

export default function Toast({ message, onClose }: Props) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;
  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white px-4 py-2 rounded shadow z-50">
      {message}
    </div>
  );
}

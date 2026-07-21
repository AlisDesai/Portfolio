"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { FileIcon, PaperclipIcon, XIcon } from "@/components/features/contact/icons";
import { cn } from "@/lib/utils/cn";

import { EASE_PREMIUM } from "@/components/animations/easing";

interface AttachmentDropzoneProps {
  reduceMotion: boolean;
}

/** Drag-and-drop attachment picker with empty / hover / drag / success states. */
export function AttachmentDropzone({ reduceMotion }: AttachmentDropzoneProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (files && files.length > 0) setFileName(files[0].name);
  };

  return (
    <div>
      <p className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">Attachment</p>
      <label
        htmlFor="contact-attachment"
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragActive(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => setIsDragActive(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragActive(false);
          handleFiles(event.dataTransfer.files);
        }}
        className={cn(
          "mt-4 flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-dashed px-6 py-5 transition-all duration-300",
          isDragActive
            ? "border-accent bg-accent/5 scale-[1.01]"
            : fileName
              ? "border-accent/40 bg-accent/5"
              : "border-zinc-200 bg-zinc-50/60 hover:bg-zinc-100/80"
        )}
      >
        <input
          ref={inputRef}
          id="contact-attachment"
          type="file"
          className="sr-only"
          onChange={(event) => handleFiles(event.target.files)}
        />
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
            fileName ? "bg-accent text-white" : "bg-accent/10 text-accent"
          )}
        >
          {fileName ? <FileIcon className="size-4.5" /> : <PaperclipIcon className="size-4.5" />}
        </span>

        <AnimatePresence mode="wait" initial={false}>
          {fileName ? (
            <motion.span
              key="file"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
              transition={{ duration: 0.25, ease: EASE_PREMIUM }}
              className="flex min-w-0 flex-1 items-center justify-between gap-3"
            >
              <span className="min-w-0 truncate text-base font-semibold text-zinc-900 sm:text-lg">
                {fileName}
              </span>
              <button
                type="button"
                aria-label="Remove attachment"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setFileName(null);
                  if (inputRef.current) inputRef.current.value = "";
                }}
                className="flex size-7 shrink-0 items-center justify-center rounded-full text-zinc-400 transition-colors duration-300 hover:bg-zinc-200 hover:text-zinc-900"
              >
                <XIcon className="size-3.5" />
              </button>
            </motion.span>
          ) : (
            <motion.span
              key="prompt"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
              transition={{ duration: 0.25, ease: EASE_PREMIUM }}
              className="text-base font-semibold text-zinc-500 sm:text-lg"
            >
              {isDragActive ? "Drop it here" : "Drag a file here, or click to browse"}
            </motion.span>
          )}
        </AnimatePresence>
      </label>
    </div>
  );
}

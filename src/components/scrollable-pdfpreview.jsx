"use client";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { scrollModePlugin } from "@react-pdf-viewer/scroll-mode";
import "@react-pdf-viewer/core/lib/styles/index.css";

// You already have this logic
import { version } from "pdfjs-dist/package.json";
const workerUrl = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;

export default function ScrollablePdfPreview({ fileUrl }) {
  const scrollPlugin = scrollModePlugin();

  return (
    <div className="h-[400px] overflow-hidden relative group">
      <div className="transition-transform duration-1000 ease-in-out group-hover:-translate-y-[50%] group-hover:delay-300">
        <Worker workerUrl={workerUrl}>
          <Viewer
            fileUrl={fileUrl}
            plugins={[scrollPlugin]}
            defaultScale={0.5}
          />
        </Worker>
      </div>
    </div>
  );
}

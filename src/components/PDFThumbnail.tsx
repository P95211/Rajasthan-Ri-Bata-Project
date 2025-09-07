import { useState, useRef, useEffect } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import { FileText, AlertCircle } from 'lucide-react';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFThumbnailProps {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const PDFThumbnail = ({ 
  url, 
  alt = "PDF thumbnail", 
  width = 128, 
  height = 96,
  className = "" 
}: PDFThumbnailProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageWidth, setPageWidth] = useState(width);
  const [documentLoaded, setDocumentLoaded] = useState(false);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setDocumentLoaded(true);
    setError(null);
  }

  function onDocumentLoadError(error: Error) {
    console.error('PDF load error:', error);
    setError('Failed to load PDF');
    setLoading(false);
  }

  function onPageLoadSuccess() {
    setLoading(false);
  }

  function onPageLoadError(error: Error) {
    console.error('PDF page load error:', error);
    setError('Failed to load PDF page');
    setLoading(false);
  }

  useEffect(() => {
    setPageWidth(width);
  }, [width]);

  if (loading && !documentLoaded) {
    return (
      <div 
        className={`${className} flex items-center justify-center bg-muted/50 rounded-lg border border-border/20`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <div className="text-center">
          <FileText className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
          <span className="text-xs text-muted-foreground hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className={`${className} flex items-center justify-center bg-red-50 border border-red-200`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <div className="text-center">
          <AlertCircle className="h-6 w-6 text-red-500 mx-auto mb-1" />
          <span className="text-xs text-red-600">Error</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`${className} pdf-thumbnail flex items-center justify-center overflow-hidden`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={
          <div className="flex items-center justify-center h-full">
            <FileText className="h-6 w-6 text-gray-400" />
          </div>
        }
        error={
          <div className="flex items-center justify-center h-full">
            <AlertCircle className="h-6 w-6 text-red-500" />
          </div>
        }
      >
        {documentLoaded && (
          <Page
            pageNumber={1}
            width={pageWidth}
            onLoadSuccess={onPageLoadSuccess}
            onLoadError={onPageLoadError}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            loading={
              <div className="flex items-center justify-center h-full">
                <FileText className="h-6 w-6 text-gray-400" />
              </div>
            }
            error={
              <div className="flex items-center justify-center h-full">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
            }
          />
        )}
      </Document>
    </div>
  );
};
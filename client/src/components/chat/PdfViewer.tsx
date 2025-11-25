import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PdfViewerProps {
  storagePath: string;
  fileName: string;
}

export function PdfViewer({ storagePath, fileName }: PdfViewerProps) {
  return (
    <div className="relative group">
      <div 
        className="w-full rounded-md overflow-y-auto bg-slate-100 dark:bg-slate-900 flex items-center justify-center"
        style={{
          maxHeight: '400px',
          aspectRatio: '0.707', // A4 ratio (210/297)
        }}
      >
        <iframe
          src={storagePath}
          title={fileName}
          className="w-full h-full"
          style={{ border: 'none' }}
          data-testid="pdf-preview-iframe"
        />
      </div>

      {/* Download button on hover */}
      <Button
        size="sm"
        variant="ghost"
        asChild
        className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background"
        data-testid="btn-download-pdf-viewer"
      >
        <a href={storagePath} download={fileName}>
          <Download className="h-4 w-4" />
        </a>
      </Button>
    </div>
  );
}

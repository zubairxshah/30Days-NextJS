import react from 'react';
import HTMLPreviewComponent from '@/app/components/html-previewer';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <HTMLPreviewComponent />
    </div>
  );
}
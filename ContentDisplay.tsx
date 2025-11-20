import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ContentType, CourseDetails } from '../types';
import { Download, RefreshCw, Printer, AlertCircle, FileText } from 'lucide-react';

interface ContentDisplayProps {
  contentType: ContentType;
  content: string | null;
  isLoading: boolean;
  courseDetails: CourseDetails;
  onGenerate: () => void;
}

export const ContentDisplay: React.FC<ContentDisplayProps> = ({
  contentType,
  content,
  isLoading,
  courseDetails,
  onGenerate,
}) => {
  const getTitle = () => {
    switch (contentType) {
      case ContentType.LESSON_PLAN: return 'Lesson Plan';
      case ContentType.COURSE_MATERIALS: return 'Lecture Notes';
      case ContentType.QUESTION_BANK: return 'Question Bank';
      case ContentType.ASSIGNMENTS: return 'Assignment Questions';
      default: return 'Content';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Custom renderer components for ReactMarkdown to enforce Tailwind styling
  const MarkdownComponents = {
    h1: ({node, ...props}: any) => <h1 className="text-3xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2" {...props} />,
    h2: ({node, ...props}: any) => <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4" {...props} />,
    h3: ({node, ...props}: any) => <h3 className="text-xl font-semibold text-primary-700 mt-6 mb-3" {...props} />,
    p: ({node, ...props}: any) => <p className="text-slate-700 mb-4 leading-relaxed" {...props} />,
    ul: ({node, ...props}: any) => <ul className="list-disc list-outside ml-6 mb-4 space-y-2 text-slate-700" {...props} />,
    ol: ({node, ...props}: any) => <ol className="list-decimal list-outside ml-6 mb-4 space-y-2 text-slate-700" {...props} />,
    li: ({node, ...props}: any) => <li className="pl-1" {...props} />,
    blockquote: ({node, ...props}: any) => <blockquote className="border-l-4 border-primary-500 pl-4 py-1 my-4 italic bg-slate-50 rounded-r text-slate-600" {...props} />,
    table: ({node, ...props}: any) => <div className="overflow-x-auto my-6 rounded-lg border border-slate-200"><table className="min-w-full divide-y divide-slate-200" {...props} /></div>,
    thead: ({node, ...props}: any) => <thead className="bg-slate-50" {...props} />,
    th: ({node, ...props}: any) => <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200" {...props} />,
    td: ({node, ...props}: any) => <td className="px-4 py-3 text-sm text-slate-700 border-b border-slate-100 whitespace-pre-wrap" {...props} />,
    strong: ({node, ...props}: any) => <strong className="font-semibold text-slate-900" {...props} />,
    code: ({node, inline, ...props}: any) => 
      inline 
        ? <code className="bg-slate-100 text-primary-700 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
        : <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto mb-4"><code className="font-mono text-sm" {...props} /></pre>,
  };

  if (!courseDetails.subjectName) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl m-4">
        <AlertCircle size={48} className="mb-4 text-slate-300" />
        <p className="text-lg font-medium text-slate-500">Please enter course details above to start.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Header Toolbar */}
      <div className="flex items-center justify-between mb-6 no-print">
        <div>
          <h2 className="text-2xl font-serif font-bold text-slate-800">{getTitle()}</h2>
          <p className="text-sm text-slate-500">
            {courseDetails.subjectName} • {courseDetails.targetAudience}
          </p>
        </div>
        <div className="flex gap-3">
          {content && (
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Printer size={16} />
              Print / Save PDF
            </button>
          )}
          <button
            onClick={onGenerate}
            disabled={isLoading}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-all shadow-sm ${
              isLoading 
                ? 'bg-primary-400 cursor-not-allowed' 
                : 'bg-primary-600 hover:bg-primary-700 hover:shadow-md active:transform active:scale-95'
            }`}
          >
            {isLoading ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                {content ? <RefreshCw size={16} /> : <Download size={16} />}
                {content ? 'Regenerate' : 'Generate Content'}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 overflow-hidden flex flex-col min-h-[600px]">
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-12">
             <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin mb-6"></div>
             <h3 className="text-lg font-medium text-slate-700 mb-2">Synthesizing {getTitle()}</h3>
             <p className="text-sm text-slate-500 max-w-md text-center">
               EduGen AI is analyzing the subject "{courseDetails.subjectName}" and structuring the content for {courseDetails.numUnits} units. This may take a few seconds.
             </p>
          </div>
        ) : content ? (
          <div className="flex-1 overflow-y-auto p-8 md:p-12 print:p-0 print:overflow-visible">
             <div className="prose prose-slate max-w-none print:prose-sm">
                {/* Print Header (Hidden on Screen) */}
                <div className="hidden print:block mb-8 border-b-2 border-black pb-4">
                  <h1 className="text-2xl font-bold uppercase tracking-wide mb-1">{courseDetails.subjectName}</h1>
                  <div className="flex justify-between text-sm">
                    <span>{getTitle()}</span>
                    <span>{courseDetails.targetAudience}</span>
                  </div>
                </div>
                
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={MarkdownComponents}
                >
                  {content}
                </ReactMarkdown>
             </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-slate-50/50">
            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
              <FileText size={32} className="text-primary-300" />
            </div>
            <p className="text-lg font-medium text-slate-600">No content generated yet.</p>
            <p className="text-sm text-slate-400 mt-1">Click the "Generate" button to start.</p>
          </div>
        )}
      </div>
    </div>
  );
};
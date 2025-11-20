import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { CourseForm } from './components/CourseForm';
import { ContentDisplay } from './components/ContentDisplay';
import { 
  ContentType, 
  CourseDetails, 
  GeneratedContent, 
  LoadingState 
} from './types';
import { DEFAULT_COURSE_DETAILS, PROMPTS } from './constants';
import { generateGeminiContent } from './services/geminiService';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ContentType>(ContentType.LESSON_PLAN);
  const [courseDetails, setCourseDetails] = useState<CourseDetails>(DEFAULT_COURSE_DETAILS);
  
  // Data States
  const [content, setContent] = useState<GeneratedContent>({
    [ContentType.LESSON_PLAN]: null,
    [ContentType.COURSE_MATERIALS]: null,
    [ContentType.QUESTION_BANK]: null,
    [ContentType.ASSIGNMENTS]: null,
  });

  const [loading, setLoading] = useState<LoadingState>({
    [ContentType.LESSON_PLAN]: false,
    [ContentType.COURSE_MATERIALS]: false,
    [ContentType.QUESTION_BANK]: false,
    [ContentType.ASSIGNMENTS]: false,
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleGenerate = async () => {
    if (!courseDetails.subjectName) return;

    setLoading(prev => ({ ...prev, [activeTab]: true }));

    let prompt = '';
    switch (activeTab) {
      case ContentType.LESSON_PLAN:
        prompt = PROMPTS[ContentType.LESSON_PLAN](courseDetails.subjectName, courseDetails.numUnits, courseDetails.weekDuration, courseDetails.targetAudience);
        break;
      case ContentType.COURSE_MATERIALS:
        prompt = PROMPTS[ContentType.COURSE_MATERIALS](courseDetails.subjectName, courseDetails.targetAudience);
        break;
      case ContentType.QUESTION_BANK:
        prompt = PROMPTS[ContentType.QUESTION_BANK](courseDetails.subjectName, courseDetails.numUnits);
        break;
      case ContentType.ASSIGNMENTS:
        prompt = PROMPTS[ContentType.ASSIGNMENTS](courseDetails.subjectName, courseDetails.numUnits);
        break;
    }

    try {
      const result = await generateGeminiContent(prompt);
      setContent(prev => ({ ...prev, [activeTab]: result }));
    } catch (error) {
      console.error(error);
      alert('Failed to generate content. Please check your API Key or try again.');
    } finally {
      setLoading(prev => ({ ...prev, [activeTab]: false }));
    }
  };

  // Derived status for sidebar indicators
  const generatedStatus = {
    [ContentType.LESSON_PLAN]: !!content[ContentType.LESSON_PLAN],
    [ContentType.COURSE_MATERIALS]: !!content[ContentType.COURSE_MATERIALS],
    [ContentType.QUESTION_BANK]: !!content[ContentType.QUESTION_BANK],
    [ContentType.ASSIGNMENTS]: !!content[ContentType.ASSIGNMENTS],
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-900">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-20 flex items-center px-4 justify-between">
        <span className="font-bold text-primary-600 text-lg">EduGen AI</span>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-600">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar (Desktop + Mobile Overlay) */}
      <div className={`
        fixed inset-0 z-30 transform transition-transform duration-300 md:relative md:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:flex
      `}>
        <div className="absolute inset-0 bg-black/50 md:hidden" onClick={() => setMobileMenuOpen(false)} />
        <div className="relative h-full flex">
           <Sidebar 
             activeTab={activeTab} 
             onTabChange={(tab) => {
               setActiveTab(tab);
               setMobileMenuOpen(false);
             }}
             generatedStatus={generatedStatus}
           />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden pt-16 md:pt-0">
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-6xl mx-auto h-full flex flex-col">
            
            {/* Top Form Area */}
            <CourseForm 
              details={courseDetails} 
              onChange={setCourseDetails}
              isLocked={Object.values(loading).some(Boolean)}
            />

            {/* Dynamic Content Area */}
            <ContentDisplay 
              contentType={activeTab}
              content={content[activeTab]}
              isLoading={loading[activeTab]}
              courseDetails={courseDetails}
              onGenerate={handleGenerate}
            />
            
            <div className="mt-8 text-center text-slate-400 text-xs pb-4 no-print">
              &copy; {new Date().getFullYear()} EduGen AI. Generated content should be reviewed by a subject matter expert.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
import React from 'react';
import { NavItem, ContentType } from '../types';
import { BookOpen, FileText, HelpCircle, ClipboardList, Settings } from 'lucide-react';

interface SidebarProps {
  activeTab: ContentType;
  onTabChange: (tab: ContentType) => void;
  generatedStatus: Record<ContentType, boolean>;
}

const NAV_ITEMS: NavItem[] = [
  { id: ContentType.LESSON_PLAN, label: 'Lesson Plan', icon: <BookOpen size={20} />, description: 'Schedule & Activities' },
  { id: ContentType.COURSE_MATERIALS, label: 'Course Materials', icon: <FileText size={20} />, description: 'Lecture Notes & Diagrams' },
  { id: ContentType.QUESTION_BANK, label: 'Question Bank', icon: <HelpCircle size={20} />, description: 'Part A & Part B Questions' },
  { id: ContentType.ASSIGNMENTS, label: 'Assignments', icon: <ClipboardList size={20} />, description: 'HOT Questions & Labs' },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, generatedStatus }) => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex-shrink-0 hidden md:flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-2 text-primary-600 font-bold text-xl">
          <div className="p-2 bg-primary-50 rounded-lg">
            <Settings size={24} />
          </div>
          <span>EduGen AI</span>
        </div>
        <p className="text-xs text-slate-400 mt-2">AI-Powered Curriculum Design</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">Modules</div>
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          const hasData = generatedStatus[item.id];
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 text-left group ${
                isActive 
                  ? 'bg-primary-50 text-primary-700 shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className={`${isActive ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">{item.label}</div>
                <div className="text-[10px] opacity-70 truncate">{item.description}</div>
              </div>
              {hasData && (
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" title="Content Generated" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-500">
          <p className="font-semibold mb-1">Gemini 2.5 Flash</p>
          <p>Powered by Google's latest high-efficiency model.</p>
        </div>
      </div>
    </aside>
  );
};
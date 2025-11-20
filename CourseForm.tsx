import React from 'react';
import { CourseDetails } from '../types';
import { Layers, Users, Book, Calendar } from 'lucide-react';

interface CourseFormProps {
  details: CourseDetails;
  onChange: (details: CourseDetails) => void;
  isLocked: boolean;
}

export const CourseForm: React.FC<CourseFormProps> = ({ details, onChange, isLocked }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({
      ...details,
      [name]: name === 'numUnits' || name === 'weekDuration' ? parseInt(value) || 0 : value,
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6 no-print">
      <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Book className="w-5 h-5 text-primary-500" />
        Course Configuration
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Subject Name</label>
          <div className="relative">
            <input
              type="text"
              name="subjectName"
              value={details.subjectName}
              onChange={handleChange}
              disabled={isLocked}
              placeholder="e.g. Thermodynamics"
              className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-slate-100 disabled:text-slate-500 transition-all"
            />
            <Book className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
          <div className="relative">
             <input
              type="text"
              name="targetAudience"
              value={details.targetAudience}
              onChange={handleChange}
              disabled={isLocked}
              placeholder="e.g. B.Tech Year 2"
              className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-slate-100 disabled:text-slate-500 transition-all"
            />
             <Users className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Number of Units</label>
          <div className="relative">
            <input
              type="number"
              name="numUnits"
              min={1}
              max={10}
              value={details.numUnits}
              onChange={handleChange}
              disabled={isLocked}
              className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-slate-100 disabled:text-slate-500 transition-all"
            />
            <Layers className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Duration (Weeks)</label>
          <div className="relative">
            <input
              type="number"
              name="weekDuration"
              min={1}
              max={52}
              value={details.weekDuration}
              onChange={handleChange}
              disabled={isLocked}
              className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-slate-100 disabled:text-slate-500 transition-all"
            />
            <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
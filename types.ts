import React from 'react';

export enum ContentType {
  LESSON_PLAN = 'LESSON_PLAN',
  COURSE_MATERIALS = 'COURSE_MATERIALS',
  QUESTION_BANK = 'QUESTION_BANK',
  ASSIGNMENTS = 'ASSIGNMENTS',
}

export interface CourseDetails {
  subjectName: string;
  targetAudience: string; // e.g., Undergraduate, High School
  numUnits: number;
  weekDuration: number;
}

export interface GeneratedContent {
  [ContentType.LESSON_PLAN]: string | null;
  [ContentType.COURSE_MATERIALS]: string | null;
  [ContentType.QUESTION_BANK]: string | null;
  [ContentType.ASSIGNMENTS]: string | null;
}

export interface LoadingState {
  [ContentType.LESSON_PLAN]: boolean;
  [ContentType.COURSE_MATERIALS]: boolean;
  [ContentType.QUESTION_BANK]: boolean;
  [ContentType.ASSIGNMENTS]: boolean;
}

export interface NavItem {
  id: ContentType;
  label: string;
  icon: React.ReactNode;
  description: string;
}
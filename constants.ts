import { ContentType } from './types';

export const DEFAULT_COURSE_DETAILS = {
  subjectName: 'Data Warehousing (CCS341)',
  targetAudience: 'Undergraduate Engineering',
  numUnits: 5,
  weekDuration: 15,
};

export const PROMPTS = {
  [ContentType.LESSON_PLAN]: (subject: string, units: number, weeks: number, audience: string) => `
    Act as an expert academic curriculum designer. Generate a detailed Lesson Plan for the course "${subject}" designed for ${audience}.
    The course covers ${units} units over ${weeks} weeks.
    
    DETAILS REQUIRED:
    1. **Weekly teaching schedule**: Organize the timeline.
    2. **Unit-wise breakdown**: Clear division of content.
    3. **Topics to be covered each hour**: Specific detail.
    4. **Activities planned for each unit**: e.g., Problem-solving, Mini demos, Case studies, Lab integrated activities, Flipped classroom components.
    5. **Internal Assessment components**: Slip tests, Unit tests, Quiz, Seminar, Assignments, Lab activities.
    6. **Attendance weightage**: Define the policy.
    
    FORMAT:
    - The lesson plan must be in a **Tabular Format**.
    - Use Markdown tables.
    - Organize sections with proper headings.
  `,

  [ContentType.COURSE_MATERIALS]: (subject: string, audience: string) => `
    Act as a subject matter expert professor. Provide full Lecture Notes for ALL units of "${subject}" (${audience}) in a structured form.
    
    INCLUDE FOR EACH UNIT:
    - **Clear definitions**
    - **Diagrams** (text-based representation/ASCII)
    - **Examples**
    - **Case studies**
    - **Real-time applications**
    - **Step-by-step explanations**
    - **Summary** at the end of each topic
    - **PowerPoint-style bullet points**
    - **Optional references** to demo videos or animations
    
    Lecture notes must be detailed enough for students to study directly.
    Maintain academic tone and proper formatting (Bold, Italic, Lists, Code blocks).
  `,

  [ContentType.QUESTION_BANK]: (subject: string, units: number) => `
    Prepare a full Question Bank for ALL ${units} units of "${subject}".
    
    FOR EACH UNIT:
    
    **Part A – 2 Marks Questions**
    - Minimum 20 questions with answers.
    - Must cover: definitions, differentiation, short concepts, formula-based, diagrams, and one-liners.
    - Ensure variety and no repetition.
    
    **Part B – 16 Marks Questions**
    - Minimum 10 questions with answers.
    - Include: Long essay questions, Solve-with-steps problems (where applicable), Case study questions, Draw-and-explain type questions, Compare/contrast questions.
    - Answers must be clear, structured, and exam-ready.
    
    Ensure consistency in terminology and provide clear headers for each Unit.
  `,

  [ContentType.ASSIGNMENTS]: (subject: string, units: number) => `
    Generate Assignment Questions for each of the ${units} Units of "${subject}".
    
    REQUIREMENTS PER UNIT:
    1. **Minimum 10 questions**.
    2. Include: descriptive, analytical, case-based, application-based, and problem-solving questions.
    3. **HOT Questions**: At least 2 higher-order thinking questions per unit.
    
    Assignments must be unique and not repeated from Part A or Part B.
    Organize with proper headings.
  `,
};
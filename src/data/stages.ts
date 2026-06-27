export interface Stage {
  id: number;
  label: string;
  title: string;
  description: string;
  lessonIds: number[];
}

export const STAGES: Stage[] = [
  {
    id: 1,
    label: "Stage 1",
    title: "Text & Color",
    description: "Learn how to style text and apply color to any element.",
    lessonIds: [1, 2, 3, 4],
  },
  {
    id: 2,
    label: "Stage 2",
    title: "Layout",
    description: "Master the layout tools that arrange and size content on the page.",
    lessonIds: [5, 6, 7],
  },
  {
    id: 3,
    label: "Stage 3",
    title: "Polish",
    description: "Add visual depth, responsiveness, and interactivity to your designs.",
    lessonIds: [8, 9, 10, 11],
  },
  {
    id: 4,
    label: "Stage 4",
    title: "Putting It All Together",
    description: "Apply everything you have learned to build a complete MediCore component.",
    lessonIds: [12],
  },
];

export interface WorkProject {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  theme: "blue" | "emerald" | "violet" | "amber" | "rose";
}

// Used by the /work page's editorial index + hover preview only — WorkStack
// (home page) keeps its own separate theme-class map untouched.
export const WORK_THEME_GRADIENTS: Record<WorkProject["theme"], string> = {
  blue: "from-blue-500 to-blue-300",
  emerald: "from-emerald-500 to-emerald-300",
  violet: "from-violet-500 to-violet-300",
  amber: "from-amber-500 to-amber-300",
  rose: "from-rose-500 to-rose-300",
};

export const WORK_THEME_ACCENTS: Record<WorkProject["theme"], string> = {
  blue: "text-blue-600",
  emerald: "text-emerald-600",
  violet: "text-violet-600",
  amber: "text-amber-600",
  rose: "text-rose-600",
};

export const WORK_PROJECTS: WorkProject[] = [
  {
    id: "mtc-app",
    title: "MTC (Material Testing App)",
    category: "Mobile Application",
    description:
      "Architected a multi-role mobile application for managing material testing operations. Implemented role-based access control and real-time data synchronization.",
    tags: ["Java", "Android", "Firebase", "RBAC"],
    theme: "blue",
  },
  {
    id: "ikhodal-automotive",
    title: "I Khodal Automotive",
    category: "Backend Development",
    description:
      "Developed a production-grade automotive booking backend with stateless authentication. Integrated Stripe Webhooks for payments and Resend for real-time emails.",
    tags: ["Java 17", "Spring Boot", "MySQL", "Stripe"],
    theme: "emerald",
  },
  {
    id: "texnova-machinery",
    title: "Texnova Machinery",
    category: "Corporate Website",
    description:
      "Designing a modern digital presence for a textile machinery manufacturer to showcase their engineering precision and textile innovation.",
    tags: ["Next.js", "Web Development", "Ongoing"],
    theme: "violet",
  },
  {
    id: "granth-impex",
    title: "Granth Impex",
    category: "E-Commerce Platform",
    description:
      "A premium jewellery platform combining a luxury product catalogue with WhatsApp-based sales, secure advance payments, and live order tracking.",
    tags: ["Next.js", "Spring Boot", "Razorpay", "Ongoing"],
    theme: "amber",
  },
  {
    id: "bugwise",
    title: "BugWise",
    category: "AI Bug Detection Tool",
    description:
      "A MERN stack platform that scans GitHub repositories and detects code bugs using CodeBERT AI, featuring dynamic dashboards for real-time analytics.",
    tags: ["React", "Node.js", "MongoDB", "CodeBERT"],
    theme: "rose",
  },
  {
    id: "washit",
    title: "WashIt",
    category: "Laundry Management System",
    description:
      "A simple, efficient laundry management system designed for hostel students and laundry service providers, featuring secure authentication and notifications.",
    tags: ["Java", "MySQL", "Bootstrap", "Java Mail"],
    theme: "blue",
  },
  {
    id: "skillbridge",
    title: "SkillBridge",
    category: "Peer-to-Peer AI Platform",
    description:
      "A peer-to-peer skill exchange platform built with the MERN stack, featuring AI-powered smart matching, real-time chat, and a comprehensive admin panel.",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    theme: "emerald",
  },
  {
    id: "noteit",
    title: "NoteIt",
    category: "Note Management System",
    description:
      "A robust Java web application designed to help users manage their notes efficiently, integrated with AI-powered note summarization using a Flask API and BART model.",
    tags: ["Java", "Hibernate", "MySQL", "Flask"],
    theme: "violet",
  },
];

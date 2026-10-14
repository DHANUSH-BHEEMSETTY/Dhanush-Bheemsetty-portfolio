import React from 'react';
import StackingCards, { type ProjectData } from '@/components/ui/stacking-card';

const dhanushProjects: ProjectData[] = [
  {
    title: 'HoverCharge — EV Wireless Charging Startup',
    description:
      'An on-demand mobile EV wireless charging discovery platform. Features a brutalist, responsive UI, interactive Google Gemini AI assistant for real-time driver telemetry queries, and live Chart.js fleet economics. 1st Place Winner at VLaunch Pad 2025.',
    link: '/hovercharge_preview.jpg',
    color: '#0F172A',
    badge: '🏆 1ST PLACE WINNER',
    year: '2025',
    role: 'Founder & Lead Builder',
    tags: ['React 19', 'Vite', 'Gemini API', 'Chart.js', 'CSS3 Animations'],
    demoUrl: 'https://hovercharge-react.onrender.com/',
  },
  {
    title: 'Smart Resume Screener — Explainable AI Pipeline',
    description:
      'Eliminates LLM hallucination in recruitment screening. Decouples structured factual extraction (Google Gemini 1.5 Flash + Zod) from a mathematical deterministic scoring engine, serving audit-ready match reasoning cards in React.',
    link: '/screener_preview.jpg',
    color: '#1E1B4B',
    badge: '🟢 WENT LIVE',
    year: '2025',
    role: 'Full-Stack AI Engineer',
    tags: ['React', 'TypeScript', 'Gemini 1.5 Flash', 'Zod', 'Tailwind CSS'],
    githubUrl: 'https://github.com/DHANUSH-BHEEMSETTY/RESUME_SCREENER',
  },
  {
    title: 'Real-Time Restricted Area Surveillance',
    description:
      'Ultra-low latency computer vision surveillance pipeline. Edge clients run YOLOv8 object detection on high-FPS feeds, pushing event payloads to FastAPI and broadcasting real-time intrusion cards to a Streamlit dashboard over WebSockets with sub-100ms latency.',
    link: '/surveillance_preview.jpg',
    color: '#1F1616',
    badge: '🛡️ EDGE AI SYSTEM',
    year: '2025',
    role: 'AI & Systems Engineer',
    tags: ['Python', 'YOLOv8', 'OpenCV', 'FastAPI', 'Streamlit', 'WebSockets'],
    githubUrl: 'https://github.com/DHANUSH-BHEEMSETTY/Real_Time_Restricted_Area_Monitoring_System',
  },
  {
    title: 'Legacy Wallet — Cloud-Native Digital Inheritance',
    description:
      'A privacy-focused digital inheritance platform allowing users to allocate confidential digital/physical assets, attach audio/video messages, and draft AI-guided legal wills. Enforces strict PostgreSQL Row-Level Security (RLS) policies.',
    link: '/wallet_preview.jpg',
    color: '#06281E',
    badge: '🟢 LIVE DEMO',
    year: '2025',
    role: 'Full-Stack & Security Engineer',
    tags: ['React', 'TypeScript', 'Supabase', 'PostgreSQL (RLS)', 'Tailwind CSS'],
    demoUrl: 'https://legacy-wallet-yjyw.onrender.com/',
  },
];

export default function StackingCardProjectsDemo() {
  return (
    <StackingCards
      tag="Featured Ventures & Code"
      heading="Selected Projects & Systems"
      subheading="A curated showcase of 0-to-1 startup products, edge AI pipelines, and secure cloud platforms."
      projects={dhanushProjects}
    />
  );
}

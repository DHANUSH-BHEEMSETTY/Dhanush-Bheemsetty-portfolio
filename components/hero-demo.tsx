import * as React from 'react';
import {
  FloatingIconsHero,
  type FloatingIconsHeroProps,
} from '@/components/ui/floating-icons-hero-section';

// --- Dhanush Tech Stack SVG Icons ---

const IconAWS = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.5 13.5c-.3-.4-1-.7-1.8-.7-.9 0-1.7.5-1.7 1.4 0 .9.6 1.4 1.7 1.4.6 0 1.2-.2 1.8-.5v-1.6zm1.7 4.2c-.7.4-1.7.7-2.7.7-2.3 0-3.6-1.3-3.6-3.4 0-2.3 1.6-3.4 3.7-3.4.9 0 1.7.2 2.3.5v-.5c0-1.2-.7-1.9-2-1.9-.9 0-1.7.3-2.3.8l-.9-1.2c.9-.7 2.1-1.1 3.5-1.1 2.3 0 3.7 1.3 3.7 3.7v4.9h-1.7v-.1zm-8.8-1.7l1.7-6.5h2l-2.7 8.9H8.6L6.8 11.2 5 18.4H3.2L.5 9.5h2l1.7 6.5 1.8-6.5h1.7l1.7 6.4zm13.1 4.5C19.7 22.3 15.4 23 11.2 23 6.6 23 2.7 21.2.6 18.2c-.3-.4 0-.9.5-.6 4.3 2.4 9.4 3.8 14.8 3.8 3.5 0 7.2-.7 10.4-2.1.6-.3 1 .4.5.8z" fill="#FF9900"/>
    <path d="M22.8 19.3c-.4-.5-2.7-.2-3.7-.1-.3 0-.4-.3-.1-.5 1.8-1.3 4.2-.9 4.6-.4.4.5-.1 3-1.8 4.4-.3.2-.5.1-.4-.2.4-.8 1.8-2.7 1.4-3.2z" fill="#FF9900"/>
  </svg>
);

const IconPython = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.9 1.5c-4.4 0-4.1 1.9-4.1 1.9v2h4.2v.6H6.1s-2.8-.3-2.8 4.1 2.5 4.3 2.5 4.3h1.5v-2.1s-.1-2.5 2.5-2.5h4.2s2.4 0 2.4-2.4V3.9s.4-2.4-4.5-2.4zm-2.3 1.3c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z" fill="#387EB8"/>
    <path d="M12.1 22.5c4.4 0 4.1-1.9 4.1-1.9v-2H12v-.6h5.9s2.8.3 2.8-4.1-2.5-4.3-2.5-4.3h-1.5v2.1s.1 2.5-2.5 2.5h-4.2s-2.4 0-2.4 2.4v5.5s-.4 2.4 4.5 2.4zm2.3-1.3c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" fill="#FFE052"/>
  </svg>
);

const IconGitHub = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 .3c-6.6 0-12 5.4-12 12 0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.6 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4 0-6.6-5.4-12-12-12z"/>
  </svg>
);

const IconDocker = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 10.5h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2H7v-2zm3-3h2v2h-2V7.5zm3 0h2v2h-2V7.5zm3 0h2v2h-2V7.5zm-9 0h2v2H7V7.5zm6-3h2v2h-2V4.5zm-3 0h2v2h-2V4.5zM1 13.5c.3 3.8 3.5 6.8 7.3 6.8 5.8 0 10.1-3.6 11.5-8.5.8.1 1.6 0 2.2-.4.4-.3.7-.7.9-1.2-1.1-.4-2.2-.2-3.1.3-.4-1.2-1.3-2.1-2.4-2.7l-.6-.3-.4.5c-.8 1.1-1.3 2.5-1.4 3.9H1v1.6z" fill="#2496ED"/>
  </svg>
);

const IconReact = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="2.2" fill="#61DAFB"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" stroke="#61DAFB" strokeWidth="1.2"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" stroke="#61DAFB" strokeWidth="1.2"/>
  </svg>
);

const IconTypeScript = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#3178C6"/>
    <path d="M11.2 12.3h-2.3V20H7v-7.7H4.7v-1.8h6.5v1.8zm3.3 4.2c.4.3.9.5 1.5.5.7 0 1.1-.3 1.1-.7 0-.4-.3-.6-1-.8l-.8-.3c-1.3-.4-2-1.1-2-2.3 0-1.5 1.2-2.6 3-2.6 1.1 0 1.9.3 2.5.8l-.6 1.6c-.5-.4-1.1-.6-1.8-.6-.6 0-1 .3-1 .7 0 .4.3.6.9.8l.8.3c1.4.5 2.1 1.2 2.1 2.4 0 1.6-1.2 2.7-3.2 2.7-1.3 0-2.3-.4-3-1l.5-1.5z" fill="white"/>
  </svg>
);

const IconFastAPI = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#009688"/>
    <path d="M13.2 4L6 13.5h5.4L10.8 20l7.2-9.5h-5.4L13.2 4z" fill="white"/>
  </svg>
);

const IconPyTorch = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.8 3.5l1.4-1.4a9.5 9.5 0 1 0 5 13.5l-1.8-.9a7.5 7.5 0 1 1-4-10.4l-.6-.8z" fill="#EE4C2C"/>
    <circle cx="15.8" cy="4.8" r="1.3" fill="#EE4C2C"/>
  </svg>
);

const IconSupabase = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.3 2.8c-.5-.7-1.6-.4-1.7.5L10.8 12h8.3c.9 0 1.3 1.1.7 1.7L10.7 21.2c-.5.7-1.6.4-1.7-.5L9.8 12H1.5c-.9 0-1.3-1.1-.7-1.7L9.9 2.8c.4-.6 1.4-.4 1.7.5l.3 1.2 1.4-1.7z" fill="#3ECF8E"/>
  </svg>
);

const IconOpenCV = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="6" r="3.5" stroke="#EA4335" strokeWidth="2"/>
    <circle cx="6.5" cy="16" r="3.5" stroke="#34A853" strokeWidth="2"/>
    <circle cx="17.5" cy="16" r="3.5" stroke="#4285F4" strokeWidth="2"/>
  </svg>
);

const IconGemini = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4E75FF" />
        <stop offset="50%" stopColor="#9B72CF" />
        <stop offset="100%" stopColor="#FF6B8B" />
      </linearGradient>
    </defs>
    <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" fill="url(#gemini-grad)"/>
  </svg>
);

const IconClaude = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#D97757"/>
  </svg>
);

const IconFigma = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2a5 5 0 0 0-5 5 5 5 0 0 0 5 5h5V2h-5z" fill="#F24E1E"/>
    <path d="M7 12a5 5 0 0 0 5 5 5 5 0 0 0 5-5V7H7v5z" fill="#A259FF"/>
    <path d="M7 17a5 5 0 0 0 5 5 5 5 0 0 0 5-5v-5H7v5z" fill="#0ACF83"/>
  </svg>
);

const IconNextjs = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#000000"/>
    <path d="M15.5 15.5L8.5 7.5H7v9h1.5v-6.5l6.5 7.5h.5z" fill="white"/>
    <rect x="15.5" y="7.5" width="1.5" height="5.5" fill="white"/>
  </svg>
);

const IconLinux = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="20" height="16" rx="3" fill="#1E293B"/>
    <path d="M6 9l4 3-4 3M12 15h6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconNode = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L3 7.2v10.4L12 22l9-4.4V7.2L12 2z" fill="#5FA04E"/>
    <path d="M12 5.5l5.5 3.2v6.4L12 18.3 6.5 15.1V8.7L12 5.5z" fill="#333333"/>
  </svg>
);

// Dhanush Bheemisetty hero icons configuration
const dhanushTechIcons: FloatingIconsHeroProps['icons'] = [
  { id: 1, icon: IconAWS, className: 'top-[8%] left-[7%]' },
  { id: 2, icon: IconPython, className: 'top-[14%] left-[22%]' },
  { id: 3, icon: IconGemini, className: 'top-[10%] right-[22%]' },
  { id: 4, icon: IconGitHub, className: 'top-[8%] right-[7%]' },
  { id: 5, icon: IconDocker, className: 'top-[36%] left-[4%]' },
  { id: 6, icon: IconPyTorch, className: 'top-[52%] left-[12%]' },
  { id: 7, icon: IconTypeScript, className: 'top-[34%] right-[5%]' },
  { id: 8, icon: IconReact, className: 'top-[48%] right-[14%]' },
  { id: 9, icon: IconOpenCV, className: 'top-[72%] left-[6%]' },
  { id: 10, icon: IconFastAPI, className: 'top-[84%] left-[19%]' },
  { id: 11, icon: IconSupabase, className: 'top-[70%] right-[8%]' },
  { id: 12, icon: IconClaude, className: 'top-[84%] right-[20%]' },
  { id: 13, icon: IconNextjs, className: 'top-[4%] left-[48%]' },
  { id: 14, icon: IconNode, className: 'top-[66%] left-[19%]' },
  { id: 15, icon: IconFigma, className: 'top-[60%] right-[22%]' },
  { id: 16, icon: IconLinux, className: 'bottom-[4%] left-[42%]' },
];

export default function DhanushHeroDemo() {
  return (
    <FloatingIconsHero
      statusText="Actively Seeking SDE & AI Roles"
      title="Dhanush Bheemisetty"
      subtitle="AI Engineer & Venture Builder • High-Velocity Vibe Coder. Building intelligent, production-ready software at startup speed with real-time CV pipelines, LLM architectures, and AWS-certified cloud backends."
      ctaText="Explore Featured Work ↗"
      ctaHref="#projects"
      secondaryCtaText="About Me"
      secondaryCtaHref="#about"
      icons={dhanushTechIcons}
    />
  );
}

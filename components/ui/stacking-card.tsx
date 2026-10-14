'use client';
import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { useRef, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ProjectData {
  title: string;
  description: string;
  link: string;
  color: string;
  badge?: string;
  year?: string;
  role?: string;
  tags?: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export interface CardProps {
  i: number;
  title: string;
  description: string;
  url: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  badge?: string;
  year?: string;
  tags?: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export const Card = ({
  i,
  title,
  description,
  url,
  color,
  progress,
  range,
  targetScale,
  badge,
  year,
  tags,
  demoUrl,
  githubUrl,
}: CardProps) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={cn(
          'flex flex-col relative -top-[25%] h-[450px] w-[70%] rounded-md p-10 origin-top shadow-2xl overflow-hidden'
        )}
      >
        <div className="flex items-center justify-between mb-2">
          {badge && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-md">
              {badge}
            </span>
          )}
          {year && (
            <span className="text-xs font-mono text-white/70 ml-auto">{year}</span>
          )}
        </div>
        <h2 className="text-2xl text-center font-semibold text-white tracking-tight">{title}</h2>
        <div className="flex h-full mt-5 gap-10">
          <div className="w-[40%] relative top-[10%] flex flex-col justify-between">
            <div>
              <p className="text-sm text-white/90 leading-relaxed">{description}</p>
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/15 text-white/90"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <span className="flex items-center gap-2 pt-2">
              <a
                href={demoUrl || githubUrl || url || '#'}
                target="_blank"
                rel="noreferrer"
                className="underline cursor-pointer text-white font-medium hover:text-white/80 transition-colors"
              >
                See more
              </a>
              <svg
                width="22"
                height="12"
                viewBox="0 0 22 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                  fill="white"
                />
              </svg>
            </span>
          </div>

          <div
            className="relative w-[60%] h-full rounded-lg overflow-hidden bg-black/20"
          >
            <motion.div
              className="w-full h-full"
              style={{ scale: imageScale }}
            >
              <img
                src={url}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export interface ComponentRootProps {
  projects: ProjectData[];
  heading?: string;
  subheading?: string;
}

const Component = forwardRef<HTMLElement, ComponentRootProps>(
  ({ projects, heading, subheading }, ref) => {
    const container = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      target: container,
      offset: ['start start', 'end end'],
    });

    return (
      <ReactLenis root>
        <main className="bg-black" ref={container}>
          <section className="text-white h-[70vh] w-full bg-slate-950 grid place-content-center relative overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <h1 className="2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%] z-10">
              {heading ? (
                heading
              ) : (
                <>
                  Stacking Cards Using <br /> Motion. Scroll down! 👇
                </>
              )}
            </h1>
            {subheading && (
              <p className="mt-4 text-center text-slate-400 max-w-xl mx-auto z-10 text-base">
                {subheading}
              </p>
            )}
          </section>

          <section className="text-white w-full bg-slate-950 pb-20">
            {projects.map((project, i) => {
              const targetScale = 1 - (projects.length - i) * 0.05;
              return (
                <Card
                  key={`p_${i}`}
                  i={i}
                  url={project.link}
                  title={project.title}
                  color={project.color}
                  description={project.description}
                  progress={scrollYProgress}
                  range={[i * (1 / Math.max(projects.length, 1)), 1]}
                  targetScale={targetScale}
                  badge={project.badge}
                  year={project.year}
                  tags={project.tags}
                  demoUrl={project.demoUrl}
                  githubUrl={project.githubUrl}
                />
              );
            })}
          </section>

          <footer className="group bg-slate-950 overflow-hidden">
            <h1 className="text-[16vw] translate-y-20 leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-gray-400 to-gray-800 bg-clip-text text-transparent transition-all ease-linear select-none">
              projects
            </h1>
            <div className="bg-black h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full"></div>
          </footer>
        </main>
      </ReactLenis>
    );
  }
);

Component.displayName = 'Component';

export default Component;

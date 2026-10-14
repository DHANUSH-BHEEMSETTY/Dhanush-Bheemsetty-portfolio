"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  badge?: string;
  link?: string;
  linkText?: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials.length]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className={cn("max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 py-8", className)}>
      <div className="relative grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 md:gap-12 items-center">
        <div>
          <div className="relative h-72 w-full max-w-[300px] mx-auto">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src + index}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 999
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom shadow-2xl rounded-3xl overflow-hidden border border-border/40"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                  {testimonial.badge && (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/70 text-white backdrop-blur-md border border-white/20">
                        {testimonial.badge}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
              ease: "easeInOut",
            }}
          >
            {testimonials[active].badge && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20 mb-3">
                {testimonials[active].badge}
              </span>
            )}
            <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
              {testimonials[active].name}
            </h3>
            <p className="text-xs md:text-sm font-mono text-muted-foreground mt-1">
              {testimonials[active].designation}
            </p>
            <motion.p className="text-sm md:text-base text-muted-foreground mt-4 leading-relaxed">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.015 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>

            {testimonials[active].link && (
              <div className="mt-6">
                <a
                  href={testimonials[active].link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-md"
                >
                  <span>{testimonials[active].linkText || "View Credential ↗"}</span>
                </a>
              </div>
            )}
          </motion.div>

          <div className="flex gap-4 pt-10 md:pt-8 items-center">
            <button
              onClick={handlePrev}
              aria-label="Previous award"
              className="h-10 w-10 rounded-full bg-secondary/80 hover:bg-secondary flex items-center justify-center group/button transition-all border border-border shadow-sm"
            >
              <IconArrowLeft className="h-5 w-5 text-foreground group-hover/button:-translate-x-0.5 transition-transform duration-200" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next award"
              className="h-10 w-10 rounded-full bg-secondary/80 hover:bg-secondary flex items-center justify-center group/button transition-all border border-border shadow-sm"
            >
              <IconArrowRight className="h-5 w-5 text-foreground group-hover/button:translate-x-0.5 transition-transform duration-200" />
            </button>
            <span className="text-xs font-mono text-muted-foreground ml-2">
              0{active + 1} / 0{testimonials.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedTestimonials;

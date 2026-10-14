import { AnimatedTestimonials, type Testimonial } from "@/components/ui/animated-testimonials";

export const dhanushAwardsAndCerts: Testimonial[] = [
  {
    badge: "OFFICIAL AWS CERTIFICATION",
    name: "AWS Certified Cloud Practitioner",
    designation: "Amazon Web Services (AWS) • Validation ID: 96da20d36d44477fba59b31a985bcd29",
    quote:
      "Formally certified by Amazon Web Services for fluency in cloud architecture, core compute and storage (EC2, S3, RDS, Lambda), enterprise IAM security policies, and high-availability serverless pipelines.",
    src: "/aws_certified_cloud_practitioner.png",
    link: "https://drive.google.com/file/d/1W6-QZ9SQtYGLJ5f0MtmlI6Drr4ow3lCu/view?usp=sharing",
    linkText: "View Official AWS Certificate (PDF) ↗",
  },
  {
    badge: "🏆 1ST PLACE WINNER",
    name: "Ranked #1 Startup Concept Across Universities",
    designation: "Commended by Dr. Pemmasani Chandra Shekhar (Union Minister of State, Govt. of India)",
    quote:
      "Awarded 1st Place out of dozens of university startup ventures for HoverCharge. Evaluated on real-time AI dispatch telemetry, fleet economics, and scalable consumer adoption before venture capitalists and ministers.",
    src: "/2.jpeg",
    link: "https://drive.google.com/file/d/1wEuhZrC7hCYjdq86LnA1EEZkBDLjqNnJ/view",
    linkText: "View Commendation Letter ↗",
  },
  {
    badge: "⚡ LIVE JURY DEFENSE",
    name: "HoverCharge Venture Defense & Live Demo",
    designation: "VLaunch Pad 2025 • Jury & Venture Evaluation Committee",
    quote:
      "Presented live technical demonstration and financial unit economics of the on-demand EV wireless charging network to academic leaders, senior engineers, and investors, securing unanimous top marks.",
    src: "/1.jpeg",
    link: "https://hovercharge-react.onrender.com/",
    linkText: "Explore HoverCharge Demo ↗",
  },
  {
    badge: "🥇 STAGE FELICITATION",
    name: "Championship Stage Commendation",
    designation: "VIT-AP University & Ministry of Communications",
    quote:
      "Felicitation ceremony recognizing student venture leadership, AI-driven clean-tech innovation, and high-velocity 0-to-1 startup execution across Andhra Pradesh university ecosystems.",
    src: "/3.jpeg",
    link: "https://drive.google.com/file/d/1wEuhZrC7hCYjdq86LnA1EEZkBDLjqNnJ/view",
    linkText: "View Award Ceremony Document ↗",
  },
];

export function AnimatedAwardsDemo() {
  return <AnimatedTestimonials testimonials={dhanushAwardsAndCerts} autoplay={false} />;
}

export default AnimatedAwardsDemo;

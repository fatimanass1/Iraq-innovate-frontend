import { motion } from "framer-motion";
import type { MotionElementTag } from "../constants";

type MotionDiv = typeof motion.div;

export const motionElements: Record<MotionElementTag, MotionDiv> = {
  div: motion.div,
  section: motion.section as MotionDiv,
  article: motion.article as MotionDiv,
  header: motion.header as MotionDiv,
  footer: motion.footer as MotionDiv,
  ul: motion.ul as MotionDiv,
  ol: motion.ol as MotionDiv,
  li: motion.li as MotionDiv,
  span: motion.span as MotionDiv,
  p: motion.p as MotionDiv,
  h1: motion.h1 as MotionDiv,
  h2: motion.h2 as MotionDiv,
  h3: motion.h3 as MotionDiv,
  nav: motion.nav as MotionDiv,
  main: motion.main as MotionDiv,
  aside: motion.aside as MotionDiv,
};

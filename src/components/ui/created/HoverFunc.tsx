import { motion } from "motion/react";

export function HoverImg() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    ></motion.div>
  );
}

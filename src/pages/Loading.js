import { motion } from "framer-motion";
import Triangle from "../components/triangle";

const draw = {
  hidden: { pathLength: 0, opacity: 0, fill: "rgba(255, 0, 85, 0)" },
  visible: (i) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      fill: "rgba(255, 0, 85, 0.2)",
      transition: {
        fill: { delay, duration: 2 },
        pathLength: {
          delay,
          type: "spring",
          duration: 1.5,
          bounce: 0,
          loop: Infinity,
        },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

const styleRect = {
  strokeWidth: "10px",
  strokeLinecap: "round",
};

export default function Loading() {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <motion.svg
        width="100%"
        height="600"
        viewBox="0 0 600 600"
        initial="hidden"
        animate="visible"
        position="relative"
      >
        <motion.rect
          width="190"
          height="140"
          x="45%"
          y="50%"
          rx="20"
          stroke="#ff0055"
          transition={{
            default: { duration: 2, ease: "easeInOut" },
            fill: { delay: 0.5, duration: 0.5 },
          }}
          variants={draw}
          style={styleRect}
        />
      </motion.svg>
      <Triangle />
    </div>
  );
}

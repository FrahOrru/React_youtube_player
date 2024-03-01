import React from "react";
import { motion } from "framer-motion";

const Triangle = () => {
  const triangleStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 0,
    height: 0,
    borderTop: "50px solid transparent",
    borderRight: "100px solid #ff0055",
    borderBottom: "50px solid transparent",
    margin: "20px",
  };

  return (
    <motion.div
      style={{ ...triangleStyle }}
      animate={{
        rotate: 180,
        scale: 0.5,
      }}
    />
  );
};

export default Triangle;

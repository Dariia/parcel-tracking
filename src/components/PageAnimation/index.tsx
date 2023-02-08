import React from 'react';
import { motion } from "framer-motion/dist/framer-motion";

const ANIMATION_DATA_PROPS = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  }
}

const PageAnimation: React.FC = ({ children }) => (
  <motion.div {...ANIMATION_DATA_PROPS}>
    { children }
  </motion.div>);

export default PageAnimation;

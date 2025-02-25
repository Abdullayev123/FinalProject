import Cars from "../components/home/Cars";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ y: 20 }}
        transition={{ duration: 1 }}
      >
        <Cars />
      </motion.div>
    </>
  );
};

export default Home;

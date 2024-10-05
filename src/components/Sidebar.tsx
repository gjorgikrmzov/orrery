import { CloseCircle } from "iconsax-react";
import { NEO } from "./Neo";
import { motion } from 'framer-motion'

export const Sidebar = ({ neo, onClose }: { neo: NEO, onClose: () => void }) => (
    <motion.div initial={{x: 200, opacity: 0}} animate={{x: 0, opacity: 1}}  exit={{x: 200, opacity:0}} className="absolute  h-full pb-10 md:pb-6 w-fit bg-black right-0 flex justify-center items-end  p-6" >
      <div className=" justify-start  items-start flex gap-y-3 flex-col">

      <button onClick={onClose}><CloseCircle variant="Bold" size={24} color='#fff' /></button>
      <h2>{neo.name}</h2>
      <p>Estimated Diameter: {neo.estimated_diameter.kilometers.estimated_diameter_min} - {neo.estimated_diameter.kilometers.estimated_diameter_max} km</p>
      <p>Is Potentially Hazardous: {neo.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
      <p>Close Approach Date: {neo.close_approach_data[0].close_approach_date_full}</p>
      <p>Relative Velocity: {neo.close_approach_data[0].relative_velocity.kilometers_per_hour} km/h</p>
      </div>
    </motion.div>
  );
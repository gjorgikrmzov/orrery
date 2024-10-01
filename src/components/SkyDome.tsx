// import { useLoader } from "@react-three/fiber";
// import { useRef } from "react";
// import { TextureLoader } from "three";
// import * as THREE from "three";

// export const Skydome = () => {
//     // const texture = useLoader(TextureLoader, "/bottom.png"); // Replace with your image path
//     const sphereRef = useRef<THREE.Mesh>(null);
  
//     return (
//       <mesh ref={sphereRef} position={[0, 0, 0]}>
//         <sphereGeometry args={[100, 32, 32]} /> {/* Large sphere */}
//         <meshBasicMaterial
//           attach="material"
//           map={texture}
//           side={THREE.BackSide}
//         />{" "}
//         {/* Use BackSide for inside view */}
//       </mesh>
//     );
//   };
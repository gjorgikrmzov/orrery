import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";


export const Trajectory = ({ position }: { position: [number, number, number] }) => {
    const ref = useRef<THREE.Line>(new THREE.Line());
  
    useFrame(() => {
      if (ref.current) {
        ref.current.rotation.z += 0.01;
      }
    });
  
    // Adjust the radii for the trajectory
    const points = new THREE.EllipseCurve(0, 0, 2, 1.5).getPoints(100); // Smaller radii
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: "yellow" });
  
    useEffect(() => {
      ref.current.geometry = geometry;
      ref.current.material = material;
    }, [geometry, material]);
  
    return <primitive object={ref.current} position={position} />;
  };
  
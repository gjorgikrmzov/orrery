import { useLoader } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { Trajectory } from "@/components/Trajectory";
import { useRouter } from "next/router";

export interface NEO {
  id: string;
  name: string;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  imageUrl?: string;
}

export const NEOModel = ({
  neo,
  showName,
  showTrajectory,
}: {
  neo: NEO;
  showName: boolean;
  showTrajectory: boolean;
}) => {

  const size = neo.estimated_diameter.kilometers.estimated_diameter_max;
  const color = neo.is_potentially_hazardous_asteroid ? "red" : "gray";
  const position = useRef<[number, number, number]>([
    Math.random() * 10 - 5,
    Math.random() * 10 - 5,
    Math.random() * 10 - 5,
  ]);

  // Create a glow material using emissive property
  const glowMaterial = new THREE.MeshStandardMaterial({
    emissive: color, // The color of the glow
    emissiveIntensity: 0.5, // Adjust intensity
    color: color, // Use color if no texture
  });

  return (
    <group  position={position.current} >
      {/* NEO Sphere with texture and glow */}
      <mesh material={glowMaterial}>
        <sphereGeometry args={[size / 2, 32, 32]} />
      </mesh>

      {/* Show Name Above the NEO */}
      {showName && (
        <Text position={[0, size / 2 + 0.2, 0]} fontSize={0.1} color="white">
          {neo.name}
        </Text>
      )}

      {/* Show Trajectory for this NEO */}
      {showTrajectory && <Trajectory position={position.current} />}
    </group>
  );
};

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";
import { fetchNearEarthObjects } from "./api/nasaApi";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Skydome } from "@/components/SkyDome";
import { NEO, NEOModel } from "@/components/Neo";
import { Sidebar } from "@/components/Sidebar";

const Earth = () => (
  <mesh position={[0, 0, 0]}>
    <sphereGeometry args={[1, 64, 64]} /> {/* Adjust Earth size */}
    <meshStandardMaterial color="blue" />
  </mesh>
);

export default function Home() {
  const [neoData, setNeoData] = useState<NEO[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNames, setShowNames] = useState(false);
  const [showTrajectories, setShowTrajectories] = useState(false);
  const [selectedNeo, setSelectedNeo] = useState<NEO | null>(null); // Track selected NEO

  const withoutEric = neoData.filter((neo: NEO) => neo.name != '4954 Eric (1990 SQ)')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const endDate = new Date(new Date().setDate(new Date().getDate() + 7))
          .toISOString()
          .split("T")[0];
        const data = await fetchNearEarthObjects(today, endDate);
        const neos = Object.values(data.near_earth_objects).flat() as NEO[];
        setNeoData(neos);
      } catch (error) {
        console.error("Failed to fetch NEO data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left side: 3D Canvas */}
      <div className="w-full border" style={{ flex: 1 }}>
        <div
          className="py-4 flex px-4 flex-col md:flex-row items-center justify-between"
          style={{ textAlign: "center" }}
        >
          <h1 className="text-md mb-2 md:text-xl">Orrery WebApp</h1>
          <div className="gap-x-2 flex flex-row items-center">
            <button
              className="py-2 font-sans px-3 rounded-xl bg-white text-black"
              onClick={() => setShowNames((prev) => !prev)}
            >
              {showNames ? "Hide Names" : "Show Names"}
            </button>
            <button
              className="py-2 font-sans px-3 rounded-xl bg-white text-black"
              onClick={() => setShowTrajectories((prev) => !prev)}
            >
              {showTrajectories ? "Hide Trajectories" : "Show Trajectories"}
            </button>
          </div>
        </div>

        <Canvas camera={{ position: [0, 0, 40], fov: 50 }}>
          <Skydome />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />

          {/* Add Earth */}
          <Earth />

          {/* Render NEO Models */}
          {withoutEric.map((neo) => (
            <NEOModel
              key={neo.id}
              neo={neo}
              showName={showNames}
              showTrajectory={showTrajectories}
              onClick={() => setSelectedNeo(neo)}
            />
          ))}

          <EffectComposer>
            <Bloom
              luminanceThreshold={0.1}
              luminanceSmoothing={0.9}
              intensity={1.5}
            />
          </EffectComposer>

          <OrbitControls minDistance={10} maxDistance={100} />
        </Canvas>
      </div>

      {/* Right side: Sidebar */}
      {selectedNeo && (
        <Sidebar neo={selectedNeo} onClose={() => setSelectedNeo(null)} />
      )}
    </div>
  );
}

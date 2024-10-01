import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Text, Effects } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import { fetchNearEarthObjects } from "./api/nasaApi";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Skydome } from "@/components/SkyDome";
import { NEO, NEOModel } from "@/components/Neo";

export default function Home() {
  const [neoData, setNeoData] = useState<NEO[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNames, setShowNames] = useState(false);
  const [showTrajectories, setShowTrajectories] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const endDate = new Date(new Date().setDate(new Date().getDate() + 7))
          .toISOString()
          .split("T")[0];
        const data = await fetchNearEarthObjects(today, endDate);
        const neos = Object.values(data.near_earth_objects).flat() as NEO[];

        const neoData = neos.map((neo) => ({
          ...neo,
        }));

        setNeoData(neoData);
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
    <>
      <div style={{ height: "100vh" }}>
        <div
          className="py-4 flex px-4 flex-row  items-center justify-between "
          style={{ textAlign: "center" }}
        >
          <h1 className="text-xl">Orrery WebApp</h1>
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

        <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
          <Skydome />
          {/* Lighting */}
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {/* Render NEO Models */}
          {neoData.map((neo) => (
            <NEOModel
              key={neo.id}
              neo={neo}
              showName={showNames}
              showTrajectory={showTrajectories}
            />
          ))}
          {/* Bloom effect for glow */}
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.1}
              luminanceSmoothing={0.9}
              intensity={1.5}
            />
          </EffectComposer>
          {/* Orbit Controls */}
          <OrbitControls minDistance={5} maxDistance={40} />
        </Canvas>
      </div>
    </>
  );
}

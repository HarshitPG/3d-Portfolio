import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { ScrollControls } from "@react-three/drei";
import { Suspense, useMemo } from "react";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { Overlay } from "./components/Overlay";
import { usePlay } from "./components/contexts/Play";

function App() {
  const { play, end } = usePlay();
  const effect = useMemo(
    () => (
      <EffectComposer>
        <Noise opacity={0.075} />
      </EffectComposer>
    ),
    []
  );

  return (
    <>
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 30,
        }}
      >
        <Suspense fallback={null}>
          {/* ... */}
          <ScrollControls
            page={play && !end ? 100 : 0}
            damping={1}
            style={{
              top: "10px",
              left: "0px",
              bottom: "10px",
              right: "10px",
              width: "auto",
              height: "auto",
              transition: "opacity 1.4s ease-in-ot",
              opacity: play ? 1 : 0,
            }}
          >
            <Experience />
          </ScrollControls>
          {effect}
        </Suspense>
      </Canvas>
      && <Overlay />
    </>
  );
}

export default App;

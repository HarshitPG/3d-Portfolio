import {
  useScroll,
  PerspectiveCamera,
  OrbitControls,
  Float,
  Text,
  Html,
  Stats,
  RoundedBox,
} from "@react-three/drei";

import { TextSection } from "./TextSection";
import { Background } from "./Background";
import { Airplane } from "./Airplane";
import { Cloud } from "./Cloud";
import { useRef, useMemo, useLayoutEffect, useEffect, Suspense } from "react";
import { useFrame, Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import * as THREE from "three";
import { Euler } from "three";
import { usePlay } from "./contexts/Play";
import { fadeOnBeforeCompile } from "./utils/fadeMaterial";
import { Speed } from "./Speed";
import { lerp } from "three/src/math/MathUtils";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";

const NoPoints = 1000;
const CurveDistance = 250;
const CurveAheadCamera = 0.008;
const CurveAheadAirplane = 0.02;
const AirplaneMaxAngle = 35;
const FRICTION_DISTANCE = 42;
export const Experience = () => {
  const texture = useLoader(TextureLoader, "./images/html.png");
  const texture2 = useLoader(TextureLoader, "./images/css-3.png");
  const texture3 = useLoader(TextureLoader, "./images/js.png");
  const texture4 = useLoader(TextureLoader, "./images/python.png");
  const texture5 = useLoader(TextureLoader, "./images/c.png");
  const texture6 = useLoader(TextureLoader, "./images/c++.png");
  const texture7 = useLoader(TextureLoader, "./images/Reactjs.jpeg");
  const texture8 = useLoader(TextureLoader, "./images/Threejs.png");
  const texture9 = useLoader(TextureLoader, "./images/Bootstrap.png");
  const texture10 = useLoader(TextureLoader, "./images/figma.png");
  const texture11 = useLoader(TextureLoader, "./images/illustrator.png");
  const texture12 = useLoader(TextureLoader, "./images/blender.png");
  const texture13 = useLoader(TextureLoader, "./images/BUTTON 2@4x.png");

  const curvePoints = useMemo(
    () => [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -CurveDistance),
      new THREE.Vector3(100, 0, -2 * CurveDistance),
      new THREE.Vector3(-100, 0, -3 * CurveDistance),
      new THREE.Vector3(100, 0, -4 * CurveDistance),
      new THREE.Vector3(5, 0, -5 * CurveDistance),
      new THREE.Vector3(5, 0, -6 * CurveDistance),
      new THREE.Vector3(5, 0, -7 * CurveDistance),
    ],
    []
  );

  const sceneOpacity = useRef(0);
  const lineMaterialRef = useRef();

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(curvePoints, false, "catmullrom", 0.5);
  }, []);

  const textSections = useMemo(() => {
    return [
      {
        cameraRailDist: -1,
        position: new THREE.Vector3(
          curvePoints[1].x - 3,
          curvePoints[1].y,
          curvePoints[1].z
        ),
        Megatitle: "Hi, I'm",
        title: "HARSHIT P G",
        subtitle: `I am a tech enthusiast.
Have a seat and enjoy the ride!`,
      },
      {
        cameraRailDist: 2,
        position: new THREE.Vector3(
          curvePoints[2].x + 1,
          curvePoints[2].y + 0.5,
          curvePoints[2].z
        ),
        title: "ABOUT ME",
        subtitle: `
I'm, a computer science sophomore, currently pursuing my B.Tech in Computer Science and Engineering from Vellore Institute of Technology. 
My interests lie in web development, UI/UX design.
My passion lies in the field of computer science and I am always eager to learn new things.`,
      },
      {
        cameraRailDist: -1,
        position: new THREE.Vector3(
          curvePoints[3].x - 3,
          curvePoints[3].y,
          curvePoints[3].z
        ),
        skilltitle: "My Skills",
        langtitle: "LANGUAGES",
        libtitle: "FRAMEWORKS AND TOOLS",
      },
      {
        cameraRailDist: 1,
        position: new THREE.Vector3(
          curvePoints[4].x + 3.5,
          curvePoints[4].y,
          curvePoints[4].z - 12
        ),
        works: "Works",
        subworks: `
01.ILLUMINA Website:
        Contibuted in designing the illumina website and handled the moblie responsivity of the website.

02.IRCTC Clone:
        Cloned the official IRCTC website using ReactJs.

03.Design Works:
        Check out my design works `,
      },
    ];
  }, []);

  const clouds = useMemo(
    () => [
      // STARTING
      {
        position: new THREE.Vector3(-3.5, -3.2, -7),
      },
      {
        position: new THREE.Vector3(3.5, -4, -10),
      },
      {
        scale: new THREE.Vector3(4, 4, 4),
        position: new THREE.Vector3(-18, 0.2, -68),
        rotation: new Euler(-Math.PI / 5, Math.PI / 6, 0),
      },
      {
        scale: new THREE.Vector3(2.5, 2.5, 2.5),
        position: new THREE.Vector3(10, -1.2, -52),
      },
      // FIRST POINT
      {
        scale: new THREE.Vector3(4, 4, 4),
        position: new THREE.Vector3(
          curvePoints[1].x + 10,
          curvePoints[1].y - 4,
          curvePoints[1].z + 64
        ),
      },
      {
        scale: new THREE.Vector3(3, 3, 3),
        position: new THREE.Vector3(
          curvePoints[1].x - 20,
          curvePoints[1].y + 4,
          curvePoints[1].z + 28
        ),
        rotation: new Euler(0, Math.PI / 7, 0),
      },
      {
        rotation: new Euler(0, Math.PI / 7, Math.PI / 5),
        scale: new THREE.Vector3(5, 5, 5),
        position: new THREE.Vector3(
          curvePoints[1].x - 13,
          curvePoints[1].y + 4,
          curvePoints[1].z - 62
        ),
      },
      {
        rotation: new Euler(Math.PI / 2, Math.PI / 2, Math.PI / 3),
        scale: new THREE.Vector3(5, 5, 5),
        position: new THREE.Vector3(
          curvePoints[1].x + 54,
          curvePoints[1].y + 2,
          curvePoints[1].z - 82
        ),
      },
      {
        scale: new THREE.Vector3(5, 5, 5),
        position: new THREE.Vector3(
          curvePoints[1].x + 8,
          curvePoints[1].y - 14,
          curvePoints[1].z - 22
        ),
      },
      // SECOND POINT
      {
        opacity: 0.7,
        scale: new THREE.Vector3(3, 3, 3),
        position: new THREE.Vector3(
          curvePoints[2].x + 6,
          curvePoints[2].y - 7,
          curvePoints[2].z + 50
        ),
      },
      {
        scale: new THREE.Vector3(2, 2, 2),
        position: new THREE.Vector3(
          curvePoints[2].x - 2,
          curvePoints[2].y + 4,
          curvePoints[2].z - 46
        ),
      },
      {
        scale: new THREE.Vector3(4, 4, 4),
        position: new THREE.Vector3(
          curvePoints[2].x + 12,
          curvePoints[2].y + 1,
          curvePoints[2].z - 86
        ),
        rotation: new Euler(Math.PI / 4, 0, Math.PI / 3),
      },
      // THIRD POINT
      {
        scale: new THREE.Vector3(3, 3, 3),
        position: new THREE.Vector3(
          curvePoints[3].x + 3,
          curvePoints[3].y - 10,
          curvePoints[3].z + 50
        ),
      },
      {
        scale: new THREE.Vector3(3, 3, 3),
        position: new THREE.Vector3(
          curvePoints[3].x - 10,
          curvePoints[3].y,
          curvePoints[3].z + 30
        ),
        rotation: new Euler(Math.PI / 4, 0, Math.PI / 5),
      },
      {
        scale: new THREE.Vector3(4, 4, 4),
        position: new THREE.Vector3(
          curvePoints[3].x - 20,
          curvePoints[3].y - 5,
          curvePoints[3].z - 8
        ),
        rotation: new Euler(Math.PI, 0, Math.PI / 5),
      },
      {
        scale: new THREE.Vector3(5, 5, 5),
        position: new THREE.Vector3(
          curvePoints[3].x + 0,
          curvePoints[3].y - 5,
          curvePoints[3].z - 98
        ),
        rotation: new Euler(0, Math.PI / 3, 0),
      },
      // FOURTH POINT
      {
        scale: new THREE.Vector3(2, 2, 2),
        position: new THREE.Vector3(
          curvePoints[4].x + 3,
          curvePoints[4].y - 10,
          curvePoints[4].z + 2
        ),
      },
      {
        scale: new THREE.Vector3(3, 3, 3),
        position: new THREE.Vector3(
          curvePoints[4].x + 24,
          curvePoints[4].y - 6,
          curvePoints[4].z - 42
        ),
        rotation: new Euler(Math.PI / 4, 0, Math.PI / 5),
      },
      {
        scale: new THREE.Vector3(3, 3, 3),
        position: new THREE.Vector3(
          curvePoints[4].x - 4,
          curvePoints[4].y + 9,
          curvePoints[4].z - 62
        ),
        rotation: new Euler(Math.PI / 3, 0, Math.PI / 3),
      },
      // FINAL
      {
        scale: new THREE.Vector3(3, 3, 3),
        position: new THREE.Vector3(
          curvePoints[7].x + 12,
          curvePoints[7].y - 5,
          curvePoints[7].z + 60
        ),
        rotation: new Euler(-Math.PI / 4, -Math.PI / 6, 0),
      },
      {
        scale: new THREE.Vector3(3, 3, 3),
        position: new THREE.Vector3(
          curvePoints[7].x - 12,
          curvePoints[7].y + 5,
          curvePoints[7].z + 120
        ),
        rotation: new Euler(Math.PI / 4, Math.PI / 6, 0),
      },
    ],
    []
  );

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.2);
    shape.lineTo(0, 0.2);
    return shape;
  }, [curve]);

  const cameraGroup = useRef();
  const cameraRail = useRef();
  const camera = useRef();
  const scroll = useScroll();
  const lastScroll = useRef(0);

  const { play, setHasScroll, end, setEnd } = usePlay();

  useFrame((_state, delta) => {
    if (window.innerWidth > window.innerHeight) {
      //Landscape
      camera.current.fov = 30;
      camera.current.position.z = 5;
    } else {
      //Portrait
      camera.current.fov = 80;
      camera.current.position.z = 2;
    }

    if (lastScroll.current <= 0 && scroll.offset > 0) {
      setHasScroll(true);
    }

    lineMaterialRef.current.opacity = sceneOpacity.current;

    if (play && !end && sceneOpacity.current < 1) {
      sceneOpacity.current = THREE.MathUtils.lerp(
        sceneOpacity.current,
        1,
        delta * 0.1
      );
    }

    if (end && sceneOpacity.current > 0) {
      sceneOpacity.current = THREE.MathUtils.lerp(
        sceneOpacity.current,
        0,
        delta
      );
    }

    if (end) {
      return;
    }

    const scrollOffset = Math.max(0, scroll.offset);

    let friction = 1;
    let resetCameraRail = true;
    //Look to close textSections
    textSections.forEach((textSection) => {
      const distance = textSection.position.distanceTo(
        cameraGroup.current.position
      );
      if (distance < FRICTION_DISTANCE) {
        friction = Math.max(distance / FRICTION_DISTANCE, 0.1);
        const targetCameraRailPosition = new THREE.Vector3(
          (1 - distance / FRICTION_DISTANCE) * textSection.cameraRailDist,
          0,
          0
        );
        cameraRail.current.position.lerp(targetCameraRailPosition, delta);
        resetCameraRail = false;
      }
    });
    if (resetCameraRail) {
      const targetCameraRailPosition = new THREE.Vector3(0, 0, 0);
      cameraRail.current.position.lerp(targetCameraRailPosition, delta);
    }

    //Calculate lerped scroll offset
    let lerpedScrollOffset = THREE.MathUtils.lerp(
      lastScroll.current,
      scrollOffset,
      delta * friction * 0.5
    );

    // Protect below 0 and above 1
    lerpedScrollOffset = Math.min(lerpedScrollOffset, 1);
    lerpedScrollOffset = Math.max(lerpedScrollOffset, 0);

    lastScroll.current = lerpedScrollOffset;
    const curPoint = curve.getPoint(lerpedScrollOffset);

    //Follow the curve points
    cameraGroup.current.position.lerp(curPoint, delta * 24);

    //Make the group look ahead on the curve
    const lookAtPoint = curve.getPoint(
      Math.min(lerpedScrollOffset + CurveAheadCamera, 1)
    );

    const currentLookAt = cameraGroup.current.getWorldDirection(
      new THREE.Vector3()
    );
    const targetLookAt = new THREE.Vector3()
      .subVectors(curPoint, lookAtPoint)
      .normalize();

    const lookAt = currentLookAt.lerp(targetLookAt, delta * 24);
    cameraGroup.current.lookAt(
      cameraGroup.current.position.clone().add(lookAt)
    );
    // Airplaine rotation
    const targent = curve.getTangent(scrollOffset + CurveAheadAirplane);

    const nonLerpLookAt = new THREE.Group();
    nonLerpLookAt.position.copy(curPoint);
    nonLerpLookAt.lookAt(nonLerpLookAt.position.clone().add(targetLookAt));

    targent.applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      -nonLerpLookAt.rotation.y
    );

    let angle = Math.atan2(-targent.z, targent.x);
    angle = -Math.PI / 2 + angle;

    let angleDegrees = (angle * 180) / Math.PI;
    angleDegrees *= 2.4;

    //Limit plane angle
    if (angleDegrees < 0) {
      angleDegrees = Math.max(angleDegrees, -AirplaneMaxAngle);
    }
    if (angle > 0) {
      angleDegrees = Math.min(angleDegrees, -AirplaneMaxAngle);
    }

    const targetAirplaneQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        airplane.current.rotation.x,
        airplane.current.rotation.y,
        angle
      )
    );
    airplane.current.quaternion.slerp(targetAirplaneQuaternion, delta * 2);

    // Set back angle
    angle = (angleDegrees * Math.PI) / 180;
    //ending screen
    if (
      cameraGroup.current.position.z <
      curvePoints[curvePoints.length - 1].z + 100
    ) {
      setEnd(true);
      planeOutTl.current.play();
    }
  });
  const airplane = useRef();

  const planeInTl = useRef();
  const planeOutTl = useRef();

  useLayoutEffect(() => {
    planeInTl.current = gsap.timeline();
    planeInTl.current.pause();
    planeInTl.current.from(airplane.current.position, {
      duration: 3,
      z: 5,
      y: -2,
    });

    planeOutTl.current = gsap.timeline();
    planeOutTl.current.pause();

    planeOutTl.current.to(
      airplane.current.position,
      {
        duration: 10,
        z: -250,
        y: 10,
      },
      0
    );
    planeOutTl.current.to(
      cameraRail.current.position,
      {
        duration: 8,
        y: 12,
      },
      0
    );
    planeOutTl.current.to(airplane.current.position, {
      duration: 1,
      z: -1000,
    });
  }, []);

  useEffect(() => {
    if (play) {
      planeInTl.current.play();
    }
  });
  const redirectToURL = (url) => {
    window.open(url, "_blank");
  };

  return useMemo(() => (
    <>
      {/*<OrbitControls enableZoom={false} /> */}
      <group ref={cameraGroup}>
        <Background />
        <group ref={cameraRail}>
          {
            <PerspectiveCamera
              ref={camera}
              position={[0, 0, 5]}
              fov={30}
              makeDefault
            />
          }
        </group>
        <group ref={airplane}>
          <Float floatIntensity={1.5} speed={1.5} rotationIntensity={0.5}>
            <Airplane
              rotation-y={Math.PI / 2}
              scale={[0.2, 0.2, 0.2]}
              position-y={0.1}
            />
          </Float>
        </group>
      </group>
      {textSections.map((textSection, index) => (
        <TextSection {...textSection} key={index} />
      ))}
      <mesh
        position={[-103.7, -0.5, -750]}
        transparent
        envMapIntensity={2}
        onBeforeCompile={fadeOnBeforeCompile}
      >
        <planeGeometry attach="geometry" args={[0.4, 0.4]} />
        <meshStandardMaterial
          attach="material"
          map={texture}
          transparent
          onBeforeCompile={fadeOnBeforeCompile}
        />
      </mesh>
      <mesh
        position={[-103.1, -0.5, -750]}
        transparent
        envMapIntensity={2}
        onBeforeCompile={fadeOnBeforeCompile}
      >
        <planeGeometry attach="geometry" args={[0.4, 0.4]} />
        <meshStandardMaterial
          attach="material"
          map={texture2}
          transparent
          onBeforeCompile={fadeOnBeforeCompile}
        />
      </mesh>
      <mesh
        position={[-102.5, -0.5, -750]}
        transparent
        envMapIntensity={2}
        onBeforeCompile={fadeOnBeforeCompile}
      >
        <planeGeometry attach="geometry" args={[0.4, 0.4]} />
        <meshStandardMaterial
          attach="material"
          map={texture3}
          transparent
          onBeforeCompile={fadeOnBeforeCompile}
        />
      </mesh>
      <mesh
        position={[-101.9, -0.5, -750]}
        transparent
        envMapIntensity={2}
        onBeforeCompile={fadeOnBeforeCompile}
      >
        <planeGeometry attach="geometry" args={[0.4, 0.4]} />
        <meshStandardMaterial
          attach="material"
          map={texture4}
          transparent
          onBeforeCompile={fadeOnBeforeCompile}
        />
      </mesh>
      <mesh
        position={[-101.3, -0.5, -750]}
        transparent
        envMapIntensity={2}
        onBeforeCompile={fadeOnBeforeCompile}
      >
        <planeGeometry attach="geometry" args={[0.4, 0.4]} />
        <meshStandardMaterial
          attach="material"
          map={texture5}
          transparent
          onBeforeCompile={fadeOnBeforeCompile}
        />
      </mesh>
      <mesh
        position={[-100.7, -0.5, -750]}
        transparent
        envMapIntensity={2}
        onBeforeCompile={fadeOnBeforeCompile}
      >
        <planeGeometry attach="geometry" args={[0.4, 0.4]} />
        <meshStandardMaterial
          attach="material"
          map={texture6}
          transparent
          onBeforeCompile={fadeOnBeforeCompile}
        />
      </mesh>
      <mesh
        position={[-103.7, -1.65, -750]}
        transparent
        envMapIntensity={2}
        onBeforeCompile={fadeOnBeforeCompile}
      >
        <planeGeometry attach="geometry" args={[0.4, 0.4]} />
        <meshStandardMaterial
          attach="material"
          map={texture7}
          transparent
          onBeforeCompile={fadeOnBeforeCompile}
        />
      </mesh>
      <mesh
        position={[-103.1, -1.65, -750]}
        transparent
        envMapIntensity={2}
        onBeforeCompile={fadeOnBeforeCompile}
      >
        <planeGeometry attach="geometry" args={[0.4, 0.4]} />
        <meshStandardMaterial
          attach="material"
          map={texture8}
          transparent
          onBeforeCompile={fadeOnBeforeCompile}
        />
      </mesh>
      <mesh
        position={[-102.5, -1.65, -750]}
        transparent
        envMapIntensity={2}
        onBeforeCompile={fadeOnBeforeCompile}
      >
        <planeGeometry attach="geometry" args={[0.4, 0.4]} />
        <meshStandardMaterial
          attach="material"
          map={texture9}
          transparent
          onBeforeCompile={fadeOnBeforeCompile}
        />
      </mesh>
      <mesh
        position={[-101.9, -1.65, -750]}
        transparent
        envMapIntensity={2}
        onBeforeCompile={fadeOnBeforeCompile}
      >
        <planeGeometry attach="geometry" args={[0.4, 0.4]} />
        <meshStandardMaterial
          attach="material"
          map={texture10}
          transparent
          onBeforeCompile={fadeOnBeforeCompile}
        />
      </mesh>
      <mesh
        position={[-101.3, -1.65, -750]}
        transparent
        envMapIntensity={2}
        onBeforeCompile={fadeOnBeforeCompile}
      >
        <planeGeometry attach="geometry" args={[0.4, 0.4]} />
        <meshStandardMaterial
          attach="material"
          map={texture11}
          transparent
          onBeforeCompile={fadeOnBeforeCompile}
        />
      </mesh>
      <mesh
        position={[-100.7, -1.65, -750]}
        transparent
        envMapIntensity={2}
        onBeforeCompile={fadeOnBeforeCompile}
      >
        <planeGeometry attach="geometry" args={[0.4, 0.4]} />

        <meshStandardMaterial
          attach="material"
          map={texture12}
          transparent
          onBeforeCompile={fadeOnBeforeCompile}
        />
      </mesh>
      <group position-y={-2}>
        <mesh>
          <extrudeGeometry
            args={[
              shape,
              {
                steps: NoPoints,
                bevelEnabled: false,
                extrudePath: curve,
              },
            ]}
          />
          <meshStandardMaterial
            ref={lineMaterialRef}
            color={"white"}
            opacity={0.7}
            transparent
            envMapIntensity={2}
            onBeforeCompile={fadeOnBeforeCompile}
          />
        </mesh>
      </group>

      <mesh
        onClick={() => redirectToURL("https://illumina.ieivit.in/")}
        position={[106.35, -1.4, -1012]}
        transparent
        onBeforeCompile={fadeOnBeforeCompile}
      >
        <planeGeometry attach="geometry" args={[1.6, 0.4]} />

        <meshStandardMaterial
          attach="material"
          map={texture13}
          transparent
          onBeforeCompile={fadeOnBeforeCompile}
        />
      </mesh>
      <mesh
        onClick={() =>
          redirectToURL("https://irctc-clone-harshit.netlify.app/")
        }
        position={[106.35, -2.75, -1012]}
        transparent
        onBeforeCompile={fadeOnBeforeCompile}
      >
        <planeGeometry attach="geometry" args={[1.6, 0.4]} />

        <meshStandardMaterial
          attach="material"
          map={texture13}
          transparent
          onBeforeCompile={fadeOnBeforeCompile}
        />
      </mesh>
      <mesh
        onClick={() => redirectToURL("https://www.behance.net/harshitpg")}
        position={[106.35, -3.9, -1012]}
        transparent
        onBeforeCompile={fadeOnBeforeCompile}
      >
        <planeGeometry attach="geometry" args={[1.6, 0.4]} />

        <meshStandardMaterial
          attach="material"
          map={texture13}
          transparent
          onBeforeCompile={fadeOnBeforeCompile}
        />
      </mesh>
      {clouds.map((cloud, index) => (
        <Cloud sceneOpacity={sceneOpacity} {...cloud} key={index} />
      ))}
    </>
  ));
};

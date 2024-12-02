import { Point, Points } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from 'three'

function BlackPlane() {
    return (
        <mesh position={[0, 29, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            {/* Circle geometry with a large radius */}
            <circleGeometry args={[50, 64]} />
            <meshBasicMaterial color="black" />
        </mesh>
    );
}

function Particles() {
    const starTexture = useLoader(THREE.TextureLoader, 'textures/star.png');
    const count = 10000;
    const positions = new Float32Array(count * 3);

    // Populate positions with random values
    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 30;
    }

    return (
        <points scale={10} >
            <bufferGeometry>
                {/* Attach positions as a buffer attribute */}
                <bufferAttribute
                    attach="attributes-position"
                    array={positions}
                    count={count}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={3}
                color={'skyBlue'} // Set a base color
                sizeAttenuation
                transparent={true} // Enable transparency
                alphaMap={starTexture} // Use alpha map for transparency
                depthWrite={false} // Prevent z-fighting
                alphaTest={0.2}

            />
        </points>
    );
}

export default function Galaxy() {



    return <>
        {/* <mesh position={[-4, 0, 0]}>
            <boxGeometry />
            <meshStandardMaterial color={'skyBlue'} />
        </mesh> */}
        {/* <BlackPlane /> */}
        <Particles />
    </>
}
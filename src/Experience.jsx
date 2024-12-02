import { OrbitControls, Text, Float, Environment } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import { button, Leva, useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useRef } from 'react'
import * as THREE from 'three'
import Planets from '/components/Planets.jsx'
import Galaxy from '/components/Galaxy.jsx'


export default function Experience() {

    const invObj = useRef()

    const starTexture = useLoader(THREE.TextureLoader, 'textures/planet_textures/2k_stars.jpg')
    starTexture.wrapS = THREE.RepeatWrapping
    starTexture.wrapT = THREE.RepeatWrapping
    starTexture.repeat.set(4, 4)

    return <>
        <OrbitControls
            makeDefault
            minDistance={5} // Minimum zoom level (closer to the target)
            maxDistance={150}
        />

        <directionalLight position={[1, 2, 3]} intensity={4.5} />
        <ambientLight intensity={1.5} />

        <mesh>
            <sphereGeometry args={[200, 10, 10]} />
            <meshBasicMaterial map={starTexture} side={THREE.BackSide} />
        </mesh>

        <mesh ref={invObj} scale={0} position={[- 12, 14, 45]}>
            <boxGeometry />
            <meshBasicMaterial />
        </mesh>

        <Galaxy />
        <Planets invObj={invObj} />
    </>
}
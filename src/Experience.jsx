import { OrbitControls, Text, Float } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { button, Leva, useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useRef } from 'react'
import Planets from './components/planets'
import Galaxy from './components/galaxy'


export default function Experience() {

    const invObj = useRef()

    return <>
        <Perf position='top-left' />
        <OrbitControls
            makeDefault
            minDistance={5} // Minimum zoom level (closer to the target)
            maxDistance={150}
        />

        <directionalLight position={[1, 2, 3]} intensity={4.5} />
        <ambientLight intensity={1.5} />

        <mesh ref={invObj} scale={0} position={[- 12, 14, 45]}>
            <boxGeometry />
            <meshBasicMaterial />
        </mesh>

        <Galaxy />
        <Planets invObj={invObj} />
    </>
}
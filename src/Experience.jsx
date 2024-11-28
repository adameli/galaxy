import { OrbitControls, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { button, Leva, useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useRef } from 'react'
import Planets from './components/planets'
import Galaxy from './components/galaxy'


export default function Experience() {




    return <>
        <Perf position='top-left' />
        <OrbitControls makeDefault />

        <directionalLight position={[1, 2, 3]} intensity={4.5} />
        <ambientLight intensity={1.5} />


        {/* <Galaxy /> */}
        <Planets />

    </>
}
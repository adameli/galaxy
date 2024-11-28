import { OrbitControls, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { button, useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useRef } from 'react'
import Planets from './components/planets'
import Galaxy from './components/galaxy'


export default function Experience() {

    const { perfVisible } = useControls({
        perfVisible: true
    })
    // const { position, color, visible } = useControls('sphere', {
    //     position: { value: { x: -2, y: 0 }, step: 0.01, joystick: 'invertY' },

    //     color: '#4c80eb',
    //     visible: true,
    //     Click: button(() => {
    //         console.log('wee');

    //     })
    // })

    // const { scale } = useControls('cube', {
    //     scale: 1,
    // })
    // const cube = useRef()
    useFrame((state, delta) => {

        // cube.current.rotation.y += delta * 0.2
    })


    return <>
        {perfVisible ? <Perf position='top-left' /> : null}
        <OrbitControls makeDefault />

        <directionalLight position={[1, 2, 3]} intensity={4.5} />
        <ambientLight intensity={1.5} />

        {/* <mesh position-x={-2} >
            <sphereGeometry />
            <meshStandardMaterial />
        </mesh> */}
        {/* <Galaxy /> */}
        <Planets />

        {/* <mesh ref={cube} position-x={2} >
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh> */}


    </>
}
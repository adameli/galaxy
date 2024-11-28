import { Point, Points } from "@react-three/drei";
import * as THREE from 'three'

function Particles() {
    const count = 10000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const colorInside = new THREE.Color('#ff6030')
    const colorOutside = new THREE.Color('#1b3984')

    for (let i = 0; i < count * 3; i++) {

        const i3 = i * 3

        const radius = Math.random() * 5
        const spinAngle = radius * 1
        const angleBranch = (i % 3) / 3 * Math.PI * 2

        const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1)
        const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1)
        const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1)

        positions[i3 + 0] = Math.cos(angleBranch + spinAngle) * radius + randomX
        positions[i3 + 1] = randomY
        positions[i3 + 2] = Math.sin(angleBranch + spinAngle) * radius + randomZ

        //*colors
        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / 5)


        colors[i3 + 0] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b
    }

    return (
        <points scale={10}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={positions}
                    count={count}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    array={colors}
                    count={count}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.3}
                sizeAttenuation
                depthWrite={false}
                vertexColors

            />
        </points>
    )
}

export default function Galaxy() {



    return <>
        {/* <mesh position={[-4, 0, 0]}>
            <boxGeometry />
            <meshStandardMaterial color={'skyBlue'} />
        </mesh> */}

        <Particles />
    </>
}
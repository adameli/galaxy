import { useFrame, useThree } from "@react-three/fiber"
import { useRef, useState } from "react"
import { useControls, button } from "leva"
import * as THREE from 'three'
import { gsap } from "gsap"

// createPlanet(0.2, 1, 0.025, './textures/matcaps/mercury.jpg') // Mercury
// createPlanet(0.3, 3,  0.018, './textures/matcaps/venus.jpg'),  // Venus
// createPlanet(0.35, 5,  0.015,'./textures/matcaps/earth.jpg'),  // Earth
// createPlanet(0.2, 7,  0.013, './textures/matcaps/mars.jpg'),  // Mars
// createPlanet(1, 9,  0.009,'./textures/matcaps/jupiter.jpg'),  // Jupiter
// createPlanet(1.2, 13,  0.007,'./textures/matcaps/saturn.jpg', true),  // Saturn
// createPlanet(0.8, 16,  0.004,'./textures/matcaps/uranus.jpg'),  // Uranus
// createPlanet(0.7, 18,  0.003, './textures/matcaps/neptune.jpg'),  // Neptune
export default function Planets() {

    // Define planets as an array of configurations
    const planetsConfig = [
        { size: 0.2, distanceFromSun: 2, orbitSpeed: 0.025, color: 'orange' }, //Mercury
        { size: 0.3, distanceFromSun: 4, orbitSpeed: 0.018, color: 'pink' }, // Venus
        { size: 0.35, distanceFromSun: 5, orbitSpeed: 0.015, color: 'red' }, //Earth
        { size: 0.2, distanceFromSun: 7, orbitSpeed: 0.013, color: 'skyblue' }, //Mars
        { size: 1, distanceFromSun: 9, orbitSpeed: 0.009, color: 'salmon' }, //Jupiter
        { size: 1.2, distanceFromSun: 13, orbitSpeed: 0.007, color: 'green' }, //Saturn
        { size: 0.8, distanceFromSun: 16, orbitSpeed: 0.004, color: 'gold' }, //Uranus
        { size: 0.7, distanceFromSun: 18, orbitSpeed: 0.003, color: 'mediumPurple' }, //Neptune
    ]

    let isPausePlay = false

    // Create refs for all planets
    const planetsRefs = planetsConfig.map(() => useRef())

    //Camera
    const camera = useThree(state => state.camera)

    // Sun ref
    const sun = useRef()

    const [targetPosition, setTargetPosition] = useState(null)

    useFrame(() => {
        if (targetPosition) {
            // Interpolate camera position toward the target, change the z value to get the camera further och closer to the target
            camera.position.lerp(targetPosition.clone().add(new THREE.Vector3(0, 0, 4)), 0.03); // 0.03 the speed of the camera to move to the object

            // Adjust camera to look at the target position
            camera.lookAt(targetPosition);

            // Stop animating once the camera is close enough to the target,  change the z value to get the camera further och closer to the target
            if (camera.position.distanceTo(targetPosition.clone().add(new THREE.Vector3(0, 0, 4))) < 0.5) {
                // setTargetPosition(null); // Clear target position to stop animation
            }
        }
    });

    function movePlanet(planetIndex) {

        isPausePlay = true

        const activePlanet = planetsRefs[4].current.position


        gsap.to(planetsRefs[4].current.position, {
            y: 6,
            onComplete: () => {
                setTargetPosition(planetsRefs[4].current.position.clone());
            }
        })

    }

    useControls({
        MoveCamera: button((e) => {
            setTargetPosition(sun.current.position.clone());
        }),
        Jupiter: button(() => {
            // setTargetPosition(planetsRefs[4].current.position.clone());
            movePlanet()
        })
    })


    // Update the orbit of each planet on every frame
    // useFrame(() => {
    //     planetsRefs.forEach((planetRef, index) => {
    //         if (!planetRef.current) return

    //         // Increment the orbit angle
    //         const userData = planetRef.current.userData
    //         userData.orbitAngle += userData.orbitSpeed

    //         // Calculate the new position
    //         const x = Math.cos(userData.orbitAngle) * userData.orbitRadius
    //         const z = Math.sin(userData.orbitAngle) * userData.orbitRadius

    //         // Update the position of the planet
    //         planetRef.current.position.set(x, 0, z)
    //     })
    // })


    return (
        <>
            {/* Sun */}
            <mesh ref={sun} position={[0, 0, 0]}>
                <sphereGeometry />
                <meshStandardMaterial color="yellow" />
            </mesh>

            {/* Planets */}
            {planetsConfig.map((planet, index) => (
                <mesh
                    key={index}
                    ref={planetsRefs[index]}
                    position={[planet.distanceFromSun, 0, 0]}
                    userData={{
                        name: planet.color,
                        orbitRadius: planet.distanceFromSun,
                        orbitSpeed: planet.orbitSpeed,
                        orbitAngle: 0 // Initial angle
                    }}
                >
                    <sphereGeometry args={[planet.size, 16, 16]} />
                    <meshStandardMaterial color={planet.color} />
                </mesh>
            ))}
        </>
    )
}


// createPlanet(0.2, 1, 0.025, './textures/matcaps/mercury.jpg') // Mercury
// createPlanet(0.3, 3,  0.018, './textures/matcaps/venus.jpg'),  // Venus
// createPlanet(0.35, 5,  0.015,'./textures/matcaps/earth.jpg'),  // Earth
// createPlanet(0.2, 7,  0.013, './textures/matcaps/mars.jpg'),  // Mars
// createPlanet(1, 9,  0.009,'./textures/matcaps/jupiter.jpg'),  // Jupiter
// createPlanet(1.2, 13,  0.007,'./textures/matcaps/saturn.jpg', true),  // Saturn
// createPlanet(0.8, 16,  0.004,'./textures/matcaps/uranus.jpg'),  // Uranus
// createPlanet(0.7, 18,  0.003, './textures/matcaps/neptune.jpg'),  // Neptune
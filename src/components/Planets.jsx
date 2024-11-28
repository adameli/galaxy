import { useFrame, useThree } from "@react-three/fiber"
import { useRef, useState } from "react"
import { useControls, button } from "leva"
import * as THREE from 'three'
import { gsap } from "gsap"
import planetInfo from '../../public/data/planets.json'



let currentPlanet = null
let cameraPosition = null
let pausePlay = true
const infoCard = document.getElementById('planet-info')
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


    // Create refs for all planets
    const planetsRefs = planetsConfig.map(() => useRef())

    //Camera
    const camera = useThree(state => state.camera)
    cameraPosition = camera.position

    // Sun ref
    const sun = useRef()
    const invObj = useRef()


    // const [activePlanet, setActivePlanet] = useState(null)
    let activePlanet = null



    useFrame(() => {

        if (pausePlay) {
            planetsRefs.forEach((planetRef, index) => {
                if (!planetRef.current) return

                // Increment the orbit angle
                const userData = planetRef.current.userData
                userData.orbitAngle += userData.orbitSpeed

                // Calculate the new position
                const x = Math.cos(userData.orbitAngle) * userData.orbitRadius
                const z = Math.sin(userData.orbitAngle) * userData.orbitRadius

                // Update the position of the planet
                planetRef.current.position.set(x, 0, z)
            })

        }

        if (activePlanet) {
            camera.lookAt(activePlanet)
        }
    });


    function goCamera(targetPosition, offset) {

        const finalPosition = targetPosition.clone().add(offset);

        camera.lookAt(targetPosition)
        gsap.to(camera.position, {
            x: finalPosition.x,
            y: finalPosition.y,
            z: finalPosition.z,
            duration: 2,
            ease: "power3.inOut",
            onUpdate: () => {
                // Continuously update camera to look at the planet
                camera.lookAt(targetPosition);
            },
            onComplete: () => {
                console.log("Camera animation complete!");
                camera.lookAt(targetPosition); // Ensure it locks onto the final target
                const planetInformation = planetInfo[currentPlanet]
                console.log(planetInformation);

                infoCard.innerHTML = `
                        <h1>${planetInformation.title}</h1>
                        <p>${planetInformation.info}</p>
                    `
                infoCard.classList.add('show')
            },
        });
    }

    function backCamera(targetPosition) {
        camera.lookAt(targetPosition)
        gsap.to(camera.position, {
            x: targetPosition.x,
            y: targetPosition.y,
            z: targetPosition.z,
            duration: 2,
            ease: "power3.inOut",
            onUpdate: () => {
                // Continuously update camera to look at the planet
                camera.lookAt(targetPosition);
            },
            onComplete: () => {
                console.log("Camera animation complete!");
                camera.lookAt(targetPosition); // Ensure it locks onto the final target
                activePlanet = sun.current.position.clone()
                pausePlay = true
            },
        });
    }


    function movePlanet(planetIndex) {
        const planetSize = planetsRefs[planetIndex].current.userData.size

        const scaleFactor = 5; // Adjust this to control how large planets appear
        const offset = new THREE.Vector3(0, 0, planetSize * scaleFactor);

        const planetPosition = planetsRefs[planetIndex].current.position
        pausePlay = false
        activePlanet = planetPosition
        currentPlanet = planetIndex
        gsap.to(planetPosition, {
            y: 6,
            onComplete: () => {
                const target = planetsRefs[planetIndex].current.position.clone()
                goCamera(target, offset)
            }
        })
    }

    function resetPlanet() {

        const planetPosition = planetsRefs[currentPlanet].current.position

        infoCard.classList.remove('show')
        gsap.to(planetPosition, {
            y: 0,
            onComplete: () => {
                // setActivePlanet(sun.current.position.clone())
                backCamera(invObj.current.position.clone());
            }
        })
    }

    useControls({
        Back: button((e) => {
            resetPlanet()
        }),
        Mercury: button(() => {
            movePlanet(0)
        }),
        Venus: button(() => {
            movePlanet(1)
        }),
        Earth: button(() => {
            movePlanet(2)
        }),
        Mars: button(() => {
            movePlanet(3)
        }),
        Jupiter: button(() => {
            movePlanet(4)
        }),
        Saturn: button(() => {
            movePlanet(5)
        }),
        Uranus: button(() => {
            movePlanet(6)
        }),
        Neptune: button(() => {
            movePlanet(7)
        }),
        camPos: button(() => {
            console.log(camera.position);

        })
    })


    return (
        <>
            {/* Sun */}
            <mesh ref={sun} position={[0, 0, 0]}>
                <sphereGeometry />
                <meshStandardMaterial color="yellow" />
            </mesh>

            <mesh ref={invObj} scale={0} position={[- 12, 14, 45]}>
                <boxGeometry />
                <meshBasicMaterial />
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
                        orbitAngle: 0, // Initial angle
                        size: planet.size

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
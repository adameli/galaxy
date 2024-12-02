import { useFrame, useLoader, useThree } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { useControls, button, Leva } from "leva"
import * as THREE from 'three'
import { gsap } from "gsap"
import planetInfo from '../../public/data/planets.json'



let currentPlanet = null
let spin = null
let pausePlay = true
const infoCard = document.getElementById('planet-info')

export default function Planets({ invObj }) {

    // Define planets as an array of configurations
    const planetsConfig = [
        { size: 0.2, distanceFromSun: 2, orbitSpeed: 0.025, texture: 'textures/planet_textures/2k_mercury.jpg' }, //Mercury
        { size: 0.3, distanceFromSun: 4, orbitSpeed: 0.018, texture: 'textures/planet_textures/2k_venus_surface.jpg' }, // Venus
        { size: 0.35, distanceFromSun: 5, orbitSpeed: 0.015, texture: 'textures/planet_textures/2k_earth_daymap.jpg' }, //Earth
        { size: 0.2, distanceFromSun: 7, orbitSpeed: 0.013, texture: 'textures/planet_textures/2k_mars.jpg' }, //Mars
        { size: 1, distanceFromSun: 9, orbitSpeed: 0.009, texture: 'textures/planet_textures/2k_jupiter.jpg' }, //Jupiter
        { size: 1.2, distanceFromSun: 13, orbitSpeed: 0.007, texture: 'textures/planet_textures/2k_saturn.jpg' }, //Saturn
        { size: 0.8, distanceFromSun: 16, orbitSpeed: 0.004, texture: 'textures/planet_textures/2k_uranus.jpg' }, //Uranus
        { size: 0.7, distanceFromSun: 18, orbitSpeed: 0.003, texture: 'textures/planet_textures/2k_neptune.jpg' }, //Neptune
    ]


    // Create refs for all planets
    const planetsRefs = planetsConfig.map(() => useRef())

    //Camera
    const camera = useThree(state => state.camera)


    // Sun ref
    const sun = useRef()


    // const [activePlanet, setActivePlanet] = useState(null)
    let activePlanet = null



    useFrame((state, delta) => {

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

        if (spin) {
            spin.rotation.y += delta * 0.2
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
        spin = null
        gsap.to(camera.position, {
            x: targetPosition.x,
            y: targetPosition.y,
            z: targetPosition.z,
            duration: 2,
            ease: "power3.inOut",
            onUpdate: () => {
                camera.lookAt(targetPosition);
            },
            onComplete: () => {
                camera.lookAt(targetPosition);
                activePlanet = sun.current.position.clone()
                pausePlay = true
            },
        });
    }


    function movePlanet(planetIndex) {
        document.querySelectorAll('.control-btn').forEach(element => element.classList.toggle('display'))
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
                spin = planetsRefs[planetIndex].current
                goCamera(target, offset)
            }
        })
    }

    function resetPlanet() {
        document.querySelectorAll('.control-btn').forEach(element => element.classList.toggle('display'))
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



    const controlsContainer = document.querySelector('.controls-container')
    controlsContainer.innerHTML = null

    createControlBtn('back', 'Back')
    planetInfo.forEach((planet, i) => createControlBtn('planet', planet.title, i))

    function createControlBtn(type, title, i) {
        const btn = document.createElement('button')
        btn.classList.add('control-btn')

        switch (type) {
            case 'planet':
                btn.addEventListener('click', () => movePlanet(i))
                btn.classList.add('display')
                btn.textContent = `${title}`
                break;
            case 'back':
                btn.addEventListener('click', () => resetPlanet())
                btn.textContent = `${title}`
                break;
        }

        controlsContainer.append(btn)
    }


    const sunTexture = useLoader(THREE.TextureLoader, 'textures/planet_textures/2k_sun.jpg')

    return (
        <>

            {/* Sun */}
            <mesh ref={sun} position={[0, 0, 0]}>
                <sphereGeometry />
                <meshStandardMaterial map={sunTexture} />
            </mesh>

            {/* <mesh position={[- 5, 0, 0]}>
                <sphereGeometry />
                <meshStandardMaterial />
            </mesh> */}

            {/* Planets */}
            {planetsConfig.map((planet, index) => {

                const planetTexture = useLoader(THREE.TextureLoader, planet.texture);
                return (
                    <mesh
                        key={index}
                        ref={planetsRefs[index]}
                        position={[planet.distanceFromSun + 2, 0, 0]}
                        userData={{
                            name: planet.color,
                            orbitRadius: planet.distanceFromSun,
                            orbitSpeed: planet.orbitSpeed,
                            orbitAngle: 0, // Initial angle
                            size: planet.size

                        }}
                    >
                        <sphereGeometry args={[planet.size, 32, 32]} />
                        <meshStandardMaterial map={planetTexture} />
                    </mesh>
                )
            })}
        </>
    )
}


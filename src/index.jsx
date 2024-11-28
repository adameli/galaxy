import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { StrictMode } from 'react'
import Experience from './Experience.jsx'


const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(

    <StrictMode>
        <Canvas
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [- 12, 14, 45]
            }}
        >

            <Experience />
        </Canvas>

    </StrictMode>
)
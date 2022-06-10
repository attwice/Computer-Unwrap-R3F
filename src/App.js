import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, Loader } from '@react-three/drei'
import Model from './Model'
import { useSpring } from '@react-spring/core'
import { a as web } from '@react-spring/web'
import { a as three } from '@react-spring/three'

export default function App() {
  const [open, setOpen] = useState(false)
  const props = useSpring({ open: Number(open) })

  return (
    <>
      <web.main style={{ background: props.open.to([0, 1], ['#f0f0f0', '#73cbcf']) }}>
        <web.h1
          style={{
            letterSpacing: 2,
            opacity: props.open.to([0, 1], [1, 0]),
            transform: props.open.to((o) => `translate3d(-50%,${o * 50 - 100}px,0)`)
          }}>
          UNWRAP.
        </web.h1>
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, -25], fov: 35 }}>
          <three.pointLight position={[10, 10, 10]} intensity={1.5} color={props.open.to([0, 1], ['#f0f0f0', '#73cbcf'])} />
          <Suspense fallback={null}>
            <group rotation={[0, Math.PI, 0]} onClick={(e) => (e.stopPropagation(), setOpen(!open))}>
              <Model open={open} hinge={props.open.to([0, 1], [1.575, -0.425])} />
            </group>
            <Environment preset="city" />
          </Suspense>
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, open ? -6 : -4.5, 0]}
            opacity={0.4}
            width={50}
            height={50}
            blur={2}
            far={10}
          />
        </Canvas>
        <Loader />
      </web.main>
      <web.div style={{ height: '200vh' }} />
    </>
  )
}

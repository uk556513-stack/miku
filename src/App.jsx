import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, Center } from "@react-three/drei";
import "./App.css";

const MODEL_PATH = "/miku.glb";

function Model() {
  const modelRef = useRef();
  const { scene } = useGLTF(MODEL_PATH);

  useFrame((_, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <Center position={[0, -0.04, 0]}>
      <primitive
        ref={modelRef}
        object={scene}
        scale={0.30} 
      />
    </Center>
  );
}

function Loader() {
  return (
    <Html center>
      <div style={{ color: "#94a3b8", fontSize: "14px", whiteSpace: "nowrap" }}>
        Loading 3D Model...
      </div>
    </Html>
  );
}

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <div className="home-container">
      {/* 3D Model Background */}
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0.8, 5], fov: 45 }}>
          <ambientLight intensity={1.8} />
          <directionalLight position={[5, 8, 5]} intensity={2.2} />
          <pointLight position={[-5, 2, -2]} intensity={1.2} />

          <Suspense fallback={<Loader />}>
            <Model />
          </Suspense>

          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            enableRotate={true}
          />
        </Canvas>
      </div>

      {/* Register Panel Overlay */}
      <div className="register-panel">
        <h2>Register Now</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Signup Now</button>
        </form>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="toast">
          ✓ Account registered successfully
        </div>
      )}
    </div>
  );
}

useGLTF.preload(MODEL_PATH);
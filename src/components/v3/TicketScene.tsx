"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, PerformanceMonitor, Text } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { configureTextBuilder } from "troika-three-text";
import { pointer, story } from "./store";
import type { Theme } from "./themes";

// The Golden Ticket in real 3D (owner-approved 3D direction, Gildra board option 1; object hero after basement.studio).
// Gold is a true conductor (metalness 1, gold F0 colour) lit by bright light panels in a dark studio, with bevelled
// edges to catch highlights (3d-metal-material skill). Scroll story: the hero ticket spins, the camera pulls back and
// the eight World Finals seats appear: claimed seats in gold, open seats in glass.

// 3D text normally builds glyphs in a blob: worker, which our Content-Security-Policy blocks (and should).
// Build on the main thread instead: a handful of short labels, built once.
configureTextBuilder({ useWorker: false });

export type SceneSeat = { seat: number; claimed: boolean; title: string; sub: string };

const FONT = "/fonts/sofia-black.woff";
const W = 3.2;
const H = 1.6;
const STUB = 0.95; // x of the perforation (stub on the right)
const GOLD = new THREE.Color().setRGB(1.0, 0.71, 0.29, THREE.LinearSRGBColorSpace);

function useTicketGeometry() {
  return useMemo(() => {
    const r = 0.14;
    const n = 0.17; // notch radius
    const s = new THREE.Shape();
    s.moveTo(-W / 2 + r, -H / 2);
    s.lineTo(STUB - n, -H / 2);
    s.absarc(STUB, -H / 2, n, Math.PI, 0, true);
    s.lineTo(W / 2 - r, -H / 2);
    s.absarc(W / 2 - r, -H / 2 + r, r, -Math.PI / 2, 0, false);
    s.lineTo(W / 2, H / 2 - r);
    s.absarc(W / 2 - r, H / 2 - r, r, 0, Math.PI / 2, false);
    s.lineTo(STUB + n, H / 2);
    s.absarc(STUB, H / 2, n, 0, Math.PI, true);
    s.lineTo(-W / 2 + r, H / 2);
    s.absarc(-W / 2 + r, H / 2 - r, r, Math.PI / 2, Math.PI, false);
    s.lineTo(-W / 2, -H / 2 + r);
    s.absarc(-W / 2 + r, -H / 2 + r, r, Math.PI, Math.PI * 1.5, false);
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.05, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 6, curveSegments: 32 });
    g.center();
    return g;
  }, []);
}

const FRONT = 0.056; // front face z after centring (depth/2 + bevel) plus a hair

function Perforation({ color }: { color: string }) {
  const dots = useMemo(() => Array.from({ length: 9 }, (_, i) => -H / 2 + 0.3 + i * ((H - 0.6) / 8)), []);
  return (
    <group position={[STUB, 0, FRONT]}>
      {dots.map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <circleGeometry args={[0.022, 12]} />
          <meshBasicMaterial color={color} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function Engraving({ title, sub, seat, color, kicker }: { title: string; sub: string; seat: number; color: string; kicker: string }) {
  const L = -W / 2 + 0.24;
  return (
    <group position={[0, 0, FRONT]}>
      <Text font={FONT} fontSize={0.13} letterSpacing={0.12} color={color} anchorX="left" anchorY="top" position={[L, H / 2 - 0.2, 0]}>
        {kicker}
      </Text>
      <Text font={FONT} fontSize={title.length > 12 ? 0.32 : 0.42} maxWidth={STUB - L - 0.15} lineHeight={0.9} color={color} anchorX="left" anchorY="middle" position={[L, 0.02, 0]}>
        {title.toUpperCase()}
      </Text>
      <Text font={FONT} fontSize={0.1} letterSpacing={0.08} color={color} anchorX="left" anchorY="bottom" position={[L, -H / 2 + 0.2, 0]}>
        {sub.toUpperCase()}
      </Text>
      <Text font={FONT} fontSize={0.34} color={color} anchorX="center" anchorY="middle" rotation={[0, 0, Math.PI / 2]} position={[(STUB + W / 2) / 2, 0, 0]}>
        {`${String(seat).padStart(2, "0")}/08`}
      </Text>
    </group>
  );
}

function Ticket({ geometry, claimed, theme, ...rest }: { geometry: THREE.ExtrudeGeometry; claimed: boolean; theme: Theme; title: string; sub: string; seat: number; kicker: string; back?: string }) {
  const text = claimed ? theme.three.goldText : theme.three.glassText;
  return (
    <group>
      <mesh geometry={geometry}>
        {claimed ? (
          <meshPhysicalMaterial color={GOLD} metalness={1} roughness={0.26} clearcoat={0.5} clearcoatRoughness={0.2} envMapIntensity={1.25} />
        ) : (
          <meshPhysicalMaterial color={theme.three.glass} metalness={0.1} roughness={0.12} clearcoat={1} clearcoatRoughness={0.08} transparent opacity={0.82} envMapIntensity={0.55} />
        )}
      </mesh>
      <Engraving title={rest.title} sub={rest.sub} seat={rest.seat} color={text} kicker={rest.kicker} />
      <Perforation color={text} />
      {rest.back ? (
        <Text font={FONT} fontSize={0.36} color={text} anchorX="center" anchorY="middle" position={[-0.4, 0, -FRONT]} rotation={[0, Math.PI, 0]}>
          {rest.back}
        </Text>
      ) : null}
    </group>
  );
}

const ease = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : 1 - Math.pow(1 - t, 3));
const span = (p: number, a: number, b: number) => ease((p - a) / (b - a));

const TAN = Math.tan(THREE.MathUtils.degToRad(32 / 2)); // half the camera's vertical field of view

function Story({ seats, theme }: { seats: SceneSeat[]; theme: Theme }) {
  const geometry = useTicketGeometry();
  const hero = useRef<THREE.Group>(null);
  const grid = useRef<(THREE.Group | null)[]>([]);
  const aspect = useThree((s) => s.size.width / s.size.height);
  // Fit both shots to the screen shape: 4 columns on wide screens, 2 on phones; camera distance from the field of view.
  const layout = useMemo(() => {
    const cols = aspect < 0.9 ? 2 : 4;
    const rows = Math.ceil(seats.length / cols);
    const zHero = Math.max(6.2, 3.8 / (2 * TAN * aspect));
    const zGrid = Math.max((cols * 3.55 + 0.4) / (2 * TAN * aspect), (rows * 1.95 + 3.2) / (2 * TAN)) * 1.04;
    const visibleH = 2 * zGrid * TAN;
    const gridY = -visibleH * (aspect < 0.9 ? 0.12 : 0.17);
    const heroY = aspect < 0.9 ? 2 * zHero * TAN * 0.1 : 0;
    const slots = seats.map((_, i) => {
      const c = i % cols;
      const r = Math.floor(i / cols);
      return new THREE.Vector3((c - (cols - 1) / 2) * 3.55, ((rows - 1) / 2 - r) * 1.95 + gridY, 0);
    });
    return { cols, zHero, zGrid, heroY, slots };
  }, [aspect, seats]);
  const { slots } = layout;

  useFrame((state, dt) => {
    const p = story.p;
    const cam = state.camera;
    // Camera pulls back from the hero ticket to the whole field of eight.
    const pull = span(p, 0.3, 0.62);
    cam.position.z = THREE.MathUtils.damp(cam.position.z, layout.zHero + pull * (layout.zGrid - layout.zHero), 6, dt);
    cam.position.x = THREE.MathUtils.damp(cam.position.x, pointer.x * 0.6, 3, dt);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, -pointer.y * 0.4 + pull * 0.2, 3, dt);
    cam.lookAt(0, 0, 0);

    if (hero.current) {
      const spin = span(p, 0.02, 0.32);
      const out = span(p, 0.32, 0.55);
      hero.current.rotation.y = THREE.MathUtils.damp(hero.current.rotation.y, -0.35 + spin * Math.PI * 2 + pointer.x * 0.5, 5, dt);
      hero.current.rotation.x = THREE.MathUtils.damp(hero.current.rotation.x, 0.12 + pointer.y * 0.3, 5, dt);
      hero.current.position.y = layout.heroY + out * 6;
      hero.current.position.z = -out * 4;
      hero.current.visible = out < 0.999;
    }
    grid.current.forEach((g, i) => {
      if (!g) return;
      const t = span(p, 0.4 + i * 0.025, 0.66 + i * 0.025);
      const s = 0.001 + t * 0.92;
      g.scale.setScalar(s);
      g.position.copy(slots[i]).setZ(slots[i].z - (1 - t) * 6);
      // A slight, different tilt per ticket so each catches the light strips its own way (no flat wash).
      g.rotation.y = (1 - t) * Math.PI * 0.9 + ((i % layout.cols) - (layout.cols - 1) / 2) * 0.09 + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.04;
      g.rotation.x = -0.16 + Math.floor(i / layout.cols) * 0.06;
      g.visible = t > 0.001;
    });
  });

  return (
    <>
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.4}>
        <group ref={hero}>
          <Ticket geometry={geometry} claimed theme={theme} kicker="GOLDEN TICKET · 2026" title="World Finals" sub="Admit one team · Town Hall 18" seat={6} back="THREE LEFT" />
        </group>
      </Float>
      {seats.map((s, i) => (
        <group key={s.seat} ref={(el) => void (grid.current[i] = el)} visible={false}>
          <Ticket geometry={geometry} claimed={s.claimed} theme={theme} kicker={s.claimed ? "GOLDEN TICKET" : "OPEN SEAT"} title={s.title} sub={s.sub} seat={s.seat} />
        </group>
      ))}
    </>
  );
}

function Studio({ theme }: { theme: Theme }) {
  // A dim room with bright cards: what makes gold read as metal instead of yellow plastic or a black mirror.
  // A face-on ticket mirrors what is behind the viewer, so the biggest soft card sits there; hard strips at the
  // sides draw the moving highlights along the bevels.
  return (
    <Environment resolution={512} frames={1}>
      <color attach="background" args={["#1c1712"]} />
      <Lightformer form="rect" intensity={1.15} color={theme.three.key} position={[0, 0.8, 9]} scale={[16, 7, 1]} />
      <Lightformer form="rect" intensity={7} color="#ffffff" position={[-6, 2, 4]} scale={[0.9, 9, 1]} />
      <Lightformer form="rect" intensity={4} color={theme.three.rim} position={[6.5, -1, 3]} scale={[0.7, 9, 1]} />
      <Lightformer form="rect" intensity={3} color={theme.three.key} position={[0, 6, 2]} scale={[14, 1.2, 1]} />
      <Lightformer form="rect" intensity={0.8} color={theme.three.rim} position={[0, -6, 2]} scale={[14, 2, 1]} />
      <Lightformer form="ring" intensity={2.5} color={theme.three.key} position={[-3, 3, 7]} scale={2.2} />
    </Environment>
  );
}

export default function TicketScene({ seats, theme, active, onReady }: { seats: SceneSeat[]; theme: Theme; active: boolean; onReady: () => void }) {
  const [dpr, setDpr] = useState(1.5);
  const [fx, setFx] = useState(true);
  return (
    <Canvas
      dpr={dpr}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6.2], fov: 32 }}
      onCreated={() => onReady()}
      aria-hidden
    >
      <PerformanceMonitor
        onDecline={() => {
          setDpr(1);
          setFx(false);
        }}
        onIncline={() => setDpr(1.5)}
        flipflops={3}
        onFallback={() => {
          setDpr(1);
          setFx(false);
        }}
      />
      <Studio theme={theme} />
      <ambientLight intensity={0.15} />
      <Story seats={seats} theme={theme} />
      {fx ? (
        <EffectComposer multisampling={0}>
          <Bloom mipmapBlur intensity={theme.three.bloom} luminanceThreshold={0.9} />
          <Vignette darkness={0.35} offset={0.3} />
        </EffectComposer>
      ) : null}
    </Canvas>
  );
}

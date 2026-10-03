"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, PerformanceMonitor, Text } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { configureTextBuilder } from "troika-three-text";
import { pointer, story } from "./store";

// "Will Call" hero (surface brief: .impeccable/surfaces/src-app-page-tsx.md). A real foil Golden Ticket:
// gold as a true conductor (metalness 1, gold F0) in a dim studio of bright cards (3d-metal-material skill),
// bevelled so the edges catch light, a holographic security strip (iridescence) and an engraved face.
// Scroll story (story.p): the ticket turns, the stub tears off along the perforation, the camera pulls back to the
// seating chart of eight: won seats in foil, open seats as ghost tickets (outline only), so the count reads at a glance.

// 3D text builds glyphs on the main thread: our CSP (rightly) blocks troika's blob: worker.
configureTextBuilder({ useWorker: false });

export type SceneSeat = { seat: number; claimed: boolean; title: string; sub: string };

const DISPLAY = "/fonts/fontshare/Tanker-Regular.woff"; // downloaded at build (scripts/fetch-fonts.mjs)
const W = 3.2;
const H = 1.6;
const STUB = 0.95; // x of the perforation; the stub is to the right
const R = 0.14;
const N = 0.17; // notch radius
const GOLD = new THREE.Color().setRGB(1.0, 0.71, 0.29, THREE.LinearSRGBColorSpace);
const INK_ON_GOLD = "#3a2507";
const HALO = "#a8a2ff";
const TAN = Math.tan(THREE.MathUtils.degToRad(32 / 2));

// Body (left of the perforation) and stub (right of it) are separate shapes so the stub can tear away.
function useTicketParts() {
  return useMemo(() => {
    const body = new THREE.Shape();
    body.moveTo(-W / 2 + R, -H / 2);
    body.lineTo(STUB - N, -H / 2);
    body.absarc(STUB, -H / 2, N, Math.PI, Math.PI / 2, true);
    body.lineTo(STUB, H / 2 - N);
    body.absarc(STUB, H / 2, N, -Math.PI / 2, Math.PI, true);
    body.lineTo(-W / 2 + R, H / 2);
    body.absarc(-W / 2 + R, H / 2 - R, R, Math.PI / 2, Math.PI, false);
    body.lineTo(-W / 2, -H / 2 + R);
    body.absarc(-W / 2 + R, -H / 2 + R, R, Math.PI, Math.PI * 1.5, false);

    const stub = new THREE.Shape();
    stub.moveTo(STUB, -H / 2 + N);
    stub.absarc(STUB, -H / 2, N, Math.PI / 2, 0, true);
    stub.lineTo(W / 2 - R, -H / 2);
    stub.absarc(W / 2 - R, -H / 2 + R, R, -Math.PI / 2, 0, false);
    stub.lineTo(W / 2, H / 2 - R);
    stub.absarc(W / 2 - R, H / 2 - R, R, 0, Math.PI / 2, false);
    stub.lineTo(STUB + N, H / 2);
    stub.absarc(STUB, H / 2, N, 0, -Math.PI / 2, true);
    stub.lineTo(STUB, -H / 2 + N);

    const opts = { depth: 0.05, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 6, curveSegments: 32 };
    const b = new THREE.ExtrudeGeometry(body, opts);
    const s = new THREE.ExtrudeGeometry(stub, opts);
    b.translate(0, 0, -0.025);
    s.translate(0, 0, -0.025);
    return { body: b, stub: s, edgesBody: new THREE.EdgesGeometry(b, 30), edgesStub: new THREE.EdgesGeometry(s, 30) };
  }, []);
}

const FRONT = 0.056;

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

// Ticket face. No line above the title (no kickers): the ticket's own label prints on its bottom line.
// `big`: phones, where the chart is framed smaller, so the small lines grow to stay readable.
function Face({ kicker, title, sub, color, big = false }: { kicker: string; title: string; sub: string; color: string; big?: boolean }) {
  const L = -W / 2 + 0.3;
  return (
    <group position={[0, 0, FRONT]}>
      <Text font={DISPLAY} fontSize={title.length > 18 ? (big ? 0.27 : 0.27) : title.length > 12 ? (big ? 0.32 : 0.3) : big ? 0.46 : 0.4} maxWidth={STUB - L - 0.18} lineHeight={0.92} color={color} anchorX="left" anchorY="top" position={[L, H / 2 - 0.2, 0]}>
        {title.toUpperCase()}
      </Text>
      <Text font={DISPLAY} fontSize={big ? 0.22 : 0.1} maxWidth={STUB - L - 0.18} letterSpacing={0.08} lineHeight={1.1} color={color} anchorX="left" anchorY="bottom" position={[L, -H / 2 + 0.2, 0]}>
        {(big ? kicker : `${kicker} · ${sub}`).toUpperCase()}
      </Text>
    </group>
  );
}

function StubFace({ seat, color }: { seat: number; color: string }) {
  return (
    <Text font={DISPLAY} fontSize={0.32} color={color} anchorX="center" anchorY="middle" rotation={[0, 0, Math.PI / 2]} position={[(STUB + W / 2) / 2, 0, FRONT]}>
      {`${String(seat).padStart(2, "0")}/08`}
    </Text>
  );
}

function Gold({ rough = 0.24, env = 1.25 }: { rough?: number; env?: number }) {
  return <meshPhysicalMaterial color={GOLD} metalness={1} roughness={rough} clearcoat={0.5} clearcoatRoughness={0.2} envMapIntensity={env} />;
}

function HoloStrip() {
  // Security foil: a thin iridescent band whose colour shifts with the viewing angle.
  return (
    <mesh position={[-W / 2 + 0.16, 0, FRONT + 0.001]}>
      <planeGeometry args={[0.07, H - 0.12]} />
      <meshPhysicalMaterial color="#ffffff" metalness={1} roughness={0.15} iridescence={1} iridescenceIOR={1.6} iridescenceThicknessRange={[180, 900]} envMapIntensity={1.6} />
    </mesh>
  );
}

type Parts = ReturnType<typeof useTicketParts>;

function WonTicket({ parts, kicker, title, sub, seat, big }: { parts: Parts; kicker: string; title: string; sub: string; seat: number; big?: boolean }) {
  return (
    <group>
      <mesh geometry={parts.body}>
        <Gold rough={0.24} env={0.72} />
      </mesh>
      <mesh geometry={parts.stub}>
        <Gold rough={0.24} env={0.72} />
      </mesh>
      <Face kicker={kicker} title={title} sub={sub} color={INK_ON_GOLD} big={big} />
      <StubFace seat={seat} color={INK_ON_GOLD} />
      <Perforation color={INK_ON_GOLD} />
    </group>
  );
}

function GhostTicket({ parts, title, sub, seat, big }: { parts: Parts; title: string; sub: string; seat: number; big?: boolean }) {
  // An open seat: printed but not yet issued. Faint stock, engraved outline, no foil.
  return (
    <group>
      <mesh geometry={parts.body}>
        <meshPhysicalMaterial color="#251ea3" metalness={0} roughness={0.35} transparent opacity={0.38} />
      </mesh>
      <mesh geometry={parts.stub}>
        <meshPhysicalMaterial color="#251ea3" metalness={0} roughness={0.35} transparent opacity={0.38} />
      </mesh>
      <lineSegments geometry={parts.edgesBody}>
        <lineBasicMaterial color={HALO} transparent opacity={0.85} />
      </lineSegments>
      <lineSegments geometry={parts.edgesStub}>
        <lineBasicMaterial color={HALO} transparent opacity={0.85} />
      </lineSegments>
      <Face kicker="Open seat" title={title} sub={sub} color="#d9d5ff" big={big} />
      <StubFace seat={seat} color="#d9d5ff" />
      <Perforation color={HALO} />
    </group>
  );
}

const ease = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : 1 - Math.pow(1 - t, 3));
const span = (p: number, a: number, b: number) => ease((p - a) / (b - a));

function Story({ seats }: { seats: SceneSeat[] }) {
  // The seating chart is built only when the scroll story gets near it: its 3D text is the heaviest work.
  const [gridOn, setGridOn] = useState(false);
  const parts = useTicketParts();
  const hero = useRef<THREE.Group>(null);
  const heroStub = useRef<THREE.Group>(null);
  const grid = useRef<(THREE.Group | null)[]>([]);
  const aspect = useThree((s) => s.size.width / s.size.height);
  const layout = useMemo(() => {
    const cols = aspect < 0.9 ? 2 : 4;
    const rows = Math.ceil(seats.length / cols);
    const zHero = Math.max(aspect < 0.9 ? 6.4 : 7.6, 3.9 / (2 * TAN * aspect));
    const zGrid = Math.max((cols * 3.55 + 0.4) / (2 * TAN * aspect), (rows * 1.95 + 3.2) / (2 * TAN)) * 1.04;
    const gridY = -2 * zGrid * TAN * (aspect < 0.9 ? 0.12 : 0.17);
    // The headline sits above the ticket (phones: three lines; desktop: one line across the width), so the
    // ticket is framed lower and never hides a word.
    const heroY = -2 * zHero * TAN * (aspect < 0.9 ? -0.06 : 0.09);
    const slots = seats.map((_, i) => new THREE.Vector3(((i % cols) - (cols - 1) / 2) * 3.55, ((rows - 1) / 2 - Math.floor(i / cols)) * 1.95 + gridY, 0));
    return { cols, zHero, zGrid, heroY, slots };
  }, [aspect, seats]);

  useFrame((state, dt) => {
    const p = story.p;
    if (!gridOn && p > 0.18) setGridOn(true);
    const cam = state.camera;
    const pull = span(p, 0.36, 0.66);
    cam.position.z = THREE.MathUtils.damp(cam.position.z, layout.zHero + pull * (layout.zGrid - layout.zHero), 6, dt);
    cam.position.x = THREE.MathUtils.damp(cam.position.x, pointer.x * 0.6, 3, dt);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, -pointer.y * 0.4, 3, dt);
    cam.lookAt(0, 0, 0);

    if (hero.current && heroStub.current) {
      const turn = span(p, 0.02, 0.2);
      const tear = span(p, 0.18, 0.36);
      const out = span(p, 0.34, 0.56);
      hero.current.rotation.y = THREE.MathUtils.damp(hero.current.rotation.y, -0.35 + turn * 0.55 + pointer.x * 0.45, 5, dt);
      hero.current.rotation.x = THREE.MathUtils.damp(hero.current.rotation.x, 0.1 + pointer.y * 0.28, 5, dt);
      hero.current.position.set(0, layout.heroY + out * 6.5, -out * 4);
      hero.current.visible = out < 0.999;
      // The stub tears along the perforation: it hinges away and falls, spinning slightly.
      heroStub.current.position.set(STUB + tear * 0.9, -tear * 2.4, tear * 0.6);
      heroStub.current.rotation.set(-tear * 0.5, tear * 0.4, -tear * 0.65);
    }
    grid.current.forEach((g, i) => {
      if (!g) return;
      const t = span(p, 0.44 + i * 0.025, 0.7 + i * 0.025);
      g.scale.setScalar(0.001 + t * 0.92);
      g.position.copy(layout.slots[i]).setZ(-(1 - t) * 6);
      g.rotation.y = (1 - t) * Math.PI * 0.9 + ((i % layout.cols) - (layout.cols - 1) / 2) * 0.09 + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.04;
      g.rotation.x = -0.16 + Math.floor(i / layout.cols) * 0.06;
      g.visible = t > 0.001;
    });
  });

  return (
    <>
      <Float speed={1.3} rotationIntensity={0.12} floatIntensity={0.35}>
        <group ref={hero}>
          <mesh geometry={parts.body}>
            <Gold />
          </mesh>
          <HoloStrip />
          <Face kicker="World Finals 2026" title="Admit one team" sub="Town Hall 18" color={INK_ON_GOLD} />
          <group ref={heroStub} position={[STUB, 0, 0]}>
            <group position={[-STUB, 0, 0]}>
              <mesh geometry={parts.stub}>
                <Gold />
              </mesh>
              <StubFace seat={6} color={INK_ON_GOLD} />
              <Perforation color={INK_ON_GOLD} />
            </group>
          </group>
        </group>
      </Float>
      {gridOn && seats.map((s, i) => (
        <group key={s.seat} ref={(el) => void (grid.current[i] = el)} visible={false}>
          {s.claimed ? <WonTicket parts={parts} kicker="Golden ticket" title={s.title} sub={s.sub} seat={s.seat} big={layout.cols === 2} /> : <GhostTicket parts={parts} title={s.title} sub={s.sub} seat={s.seat} big={layout.cols === 2} />}
        </group>
      ))}
    </>
  );
}

function Studio() {
  // A dim room with bright cards: gold reads as metal, not yellow plastic or a black mirror. The biggest soft card
  // sits behind the viewer (a face-on ticket mirrors it); hard strips draw moving highlights along the bevels.
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={["#14102e"]} />
      <Lightformer form="rect" intensity={1.15} color="#fff1d6" position={[0, 0.8, 9]} scale={[16, 7, 1]} />
      <Lightformer form="rect" intensity={7} color="#ffffff" position={[-6, 2, 4]} scale={[0.9, 9, 1]} />
      <Lightformer form="rect" intensity={4} color="#9b8cff" position={[6.5, -1, 3]} scale={[0.7, 9, 1]} />
      <Lightformer form="rect" intensity={3} color="#fff1d6" position={[0, 6, 2]} scale={[14, 1.2, 1]} />
      <Lightformer form="rect" intensity={0.8} color="#6a5cff" position={[0, -6, 2]} scale={[14, 2, 1]} />
      <Lightformer form="ring" intensity={2.5} color="#fff1d6" position={[-3, 3, 7]} scale={2.2} />
    </Environment>
  );
}

// `still`: reduced motion. The ticket is drawn once (no orbit, no story), and redrawn only when the seats change.
export default function HeroScene({ seats, active, still, onReady }: { seats: SceneSeat[]; active: boolean; still: boolean; onReady: () => void }) {
  const [dpr, setDpr] = useState(1.5);
  const lower = () => setDpr(1);
  return (
    // `flat` (no tone mapping): ACES desaturates gold toward cream; flat keeps the foil saturated on every device.
    // No post-processing: the bloom pass cost a full-screen render and a large library for a barely visible glow.
    <Canvas flat dpr={dpr} frameloop={!active ? "never" : still ? "demand" : "always"} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} camera={{ position: [0, 0, 6.4], fov: 32 }} onCreated={() => onReady()} aria-hidden>
      <PerformanceMonitor onDecline={lower} onIncline={() => setDpr(1.5)} flipflops={3} onFallback={lower} />
      <Studio />
      <ambientLight intensity={0.15} />
      <Story seats={seats} />
    </Canvas>
  );
}

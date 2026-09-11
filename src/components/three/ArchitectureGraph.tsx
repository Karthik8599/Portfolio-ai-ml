import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

/**
 * The hero centrepiece: a small, literal AI-pipeline graph rather than
 * abstract particle art. Nodes are pipeline stages (ingest -> embed ->
 * retrieve -> reason -> generate -> evaluate -> serve, with a feedback edge
 * from evaluate back to reason for the agentic loop). Bright markers travel
 * along each edge on a loop to read as "data flowing through the system".
 * Restrained: two accent hues, small halos, no additive-everywhere glow.
 */

const BLUE = "#5b8def";
const VIOLET = "#8b7cf6";

type NodeDef = { id: string; label: string; pos: [number, number, number]; color: string };

const NODES: NodeDef[] = [
  { id: "ingest", label: "Ingest", pos: [-2.45, 0.55, -0.3], color: BLUE },
  { id: "embed", label: "Embed", pos: [-1.5, -0.4, 0.35], color: VIOLET },
  { id: "retrieve", label: "Retrieve", pos: [-0.4, 0.7, -0.25], color: BLUE },
  { id: "reason", label: "Reason", pos: [0.7, -0.25, 0.5], color: VIOLET },
  { id: "generate", label: "Generate", pos: [1.75, 0.5, -0.1], color: BLUE },
  { id: "evaluate", label: "Evaluate", pos: [0.75, 1.4, 0.25], color: VIOLET },
  { id: "serve", label: "Serve", pos: [2.7, -0.3, 0.4], color: BLUE },
];

const EDGES: [string, string][] = [
  ["ingest", "embed"],
  ["embed", "retrieve"],
  ["retrieve", "reason"],
  ["reason", "generate"],
  ["generate", "serve"],
  ["generate", "evaluate"],
  ["evaluate", "reason"], // agentic feedback loop
];

const NODE_MAP = new Map(NODES.map((n) => [n.id, n]));

type Props = { onReady?: () => void; labels?: boolean };

export function ArchitectureGraph({ onReady, labels = true }: Props) {
  const group = useRef<THREE.Group>(null);
  const pulseRefs = useRef<THREE.Mesh[]>([]);
  const build = useRef(0);

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  const lineGeo = useMemo(() => {
    const verts: number[] = [];
    EDGES.forEach(([a, b]) => {
      const pa = NODE_MAP.get(a)!.pos;
      const pb = NODE_MAP.get(b)!.pos;
      verts.push(...pa, ...pb);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    return g;
  }, []);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05);
    build.current += (1 - build.current) * d * 1.6;

    if (group.current) {
      const scale = 0.85 + 0.15 * build.current;
      group.current.scale.setScalar(scale);

      // slow continuous drift, plus a gentle lean toward the cursor
      group.current.rotation.y += d * 0.045;
      const targetTiltX = state.pointer.y * 0.12;
      const targetTiltZ = -state.pointer.x * 0.06;
      group.current.rotation.x += (targetTiltX - group.current.rotation.x) * 0.04;
      group.current.rotation.z += (targetTiltZ - group.current.rotation.z) * 0.04;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }

    EDGES.forEach(([a, b], i) => {
      const pa = NODE_MAP.get(a)!.pos;
      const pb = NODE_MAP.get(b)!.pos;
      const speed = 0.16;
      const offset = i * 0.17;
      const t = (state.clock.elapsedTime * speed + offset) % 1;
      const m = pulseRefs.current[i];
      if (!m) return;
      m.position.set(
        THREE.MathUtils.lerp(pa[0], pb[0], t),
        THREE.MathUtils.lerp(pa[1], pb[1], t),
        THREE.MathUtils.lerp(pa[2], pb[2], t)
      );
      const mat = m.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.sin(t * Math.PI) * 0.9 * build.current;
    });
  });

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.14} depthWrite={false} />
      </lineSegments>

      {NODES.map((n) => (
        <group key={n.id} position={n.pos}>
          <mesh>
            <sphereGeometry args={[0.085, 20, 20]} />
            <meshBasicMaterial color={n.color} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial
              color={n.color}
              transparent
              opacity={0.14}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          {labels && (
            <Html center distanceFactor={9} zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
              <span className="graph-label" style={{ borderColor: n.color }}>
                {n.label}
              </span>
            </Html>
          )}
        </group>
      ))}

      {EDGES.map((_, i) => (
        <mesh key={i} ref={(el) => (pulseRefs.current[i] = el as THREE.Mesh)}>
          <sphereGeometry args={[0.045, 10, 10]} />
          <meshBasicMaterial color="#dce7ff" transparent opacity={0} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

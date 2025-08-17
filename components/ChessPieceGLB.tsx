import { useGLTF } from '@react-three/drei';

export function ChessPieceGLB({ piece, color, position }: { piece: string, color: 'white' | 'black', position: [number, number, number] }) {
  // For now, use the uploaded GLB for all pieces as a placeholder
  // Replace 'Polycam auto shoot .glb' with the correct filename for each piece if you have separate files
  const { scene } = useGLTF('/models/Polycam auto shoot .glb');
  return (
    <primitive object={scene.clone()} position={position} scale={0.25} />
  );
}

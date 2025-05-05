import { Node } from '../lib/types';

interface MindMapViewProps {
  nodes: Node[];
  selectedNode: Node | null;
  onNodeSelect: (node: Node | null) => void;
  onNodePositionUpdate: (id: string, x: number, y: number) => void;
}

export default function MindMapView({
  nodes,
  selectedNode,
  onNodeSelect,
  onNodePositionUpdate,
}: MindMapViewProps) {
  return (
    <div className="flex-1 relative overflow-hidden bg-gray-50">
      {nodes.map((node) => (
        <div
          key={node.id}
          className={`absolute p-4 bg-white rounded-lg shadow-md cursor-pointer ${
            selectedNode?.id === node.id ? 'ring-2 ring-blue-500' : ''
          }`}
          style={{
            left: node.x,
            top: node.y,
            transform: 'translate(-50%, -50%)',
          }}
          onClick={() => onNodeSelect(node)}
          onDragEnd={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            onNodePositionUpdate(node.id, rect.left + rect.width / 2, rect.top + rect.height / 2);
          }}
          draggable
        >
          <p className="text-sm font-medium">{node.text}</p>
        </div>
      ))}
    </div>
  );
} 
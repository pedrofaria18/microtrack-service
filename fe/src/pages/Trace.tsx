import { useCallback, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { io } from 'socket.io-client';

import ReactFlow, {
  Controls,
  MarkerType,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';

import { CustomModal } from '../components/CustomModal';

export default function Trace() {
  const { traceId } = useParams();

  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);

  const [nodeSelected, setNodeSelected] = useState<string>('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const socket = io('http://localhost:3002');

    socket.on('connect', () => {
      socket.emit('visualizarTrace', traceId);
    });

    socket.on('trace', (change) => {
      const initialNodes = change.nodes.map((node: any, index: number) => {
        const hasTarget = change.edges.some(
          (edge: any) => edge.source === node.checkpointName
        );

        return {
          id: node.checkpointName,
          data: { label: node.checkpointName, node },
          position: {
            x: index === 0 ? 0 : Math.random() * 1000,
            y: index === 0 ? 0 : Math.random() * 500,
          },
          sourcePosition: hasTarget ? 'right' : 'left',
          targetPosition: index === 0 ? 'right' : 'left',
          connectable: false,
          style: {
            borderColor: node.isError ? '#FF0000' : '#1a192b',
            color: node.isError ? '#FF0000' : '#1a192b',
            boxShadow: `0 0 0 0.5px ${node.isError ? '#FF0000' : '#1a192b'}`,
            cursor: 'pointer',
          },
        };
      });

      const initialEdges = change.edges.map((edge: any) => {
        return {
          id: Math.random().toString(),
          source: edge.source,
          target: edge.target,
          style: { stroke: '#1a192b', strokeWidth: 2 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#1a192b',
          },
        };
      });

      setNodes(initialNodes);
      setEdges(initialEdges);
    });

    return () => {
      socket.disconnect();
    };
  }, [traceId]);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  return (
    <div>
      <h1
        className="
        text-2xl
        font-bold
        text-[#5A5A5B]
        my-4
        "
      >
        Trace: {traceId}
      </h1>
      <div
        className="
        flex
        flex-col
        items-center
        justify-center
        w-full
        h-[calc(100vh-100px)]
        bg-[#F9FAFB]
        border-[#E7EAEE]
        border-2
        rounded-xl
      "
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={(_, node) => {
            setNodeSelected(node.data.node.checkpointName);
            openModal();
          }}
        >
          <Controls />
        </ReactFlow>
      </div>

      {isModalOpen && (
        <CustomModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          body={{
            events: nodes
              .filter((node) => node.id === nodeSelected)
              .map((node) => node.data.node),
          }}
        />
      )}
    </div>
  );
}

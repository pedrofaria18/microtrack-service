import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { io } from 'socket.io-client';

import ReactFlow, { MarkerType } from 'reactflow';
import { CustomModal } from '../components/CustomModal';
import { Event } from '../types/Trace';

export default function Trace() {
  const { traceId } = useParams();

  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);

  const [nodeSelected, setNodeSelected] = useState<Event>({} as Event);

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
      const eventsNodes = change.events.map((event: any, index: number) => {
        return {
          id: Math.random().toString(),
          data: { label: event.checkpointName, event },
          position: { x: index * 200, y: 0 },
          sourcePosition: index === change.events.length - 1 ? 'left' : 'right',
          targetPosition: index === 0 ? 'right' : 'left',
          connectable: false,
          dragbable: true,
          style: {
            cursor: 'pointer',
          },
        };
      });

      const eventsEdges = change.events.map((event: any, index: number) => {
        return {
          id: Math.random().toString(),
          source: eventsNodes[index].id,
          target: eventsNodes[index + 1]?.id,
          style: { stroke: '#1a192b', strokeWidth: 2 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#1a192b',
          },
        };
      });

      setNodes(eventsNodes);
      setEdges(eventsEdges);
    });

    return () => {
      socket.disconnect();
    };
  }, [traceId]);

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
          onNodeClick={(event, node) => {
            setNodeSelected(node.data.event);
            openModal();
          }}
        />
      </div>

      {isModalOpen && (
        <CustomModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          body={nodeSelected}
        />
      )}
    </div>
  );
}

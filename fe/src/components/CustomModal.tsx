import Modal from 'react-modal';

import { Event } from '../types/Trace';

import TextAreaJsonEditor from './JsonView';

export function CustomModal({
  isOpen,
  onRequestClose,
  body,
}: {
  isOpen: boolean;
  onRequestClose: () => void;
  body: Event;
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick
      className="bg-white fixed inset-0 flex flex-col items-center h-[400px] max-w-[1200px] m-auto p-6"
      overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50"
      ariaHideApp={false}
    >
      <div className="flex flex-row w-full items-center justify-between mb-4 gap-3">
        <h2 className="text-2xl font-bold">
          Visualização {body.checkpointName}
        </h2>
        <span
          onClick={onRequestClose}
          className="text-[#000] text-2xl cursor-pointer"
        >
          X
        </span>
      </div>

      <TextAreaJsonEditor value={body} />
    </Modal>
  );
}

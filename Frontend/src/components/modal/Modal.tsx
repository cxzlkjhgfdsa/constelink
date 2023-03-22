import React, { useState } from 'react';
import Modal from 'react-modal';
import './Modal.css';

interface ModalContentProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContent = ({ isOpen, onClose }: ModalContentProps) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    className="Modal"
    overlayClassName="Overlay"
  >
    <h1>모달창 제목</h1>
    <p>모달창 내용</p>
    <button onClick={onClose}>모달창 닫기</button>
  </Modal>
);

const ParentComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={handleOpenModal}>모달창 열기</button>
      <ModalContent isOpen={isOpen} onClose={handleCloseModal} />
    </>
  );
};

export default ParentComponent;
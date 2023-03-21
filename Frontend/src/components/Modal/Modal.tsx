import React, {PropsWithChildren} from "react";
import styles from './Modal.module.css';

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

// 모달 기본 형식
function Modal({
  onClickToggleModal,
  children,
}: PropsWithChildren<ModalDefaultType>) {
  return (
    <div className={styles.ModalContainer}>
      <div className={styles.DialogBox}>
        {children}
        </div>
        <div className={styles.Backdrop}
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            if (onClickToggleModal) {
              onClickToggleModal();
            }
          }}
          >
        </div>
    </div>
  );
}

export default Modal;
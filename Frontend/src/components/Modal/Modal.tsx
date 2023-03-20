import React from 'react';
import styles from "./Modal.module.css";

interface ModalProps {
  open: boolean;
  close: () => void;
  header: string;
  children: React.ReactNode; // Define the type of children explicitly
}

const Header: React.FC<ModalProps> = ({ open, close, header, children }) => {
  return (
    <div className={open ? `${styles.openModal} ${styles.modal}` : styles.modal}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>{children}</main>
          <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Header;
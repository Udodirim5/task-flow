import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  cloneElement,
  ReactElement,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useOutsideClick } from "../hooks/useOutsideClick";

type ModalContextType = {
  openName: string;
  open: (name: string) => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const Modal = ({ children }: { children: ReactNode }) => {
  const [openName, setOpenName] = useState("");

  const open = (name: string) => setOpenName(name);
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Modal components must be used within <Modal>");
  return context;
};

const Open = ({
  children,
  opensWindowName,
}: {
  children: ReactElement<{ onClick?: () => void }>;
  opensWindowName: string;
}) => {
  const { open } = useModalContext();
  return cloneElement(children, { onClick: () => open(opensWindowName) });
};

const Window = ({
  children,
  name,
}: {
  children: ReactElement<{ onCloseModal?: () => void }>;
  name: string;
}) => {
  const { openName, close } = useModalContext();
  const ref = useOutsideClick<HTMLDivElement>(close);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div
        ref={ref}
        className={`relative overflow-auto rounded-2xl shadow-xl transition-all 
          ${isMobile ? "max-h-[90dvh]"  : "flex items-center justify-center max-w-[600px] max-h-[90dvh]"}`}
      >
        <button
          onClick={close}
          className="absolute right-4 top-3 rounded-full p-2 text-gray-400 hover:bg-gray-200 hover:rotate-90 transition"
          aria-label="close button"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="overflow-y-auto">
          {cloneElement(children, { onCloseModal: close })}
        </div>
      </div>
    </div>,
    document.body
  );
};

// Attach components
Modal.Open = Open;
Modal.Window = Window;

export default Modal;

/*

<Modal>
  <Modal.Open opensWindowName="window1">
    <button>Open Modal</button>
  </Modal.Open>

  <Modal.Window name="window1">
    <MyModalContent />
  </Modal.Window>
</Modal>


*/

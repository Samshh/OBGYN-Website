interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps){
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center h-screen">
      <div className="bg-white p-[1rem] border border-border rounded-md relative flex flex-col gap-[1rem]">
        <button className="absolute top-4 right-4" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};
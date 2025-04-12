type ConfirmDeleteProps = {
  resourceName: string;
  onConfirm: () => void;
  onCloseModal?: () => void;
  disabled?: boolean;
};

const ConfirmDelete = ({
  resourceName,
  onConfirm,
  onCloseModal,
  disabled = false,
}: ConfirmDeleteProps) => {
  return (
    <div className="bg-gray-100 w-full max-w-[40rem] flex flex-col gap-4 text-gray-800 p-5">
      <h3 className="text-xl font-semibold">Delete {resourceName}</h3>

      <p className="text-gray-500 mb-4">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="flex justify-end gap-4">
        <button
          onClick={() => onCloseModal?.()}
          disabled={disabled}
          className={`px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition 
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={disabled}
          className={`px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition 
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;

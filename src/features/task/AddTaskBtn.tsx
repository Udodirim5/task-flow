import { Plus } from "lucide-react";
import Modal from "../../ui/Modal";
import TaskForm from "../../ui/TaskForm";

interface AddTaskBtnProps {
  className?: string;
}

const AddTaskBtn: React.FC<AddTaskBtnProps> = ({ className }) => {
  return (
    <Modal>
      <Modal.Open opensWindowName="create">
        <button className={className}>
          <Plus className="w-5 h-5" />
          <span>Add New Task</span>
        </button>
      </Modal.Open>

      <Modal.Window name="create">
        <TaskForm />
      </Modal.Window>
    </Modal>
  );
};

export default AddTaskBtn;

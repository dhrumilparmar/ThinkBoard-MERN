import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { formatDate } from "../lib/utilis";
import api from "../lib/axios";

const Notecard = ({ note, setNotes }) => {
  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      // We ask for confirmation before deleting
      if (!window.confirm("Are you sure you want to delete this note?")) return;
      await api.delete(`/notes/${note._id}`);
      toast.success("Note deleted successfully");
      setNotes((prevNotes) => prevNotes.filter((n) => n._id !== note._id));
    } catch (error) {
      toast.error("Failed to delete note.");
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]">
      <div className="card-body">
        <Link to={`/note/${note._id}`}>
          <h3 className="card-title text-base-content hover:underline">{note.title}</h3>
        </Link> 
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <Link to={`/note/${note._id}`} className="p-1 hover:bg-base-200 rounded-full">
              <PenSquareIcon className="size-4 cursor-pointer hover:text-primary" />
            </Link>
            <button className="btn btn-ghost btn-xs text-error" onClick={handleDelete}>
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Notecard;
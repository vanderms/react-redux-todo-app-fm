import { useAppDispatch } from "@/services/hooks/app-hooks";
import {
  toggleActive,
  removeTodo,
  setToUpdate,
  Todo,
} from "@/services/features/todo-slice";

import { FiEdit } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

export const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className="min-h-[3.3125rem] w-full border-b border-neutral-200 px-5 
      grid grid-cols-[1.5rem,1fr,3rem] items-center gap-[0.75rem]
      xl:min-h-16 xl:gap-6 py-4 xl:py-5 xl:grid-cols-[1.5rem,1fr,3.5rem]
      [&:hover_.controls]:flex
      "
    >
      <button
        className={`w-6 h-6 rounded-full grid place-items-center hover:[background:var(--gradient)]        
        ${todo.active ? "bg-neutral-200" : " [background:var(--gradient)]"}`}
        aria-label="complete Todo"
        onClick={() => dispatch(toggleActive(todo))}
      >
        {todo.active ? (
          <div className="bg-white rounded-full w-[1.375rem] h-[1.375rem]"></div>
        ) : (
          <img src="/icons/icon-check.svg" alt="" />
        )}
      </button>
      <p
        className={`text-[0.75rem] text-neutral-800 transition-all duration-300 xl:text-[1.125rem]
        ${todo.active ? "" : "line-through opacity-50 "}
     `}
      >
        {todo.content}
      </p>
      <div className="controls w-full justify-between items-center hidden">
        <button
          aria-label="edit"
          onClick={() => {
            dispatch(setToUpdate(todo));
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
        >
          <FiEdit className="w-4 h-4 text-neutral-800 xl:w-5 xl:h-5" />
        </button>
        <button aria-label="delete" onClick={() => dispatch(removeTodo(todo))}>
          <IoClose className="w-5 h-5 text-neutral-800 xl:w-6 xl:h-6" />
        </button>
      </div>
    </div>
  );
};

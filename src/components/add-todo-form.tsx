import { useState, useRef, useEffect } from "react";
import { updateTodos } from "@/services/features/todo-slice";
import { useAppDispatch, useAppSelector } from "@/services/hooks/app-hooks";

export function AddTodoForm() {
  const todo = useAppSelector((state) => state.todo.current);
  const [content, setContent] = useState<string>("");
  const form = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setContent(todo.content);
  }, [todo]);

  return (
    <form
      className="relative z-10 container mt-10 [box-shadow:var(--shadow)] xl:mt-12"
      ref={form}
      onSubmit={(e) => {
        e.preventDefault();
        if (content.length > 0) {
          dispatch(updateTodos({ ...todo, content }));
        }
      }}
    >
      <div
        className="absolute z-20 w-5 h-5 top-[0.875rem] left-5 rounded-full 
        border border-neutral-200"
      ></div>
      <label className="relative z-10">
        <span className="sr-only">Create a new todo...</span>
        <input
          type="text"
          value={content}
          onBlur={() => {
            form.current?.dispatchEvent(
              new CustomEvent("submit", { cancelable: true, bubbles: true })
            );
          }}
          onChange={(e) => setContent(e.currentTarget.value)}
          className="w-full h-12 rounded-md bg-white pl-14 pr-5 text-[0.9375rem] text-neutral-800
            xl:h-16 xl:text-[1.125rem]
          "
          placeholder="Create a new todo..."
        />
      </label>
    </form>
  );
}

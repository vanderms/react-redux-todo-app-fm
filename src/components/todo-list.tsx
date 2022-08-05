import { Reorder } from "framer-motion";
import { useAppSelector } from "@/services/hooks/app-hooks";
import { useAppDispatch } from "@/services/hooks/app-hooks";
import { reorderTodos, clearCompleted } from "@/services/features/todo-slice";
import { TodoItem } from "./todo-item";
import { Todo } from "@/services/features/todo-slice";
import { useState } from "react";

enum Filter {
  all = "All",
  active = "Active",
  completed = "Completed",
}

const filterTodos = {
  [Filter.all]: (todos: Todo[]) => todos,
  [Filter.active]: (todos: Todo[]) => todos.filter((x) => x.active),
  [Filter.completed]: (todos: Todo[]) => todos.filter((x) => !x.active),
};

export function TodoList() {
  const todos = useAppSelector((state) => state.todo.todos);
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<Filter>(Filter.all);

  const setTodos = (todos: any) => dispatch(reorderTodos(todos));

  return (
    <section className="mt-4 bg-white relative z-20 container rounded-md [box-shadow:var(--shadow)]">
      <h2 className="sr-only">Todo List</h2>
      <Reorder.Group axis="y" values={todos} onReorder={setTodos}>
        {filterTodos[filter](todos).map((item) => (
          <Reorder.Item key={item.id} value={item}>
            <TodoItem todo={item} />
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <div className="relative flex justify-between h-[3.125rem] w-full px-5 pt-4 xl:px-6">
        <p
          className="text-[0.75rem] leading-[1] tracking-[-0.166667px]
        text-neutral-500 xl:text-[0.875rem]
        "
        >
          {todos.filter((x) => x.active).length} items left
        </p>
        <div className="absolute left-0 w-full h-12 rounded-md top-[4.125rem] bg-white xl:contents">
          <div
            className="flex h-12  w-full items-center justify-center gap-[1.125rem] xl:w-[10.375rem]
            xl:h-max
          "
          >
            {Object.values(Filter).map((value) => (
              <button
                key={value}
                className={` text-[0.875rem] leading-[1]
                ${filter === value ? "text-primary" : "text-neutral-500"}
              `}
                onClick={() => {
                  setFilter(value);
                }}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <button
          className="h-max text-[0.75rem] leading-[1] tracking-[-0.166667px]
        text-neutral-500 xl:text-[0.875rem]"
          onClick={() => dispatch(clearCompleted())}
        >
          Clear Completed
        </button>
      </div>
    </section>
  );
}

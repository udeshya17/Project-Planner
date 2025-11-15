import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "../tasks/TaskCard";

const COLUMNS = [
  { id: "todo", title: "To-do" },
  { id: "in_progress", title: "In progress" },
  { id: "completed", title: "Complete" },
];

function ProjectPlanner({ tasksByStatus, onStatusChange, onDeleteTask }) {
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const taskId = draggableId;
    const nextStatus = destination.droppableId;
    if (source.droppableId !== nextStatus) {
      onStatusChange(taskId, nextStatus);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid gap-4 md:grid-cols-3">
        {COLUMNS.map((column) => {
          const items = tasksByStatus[column.id] || [];
          return (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex min-h-[260px] flex-col rounded-xl border px-3 pb-3 pt-2 text-xs transition ${
                    snapshot.isDraggingOver
                      ? "border-brand-400/80 bg-brand-50/80 dark:bg-slate-900/80"
                      : "border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50"
                  }`}
                >
                  <header className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                      <span className="font-medium text-slate-900 dark:text-slate-100">
                        {column.title}
                      </span>
                    </div>
                    <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {items.length}
                    </span>
                  </header>
                  <div className="flex-1 space-y-2">
                    {items.map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(dragProvided, dragSnapshot) => (
                          <div
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                            className={`${
                              dragSnapshot.isDragging
                                ? "rotate-[1deg] shadow-lg"
                                : ""
                            }`}
                          >
                            <TaskCard task={task} onDelete={onDeleteTask} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
}

export default ProjectPlanner;

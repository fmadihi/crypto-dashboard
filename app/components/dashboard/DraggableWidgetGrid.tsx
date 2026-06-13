"use client";
import { Widget } from "@/app/types";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useState } from "react";

interface Props {
  widgets: Widget[];
  renderWidget: (widget: Widget) => React.ReactNode;
}

export function DraggableWidgetGrid({ widgets: initial, renderWidget }: Props) {
  const [widgets, setWidgets] = useState(initial);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(widgets);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setWidgets(reordered.map((w, i) => ({ ...w, order: i })));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="widgets" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
            {widgets.map((widget, index) => (
              <Draggable key={widget.id} draggableId={widget.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={snapshot.isDragging ? "opacity-80 shadow-2xl" : ""}
                  >
                    {renderWidget(widget)}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

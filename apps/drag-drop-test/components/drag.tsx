import { DropEffect } from '@drag-drop-test/interfaces';
import { ReactNode, DragEvent } from 'react';

interface DragProps {
  children: ReactNode | ReactNode[];
  dataItem: string;
  dropEffect: DropEffect;
  setDragging: (isDragging: boolean) => void;
}

export const Drag: React.FC<DragProps> = ({
  children,
  dataItem,
  dropEffect,
  setDragging,
}) => {
  const startDrag = (ev: DragEvent<HTMLDivElement>) => {
    ev.dataTransfer.setData('drag-item', dataItem);
    ev.dataTransfer.effectAllowed = dropEffect;
    setDragging(true);
  };

  return (
    <div draggable onDragStart={startDrag} onDragEnd={() => setDragging(false)}>
      {children}
    </div>
  );
};

import { DropEffect } from '@drag-drop-test/interfaces';
import { DragEvent, ReactNode, useState } from 'react';

interface DropTargetProps {
  render: boolean;
  children?: ReactNode | ReactNode[];
  onItemDropped: (droppedItem: string, index: number) => void;
  index: number;
  dropEffect: DropEffect;
}

export const DropTarget: React.FC<DropTargetProps> = ({
  render,
  children,
  onItemDropped: handleItemDropped,
  dropEffect,
  index,
}) => {
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const dragOver = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = dropEffect;
    setIsDraggedOver(true);
  };

  const dragEnter = (ev: DragEvent<HTMLDivElement>) => {
    ev.dataTransfer.dropEffect = dropEffect;
  };

  const drop = (ev: DragEvent<HTMLDivElement>) => {
    const droppedItem = ev.dataTransfer.getData('drag-item');
    if (!droppedItem) return;

    handleItemDropped(droppedItem, index);
  };

  if (!render) return;

  return (
    <div
      onDragOver={dragOver}
      onDragLeave={() => setIsDraggedOver(false)}
      onDragEnter={dragEnter}
      onDrop={drop}
      className={
        isDraggedOver
          ? 'h-12 w-24 border-teal-300 border rounded-md'
          : 'h-4 w-4 rounded-full bg-teal-300'
      }
    >
      {children}
    </div>
  );
};

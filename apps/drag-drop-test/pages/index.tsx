import { DropEffect } from '@drag-drop-test/interfaces';
import React, { useState } from 'react';
import { Drag } from '../components/drag';
import { DropTarget } from '../components/drop-target';
import { v4 as uuidv4 } from 'uuid';

export const Index = () => {
  const [dragItems, setDragItems] = useState([
    'drag-1',
    'drag-2',
    'drag-3',
    'drag-4',
  ]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (item: string, index: number) => {
    const newItems = [
      ...dragItems.slice(0, index + 1),
      item,
      ...dragItems.slice(index + 1),
    ];

    setDragItems(newItems);
  };

  return (
    <main className="bg-slate-50 min-h-screen flex flex-col items-center space-y-6">
      <h1 className="mt-12 text-2xl">Drag and Drop Test</h1>
      <ul className="mt-6 space-y-4 flex flex-col items-center">
        {dragItems.map((item, index) => (
          <React.Fragment key={uuidv4()}>
            <Drag
              setDragging={setIsDragging}
              dropEffect={DropEffect.COPY}
              dataItem={item}
            >
              <li className="px-4 py-2 border-gray-300 rounded-md border">
                {item}
              </li>
            </Drag>
            {index < dragItems.length - 1 && (
              <div className="relative flex flex-col items-center">
                <div className="border-2 h-6 rounded-xl" />
                <DropTarget
                  index={index}
                  render={isDragging}
                  dropEffect={DropEffect.COPY}
                  onItemDropped={handleDrop}
                />
                <div className="border-2 h-6 rounded-xl" />
              </div>
            )}
          </React.Fragment>
        ))}
      </ul>
    </main>
  );
};

export default Index;

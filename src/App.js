import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css'; 

const Types = {
  ITEM: 'item',
};

const ListItem = ({ item, index, moveItem }) => {
  const [, ref] = useDrag({
    type: Types.ITEM,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: Types.ITEM,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className="list-item">
      {item}
    </div>
  );
};


const SortableList = () => {
  const initialItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  const [items, setItems] = useState(initialItems);

  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  return (
    <div className="sortable-list">
      {items.map((item, index) => (
        <ListItem key={index} item={item} index={index} moveItem={moveItem} />
      ))}
    </div>
  );
};

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h1>Sortable List</h1>
        <SortableList />
      </div>
    </DndProvider>
  );
};

export default App;

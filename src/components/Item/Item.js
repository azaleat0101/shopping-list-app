import React, { useState } from 'react';
import './Item.css';

function Item({ item, onToggle, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(item.id);
    }, 300);
  };

  return (
    <div className={`item ${item.completed ? 'completed' : ''} ${isDeleting ? 'deleting' : ''}`}>
      <div className="item-content">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => onToggle(item.id)}
            className="checkbox-input"
          />
          <span className="checkmark"></span>
        </label>
        
        <div className="item-text" onClick={() => onToggle(item.id)}>
          <span className="text">{item.text}</span>
          {/* УБИРАЕМ ПЛАШКУ "КУПЛЕНО" */}
        </div>
      </div>
      
      <button 
        className="delete-button"
        onClick={handleDelete}
        aria-label="Удалить товар"
        title="Удалить товар"
      >
        🗑️
      </button>
    </div>
  );
}

export default Item;
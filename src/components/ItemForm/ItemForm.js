import React, { useState } from 'react';
import './ItemForm.css';

function ItemForm({ onAddItem }) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (inputValue.trim() === '') {
      setError('Введите название товара');
      return;
    }
    
    if (inputValue.length > 100) {
      setError('Название слишком длинное (макс. 100 символов)');
      return;
    }
    
    onAddItem(inputValue);
    setInputValue('');
    setError('');
  };

  return (
    <div className="item-form-container">
      <h2>Добавить новый товар</h2>
      <form onSubmit={handleSubmit} className="item-form">
        <div className="input-wrapper">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (error) setError('');
            }}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
            placeholder="Например: Блёстки..."
            className="form-input"
            maxLength={100}
          />
          <button type="submit" className="add-button">
            <span className="plus-icon">+</span> Добавить
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </form>
      <div className="form-hint">
        Нажмите Enter для быстрого добавления
      </div>
    </div>
  );
}

export default ItemForm;
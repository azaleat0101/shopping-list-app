import React, { useState, useEffect } from 'react';
import Item from './components/Item/Item';
import ItemForm from './components/ItemForm/ItemForm';
import './App.css';

function App() {
  const [items, setItems] = useState([]);

  // ======================
  // СОХРАНЕНИЕ ДАННЫХ
  // ======================
  
  useEffect(() => {
    const savedItems = localStorage.getItem('shoppingList');
    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems);
        if (Array.isArray(parsedItems)) {
          setItems(parsedItems);
        }
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        localStorage.removeItem('shoppingList');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(items));
  }, [items]);

  // ======================
  // ФУНКЦИИ ДЛЯ РАБОТЫ СО СПИСКОМ
  // ======================
  
  const addItem = (text) => {
    const newItem = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    setItems(prevItems => [newItem, ...prevItems]);
  };

  const toggleItem = (id) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // УДАЛЕНИЕ БЕЗ ПОДТВЕРЖДЕНИЯ
  const deleteItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // ОЧИСТКА ЗАВЕРШЕННЫХ БЕЗ ПОДТВЕРЖДЕНИЯ
  const clearCompleted = () => {
    setItems(prevItems => prevItems.filter(item => !item.completed));
  };

  // ======================
  // РАСЧЕТ СТАТИСТИКИ
  // ======================
  
  const totalItems = items.length;
  const completedItems = items.filter(item => item.completed).length;
  const activeItems = totalItems - completedItems;
  const progressPercentage = totalItems > 0 
    ? Math.round((completedItems / totalItems) * 100) 
    : 0;

  return (
    <div className="app">
      <header className="app-header">
        <h1>
          PickMe
        </h1>
        <p className="subtitle">Твой стильный помощник для шопинга</p>
      </header>

      <main className="app-main">
        <div className="container">
          <ItemForm onAddItem={addItem} />

          <div className="stats-card">
            <h2>Статистика</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-value">{totalItems}</div>
                <div className="stat-label">Всего товаров</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{activeItems}</div>
                <div className="stat-label">Осталось купить</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{completedItems}</div>
                <div className="stat-label">Уже куплено</div>
              </div>
            </div>
            
            {totalItems > 0 && (
              <div className="progress-section">
                <div className="progress-header">
                  <span>Прогресс:</span>
                  <span className="progress-percent">{progressPercentage}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <div className="list-section">
            <h2>
              Список покупок 
              <span className="items-count"> ({totalItems})</span>
            </h2>
            
            {items.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🛍️</div>
                <h3>Список покупок пуст</h3>
                <p>Добавьте первый товар с помощью формы выше</p>
              </div>
            ) : (
              <>
                <div className="items-list">
                  {items.map(item => (
                    <Item
                      key={item.id}
                      item={item}
                      onToggle={toggleItem}
                      onDelete={deleteItem}
                    />
                  ))}
                </div>
                
                {completedItems > 0 && (
                  <div className="clear-section">
                    <button 
                      className="clear-button"
                      onClick={clearCompleted}
                    >
                      Очистить купленные товары ({completedItems})
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Данные автоматически сохраняются в вашем браузере</p>
        <p className="footer-hint">Тухватуллина Азалия • ЭФБО-02-24</p>
      </footer>
    </div>
  );
}

export default App;
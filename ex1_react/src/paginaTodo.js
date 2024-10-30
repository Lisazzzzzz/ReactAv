import React, { useState } from 'react';
import './paginaTodo.css'; 

function PaginaTodo() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAddTask = () => {
    if (inputValue.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: inputValue, completed: false, isEditing: false }]);
    setInputValue('');
  };

  const handleToggleEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };

  const handleEditTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText, isEditing: false } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="todo-container">
      <h1 className="title">Todo Matic - Celina Cruz</h1>
      <div className="input-group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Digite uma nova tarefa..."
          className="task-input"
        />
        <button onClick={handleAddTask} className="btn add-btn">
          Adicionar
        </button>
      </div>

      <div className="filter-group">
        <button onClick={() => setFilter('all')} className="btn filter-btn">
          Todos
        </button>
        <button onClick={() => setFilter('active')} className="btn filter-btn">
          Ativos
        </button>
        <button onClick={() => setFilter('completed')} className="btn filter-btn">
          Feitos
        </button>
      </div>

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(task.id)}
              className="checkbox"
            />

            {task.isEditing ? (
              <input
                type="text"
                value={task.text}
                onChange={(e) => handleEditTask(task.id, e.target.value)}
                className="task-edit-input"
                autoFocus
              />
            ) : (
              <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                {task.text}
              </span>
            )}

            <button onClick={() => handleToggleEdit(task.id)} className="btn edit-btn">
              {task.isEditing ? 'Salvar' : 'Editar'}
            </button>
            <button onClick={() => handleDeleteTask(task.id)} className="btn delete-btn">
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PaginaTodo;

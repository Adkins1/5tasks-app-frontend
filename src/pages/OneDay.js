import React, { useState } from 'react';
import '../assets/oneDay.css'; // opcjonalnie można dodać stylizację w osobnym pliku CSS

const OneDay = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: '', completed: false },
    { id: 2, text: '', completed: false },
    { id: 3, text: '', completed: false },
    { id: 4, text: '', completed: false },
    { id: 5, text: '', completed: false }
  ]);

  // Funkcja do obsługi zmiany tekstu zadania
  const handleTextChange = (id, newText) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  // Funkcja do obsługi zmiany statusu (checkbox)
  const handleStatusChange = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div>
      <h2>1 Day</h2>
      <table>
        <thead>
          <tr>
            <th>Zadanie</th>
            <th>Treść</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>
                <input
                  type="text"
                  value={task.text}
                  onChange={(e) => handleTextChange(task.id, e.target.value)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleStatusChange(task.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OneDay;

import React, { useState } from 'react';
import axios from 'axios';
import '../assets/oneDay.css'; // opcjonalnie można dodać stylizację w osobnym pliku CSS

const OneDay = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // data w formacie YYYY-MM-DD
  const [tasks, setTasks] = useState([]);

  // Funkcja do pobierania zadań na podstawie daty
  const fetchTasks = async (selectedDate) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/task/date/${selectedDate}`);
      
      // Sprawdzanie, czy otrzymano dane
      if (response.data.length > 0) {
        const tasksFromDb = response.data[0].tasks; // Zakładamy, że dane przychodzą w postaci tablicy z jednym obiektem
        setTasks(tasksFromDb);
      } else {
        // Jeśli nie ma zadań, wypełnij domyślnymi wartościami
        setTasks([
          { id: 1, text: '', completed: false },
          { id: 2, text: '', completed: false },
          { id: 3, text: '', completed: false },
          { id: 4, text: '', completed: false },
          { id: 5, text: '', completed: false },
        ]);
      }
    } catch (error) {
      console.error('Błąd podczas pobierania zadań:', error);
    }
  };

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

  // Funkcja obsługująca zmianę daty za pomocą inputa typu "date"
  const handleDateChange = (e) => {
    const newDate = e.target.value; // uzywaj wartości jako stringa w formacie YYYY-MM-DD
    setDate(newDate);
    fetchTasks(newDate); // przekazanie sformatowanej daty
  };

  // Funkcja do przesłania danych do DB
  const handleSave = async () => {
    const taskData = {
      tasks: tasks,
      date: date, // użyj daty w formacie YYYY-MM-DD
      userId: null, // lub inny użytkownik, jeśli wprowadzisz logowanie
    };
  
    try {
      await axios.post('http://localhost:3001/api/task', taskData);
      // Dodatkowa logika po zapisie
    } catch (error) {
      console.error('Błąd podczas zapisywania zadań:', error);
    }
  };

  return (
    <div>
      <h1>1 Day</h1>

      {/* Formularz do zmiany daty przy użyciu wbudowanego pola "date" */}
      <div>
        <label htmlFor="date-picker">Wybierz datę:</label>
        <input 
          id="date-picker"
          type="date" 
          value={date} 
          onChange={handleDateChange} 
        />
      </div>
      
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
                  value={task.text || ''}
                  onChange={(e) => handleTextChange(task.id, e.target.value)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={task.completed || false}
                  onChange={() => handleStatusChange(task.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSave}>Zapisz</button>
    </div>
  );
};

export default OneDay;

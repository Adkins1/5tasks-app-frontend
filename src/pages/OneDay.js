import React, { useState } from 'react';
import axios from 'axios';
import '../assets/oneDay.css'; // opcjonalnie można dodać stylizację w osobnym pliku CSS

const OneDay = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const protocol = process.env.REACT_APP_PROTOCOL;

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // data w formacie YYYY-MM-DD
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState(null); // Zmienna do przechowywania ID zadania, jeśli istnieje

  const fetchTasks = async (selectedDate) => {
    try {
      const response = await axios.get(`${protocol}://${apiUrl}/task/date/${selectedDate}`);
      if (response.data.length > 0) {
        const dbtasks = response.data[0].tasks
        const dbdata = response.data[0]
        setTasks(dbtasks)
        setTaskId(dbdata.id)
        console.log(dbdata.id)
      } else {
        setTasks([
          { id: 1, text: '', completed: false },
          { id: 2, text: '', completed: false },
          { id: 3, text: '', completed: false },
          { id: 4, text: '', completed: false },
          { id: 5, text: '', completed: false }, 
        ]);
        setTaskId(null);
      }
    } catch (error) {
      console.error('Błąd podczas pobierania zadań:', error);
    }
  };

  const handleTextChange = (id, newText) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  const handleStatusChange = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    fetchTasks(newDate); 
  };

  const handleSave = async () => {
    const taskData = {
      tasks: tasks,
      date: date,
      userId: null, // TODO userId do podmiany
    };
  
    try {
      if (taskId) {
        // Jeśli istnieje ID, zaktualizuj istniejący rekord
        await axios.put(`${protocol}://${apiUrl}/task/${taskId}`, taskData);
      } else {
        // Jeśli nie istnieje ID, utwórz nowy rekord
        console.log(`${protocol}://${apiUrl}/task`)
        await axios.post(`${protocol}://${apiUrl}/task`, taskData);
      }
      console.log('Zadania zapisane pomyślnie');
    } catch (error) {
      console.error('Błąd podczas zapisywania zadań:', error);
    }
  };

  return (
    <div>
      <h1>1 Day</h1>
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

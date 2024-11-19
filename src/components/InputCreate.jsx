import { useState } from "react";

const InputCreate = () => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState('');
  
  const urlApi = 'http://localhost:3000/create';
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (title.trim() === '') {
      setError('Introduce una tarea');
      return;
    }
    
    try {
      const response = await fetch(urlApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error');
      }
      
      const tarea = await response.json();
      setNewTask(tarea.title);
      setTitle('');
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="añade una tarea" value={title} onChange={e => setTitle(e.target.value)} />
        <button type="submit">Añadir</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Se ha enviado la tarea: {newTask}</p>
    </>  
  );
};

export default InputCreate;


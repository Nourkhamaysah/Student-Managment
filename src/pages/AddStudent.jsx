import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddStudent() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isNameValid = (value) => /^[A-Za-z\s]+$/.test(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isNameValid(name)) {
      setError('Name should contain only letters and spaces.');
      return;
    }
    if (!grade) {
      setError('Please select a grade.');
      return;
    }
    setError('');
    alert('Student added (static only)');
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>Add New Student</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
        required
      />
      <select
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        required
      >
        <option value="">Select Grade</option>
        <option value="A+">A+</option>
        <option value="A">A</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="C+">C+</option>
        <option value="C">C</option>
        <option value="F">F</option>
      </select>
      <button type="submit">Add Student</button>
    </form>
  );
}

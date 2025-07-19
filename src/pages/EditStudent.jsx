import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import studentsData from '../data/students';

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const student = studentsData.find((s) => s.id === id);
    if (student) {
      setName(student.name);
      setAge(student.age);
      setGrade(student.grade);
    }
  }, [id]);

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
    alert('Changes saved (static only)');
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>Edit Student</h1>
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
      <button type="submit">Save Changes</button>
    </form>
  );
}

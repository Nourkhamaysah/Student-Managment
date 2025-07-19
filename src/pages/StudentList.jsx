import { useState } from 'react';
import { Link } from 'react-router-dom';
import studentsData from '../data/students';
import './StudentList.css';

export default function StudentList() {
  const [students, setStudents] = useState(studentsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const perPage = 5;

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const gradeOrder = {
    'A+': 1,
    'A': 2,
    'B+': 3,
    'B': 4,
    'C+': 5,
    'C': 6,
    'F': 7
  };

  const sortedStudents = [...filtered].sort((a, b) => {
    if (sortBy === "grade") {
      return sortOrder === "asc"
        ? gradeOrder[a.grade] - gradeOrder[b.grade]
        : gradeOrder[b.grade] - gradeOrder[a.grade];
    }

    if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedStudents.length / perPage);
  const slice = sortedStudents.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handleDelete = (id) => {
    // حذف محلي فقط (لأن البيانات ثابتة)
    setStudents(students.filter(s => s.id !== id));
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return "⬍";
    return sortOrder === "asc" ? "⬆️" : "⬇️";
  };

  const gradeColor = (grade) => {
    if (grade.startsWith('A')) return 'badge-green';
    if (grade.startsWith('B')) return 'badge-yellow';
    if (grade.startsWith('C')) return 'badge-orange';
    return 'badge-red';
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <Link to="/" className="btn-home">Home</Link>
        <Link to="/add" className="btn-add">Add Student</Link>
      </div>

      <h1>Student Management</h1>
      <input
        className="search-input"
        placeholder="Search by name or grade…"
        value={searchTerm}
        onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
      />

      <table className="students-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>
              Name <span className="sort-icon">{getSortIcon("name")}</span>
            </th>
            <th onClick={() => handleSort("age")}>
              Age <span className="sort-icon">{getSortIcon("age")}</span>
            </th>
            <th onClick={() => handleSort("grade")}>
              Grade <span className="sort-icon">{getSortIcon("grade")}</span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {slice.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.age}</td>
              <td>
                <span className={`badge ${gradeColor(s.grade)}`}>
                  {s.grade}
                </span>
              </td>
              <td className="actions">
                <Link to={`/edit/${s.id}`} className="icon edit">✏️</Link>
                <button onClick={() => handleDelete(s.id)} className="icon del">🗑️</button>
              </td>
            </tr>
          ))}
          {slice.length === 0 && (
            <tr><td colSpan="4" style={{ textAlign: 'center' }}>No students found.</td></tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Previous</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={currentPage === i + 1 ? 'active' : ''}
            onClick={() => setCurrentPage(i + 1)}
          >{i + 1}</button>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}

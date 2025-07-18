import { Routes, Route, Link } from "react-router-dom";
import StudentList from "./pages/StudentList";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";

function App() {
  return (
    <>
      <div className="navbar">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/add" className="nav-button">Add Student</Link>
      </div>

      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/edit/:id" element={<EditStudent />} />
      </Routes>
    </>
  );
}

export default App;


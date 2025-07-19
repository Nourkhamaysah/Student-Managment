import { Route, Routes } from "react-router-dom";
import StudentList from "./pages/StudentList";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <h1 className="text-center text-3xl font-bold p-6">Student Management System</h1>
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/edit/:id" element={<EditStudent />} />
      </Routes>
    </div>
  );
};

export default App;

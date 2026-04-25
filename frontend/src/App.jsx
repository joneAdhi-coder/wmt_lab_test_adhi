import { useState, useEffect } from "react";
import { getStudents, createStudent, deleteStudent } from "./api";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    course: "",
    status: "Active",
  });

  // 🔹 Fetch students
  const fetchStudents = async () => {
    try {
      const res = await getStudents();
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Add student
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createStudent(formData);

      // reset form
      setFormData({
        name: "",
        age: "",
        email: "",
        course: "",
        status: "Active",
      });

      fetchStudents();
    } catch (err) {
      console.error("Error creating student:", err);
    }
  };

  // 🔹 Delete student
  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      fetchStudents();
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  return (
    <div className="container">
      <h1>Student Manager</h1>

      {/* 🔹 Form */}
      <div className="form-section">
        <h2>Add New Student</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="course"
            placeholder="Course"
            value={formData.course}
            onChange={handleChange}
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button type="submit">Add Student</button>
        </form>
      </div>

      {/* 🔹 List */}
      <div className="list-section">
        <h2>Students List</h2>

        {(!Array.isArray(students) || students.length === 0) ? (
          <p>No students found.</p>
        ) : (
          <ul>
            {students.map((student) => (
              <li key={student._id}>
                <h3>{student.name}</h3>
                <p>Age: {student.age}</p>
                <p>Email: {student.email}</p>
                <p>Course: {student.course}</p>
                <p>Status: {student.status}</p>

                <button onClick={() => handleDelete(student._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;

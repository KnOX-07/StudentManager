import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import StudentFormModal from "../components/StudentFormModal";

const StudentsPage = () => {
    const [students, setStudents] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [viewStudent, setViewStudent] = useState(null);
    const [editStudent, setEditStudent] = useState(null);

    const fetchStudents = async () => {
        const studentsCollection = collection(db, "students");
        const studentsSnapshot = await getDocs(studentsCollection);
        setStudents(studentsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "students", id));
        fetchStudents();
    };

    const handleEditSave = async (id, updatedData) => {
        await updateDoc(doc(db, "students", id), updatedData);
        alert("Student details updated successfully!");
        setEditStudent(null);
        fetchStudents();
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div className="students-page">
            <button onClick={() => setShowAddModal(true)}>Add Student</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Class</th>
                        <th>Section</th>
                        <th>Roll Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.class}</td>
                            <td>{student.section}</td>
                            <td>{student.rollNumber}</td>
                            <td>
                                <button onClick={() => setViewStudent(student)}>View</button>
                                <button className="edit" onClick={() => setEditStudent(student)}>Edit</button>
                                <button className="delete" onClick={() => handleDelete(student.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showAddModal && (
                <StudentFormModal
                    onClose={() => setShowAddModal(false)}
                    onAdd={fetchStudents}
                />
            )}

            {viewStudent && (
                <div className="modal">
                    <h2>Student Details</h2>
                    <p><strong>ID:</strong> {viewStudent.id}</p>
                    <p><strong>Name:</strong> {viewStudent.name}</p>
                    <p><strong>Class:</strong> {viewStudent.class}</p>
                    <p><strong>Section:</strong> {viewStudent.section}</p>
                    <p><strong>Roll Number:</strong> {viewStudent.rollNumber}</p>
                    <p><strong>Date of Birth:</strong> {viewStudent.dateOfBirth}</p>
                    <p><strong>Gender:</strong> {viewStudent.gender}</p>
                    <p><strong>Address:</strong> {viewStudent.address}</p>
                    <p><strong>Parent Name:</strong> {viewStudent.parentName}</p>
                    <p><strong>Contact Number:</strong> {viewStudent.contactNumber}</p>
                    <p><strong>Email ID:</strong> {viewStudent.emailId}</p>
                    <p><strong>Active:</strong> {viewStudent.isActive ? "Yes" : "No"}</p>
                    <p><strong>Admission Date:</strong> {viewStudent.admissionDate}</p>
                    <button onClick={() => setViewStudent(null)}>Close</button>
                </div>
            )}

            {editStudent && (
                <div className="modal">
                    <h2>Edit Student Details</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const updatedData = {
                                name: e.target.name.value,
                                class: e.target.class.value,
                                section: e.target.section.value,
                                rollNumber: e.target.rollNumber.value,
                            };
                            handleEditSave(editStudent.id, updatedData);
                        }}
                    >
                        <label>
                            Name:
                            <input
                                name="name"
                                defaultValue={editStudent.name}
                                required
                            />
                        </label>
                        <label>
                            Class:
                            <input
                                name="class"
                                defaultValue={editStudent.class}
                                required
                            />
                        </label>
                        <label>
                            Section:
                            <input
                                name="section"
                                defaultValue={editStudent.section}
                                required
                            />
                        </label>
                        <label>
                            Roll Number:
                            <input
                                name="rollNumber"
                                type="number"
                                defaultValue={editStudent.rollNumber}
                                required
                            />
                        </label><br></br>
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setEditStudent(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default StudentsPage;
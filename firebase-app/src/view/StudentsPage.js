import React, { useState, useEffect } from "react";
import { db } from "../model/firebaseConfig";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import StudentFormModal from "./StudentFormModal";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const StudentsPage = () => {
    const [students, setStudents] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [viewStudent, setViewStudent] = useState(null);
    const [editStudent, setEditStudent] = useState(null);
    const [deleteStudentId, setDeleteStudentId] = useState(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInput, setPageInput] = useState(currentPage);

    const fetchStudents = async () => {
        const studentsCollection = collection(db, "students");
        const studentsSnapshot = await getDocs(studentsCollection);
        setStudents(studentsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const itemsPerPage = 4;

    // Slice students based on current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    useEffect(() => {
        setPageInput(currentPage);
    }, [currentPage]);

    const handlePageChange = (e) => {
        setPageInput(e.target.value);
    };

    const handlePageBlur = () => {
        const page = Number(pageInput);
        if (page >= 1 && page <= totalPages) {
            goToPage(page);
        } else {
            setPageInput(currentPage);
        }
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

    const genders = [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Other", value: "Other" },
    ];

    useEffect(() => {
        if (deleteStudentId) {
            setTimeout(() => setIsFlipped(true), 50);
        } else {
            setIsFlipped(false);
        }
    }, [deleteStudentId]);

    const closeModal = () => {
        setIsFlipped(false);
        setTimeout(() => setDeleteStudentId(null), 400);
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div className="students-page">
            <div className="top-bar">
                <div className="search-wrapper">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="search-icon"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                        />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search student..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className="add-btn">
                    <button onClick={() => setShowAddModal(true)}>+ Add Student</button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Class</th>
                        <th>Section</th>
                        <th>Roll Number</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currentStudents.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.class}</td>
                            <td>{student.section}</td>
                            <td>{student.rollNumber}</td>
                            <td className="action-buttons">
                                <button onClick={() => setViewStudent(student)}>View</button>
                                <button className="edit" onClick={() => setEditStudent(student)}>Edit</button>
                                <button className="delete" onClick={() => setDeleteStudentId(student.id)}>Delete</button>
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
                    <div className="modal-content">
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
                        <form>
                            <button onClick={() => setViewStudent(null)}>Close</button>
                        </form>
                    </div>
                </div>
            )}

            {editStudent && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit Student Details</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const updatedData = {
                                    name: e.target.name.value,
                                    class: e.target.class.value,
                                    section: e.target.section.value,
                                    rollNumber: e.target.rollNumber.value,
                                    dateOfBirth: e.target.dateOfBirth.value,
                                    gender: e.target.gender.value,
                                    address: e.target.address.value,
                                    parentName: e.target.parentName.value,
                                    contactNumber: e.target.contactNumber.value,
                                    emailId: e.target.emailId.value,
                                    isActive: e.target.isActive.checked,
                                    admissionDate: e.target.admissionDate.value,
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
                            </label>
                            <label>
                                Date of Birth:
                                <input
                                    name="dateOfBirth"
                                    type="string"
                                    defaultValue={editStudent.dateOfBirth}
                                    required
                                />
                            </label>
                            <label>
                                Gender:<br></br>
                                <Dropdown
                                    name="gender"
                                    value={editStudent.gender}
                                    options={genders}
                                    onChange={(e) => (editStudent.gender = e.value)}
                                    placeholder="Select Gender"
                                    appendTo="self"
                                    required
                                />
                            </label>
                            <label>
                                Address:
                                <input name="address" defaultValue={editStudent.address} required />
                            </label>
                            <label>
                                Parent Name:
                                <input name="parentName" defaultValue={editStudent.parentName} required />
                            </label>
                            <label>
                                Contact Number:
                                <input
                                    name="contactNumber"
                                    type="string"
                                    defaultValue={editStudent.contactNumber}
                                    required
                                />
                            </label>
                            <label>
                                Email ID:
                                <input
                                    name="emailId"
                                    type="email"
                                    defaultValue={editStudent.emailId}
                                    required
                                />
                            </label>
                            <label>
                                Active:
                                <input
                                    name="isActive"
                                    type="checkbox"
                                    defaultChecked={editStudent.isActive}
                                    required
                                />
                            </label>
                            <label>
                                Admission Date:
                                <input
                                    name="admissionDate"
                                    type="string"
                                    defaultValue={editStudent.admissionDate}
                                />
                            </label><br></br>
                            <div className="form-buttons">
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setEditStudent(null)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {deleteStudentId && (
                <div className="delete-overlay">
                    <div className={`delete-modal ${isFlipped ? "is-flipped" : ""}`}>
                        <div className="modal-front">
                            <h4>Are you sure you want to do that?</h4>
                            <div style={{ marginTop: "20px" }}>
                                <div className="button-row">
                                    <button
                                        className="yes"
                                        onClick={async () => {
                                            await handleDelete(deleteStudentId);
                                            closeModal();
                                        }}
                                    >
                                        Yes
                                    </button>
                                    <button className="no" onClick={closeModal}>
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="pagination-wrapper">
                <div className="pagination">
                    <button onClick={() => goToPage(1)} disabled={currentPage === 1}>«</button>
                    <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>‹</button>
                    <div className="page-input">
                        <label className="page-label">Page</label>
                        <div className="page-controls">
                            <input
                                type="number"
                                min="1"
                                max={totalPages}
                                value={pageInput}
                                onChange={handlePageChange}
                                onBlur={handlePageBlur}
                            />
                            <span>of {totalPages}</span>
                        </div>
                    </div>
                    <div className="page-buttons">
                        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>›</button>
                        <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages}>»</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentsPage;
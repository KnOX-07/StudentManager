import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

const StudentFormModal = ({ onClose, onAdd }) => {
    const [studentData, setStudentData] = useState({
        name: "",
        class: "",
        section: "",
        rollNumber: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        parentName: "",
        contactNumber: "",
        emailId: "",
        isActive: false,
        admissionDate: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setStudentData({
            ...studentData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const validateForm = () => {
        const { name, class: studentClass, rollNumber, emailId, contactNumber } = studentData;

        if (!name || !studentClass || !rollNumber || !emailId || !contactNumber) {
            alert("Please fill in all required fields.");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailId)) {
            alert("Please enter a valid email address.");
            return false;
        }

        const contactRegex = /^[0-9]{10}$/;
        if (!contactRegex.test(contactNumber)) {
            alert("Please enter a valid 10-digit contact number.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            await addDoc(collection(db, "students"), studentData);
            alert("Student added successfully!");
            onAdd();
            onClose();
        } catch (error) {
            console.error("Error adding student: ", error);
            alert("Failed to add student! Please try again.");
        }
    };

    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <h2>Add Student Details</h2>
                <input
                    name="name"
                    placeholder="Name"
                    value={studentData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    name="class"
                    placeholder="Class"
                    value={studentData.class}
                    onChange={handleChange}
                    required
                />
                <input
                    name="section"
                    placeholder="Section"
                    value={studentData.section}
                    onChange={handleChange}
                    required
                />
                <input
                    name="rollNumber"
                    type="number"
                    placeholder="Roll Number"
                    value={studentData.rollNumber}
                    onChange={handleChange}
                    required
                />
                <input
                    name="dateOfBirth"
                    type="string"
                    placeholder="DoB"
                    value={studentData.dateOfBirth}
                    onChange={handleChange}
                    required
                />
                <select
                    name="gender"
                    value={studentData.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <input
                    name="address"
                    placeholder="Address"
                    value={studentData.address}
                    onChange={handleChange}
                    required
                />
                <input
                    name="parentName"
                    placeholder="Parent Name"
                    value={studentData.parentName}
                    onChange={handleChange}
                    required
                />
                <input
                    name="contactNumber"
                    type="string"
                    placeholder="Contact Number"
                    value={studentData.contactNumber}
                    onChange={handleChange}
                    required
                />
                <input
                    name="emailId"
                    type="string"
                    placeholder="Email ID"
                    value={studentData.emailId}
                    onChange={handleChange}
                    required
                />
                <label>
                    Active:
                    <input
                        name="isActive"
                        type="checkbox"
                        checked={studentData.isActive}
                        onChange={handleChange}
                    />
                </label>
                <input
                    name="admissionDate"
                    type="string"
                    placeholder="Admission Date"
                    value={studentData.admissionDate}
                    onChange={handleChange}
                    required
                />
                <div className="form-buttons">
                    <button type="submit">Submit</button>
                    <button type="button" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StudentFormModal;
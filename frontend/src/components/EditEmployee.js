import React, { useState } from 'react';
import axios from 'axios';

const EditEmployee = ({ employee, navigateTo }) => {
    const [name, setName] = useState(employee.name);
    const [department, setDepartment] = useState(employee.department);
    const [position, setPosition] = useState(employee.position);
    const [salary, setSalary] = useState(employee.salary);

    const handleUpdateEmployee = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:5000/api/employees/${employee._id}`,
                { name, department, position, salary },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            alert('Employee updated successfully!');
            navigateTo('employeeList');
        } catch (err) {
            alert('Error updating employee.');
        }
    };

    return (
        <div>
            <h2>Edit Employee</h2>
            <form onSubmit={handleUpdateEmployee}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} required />
                <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
                <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} required />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditEmployee;

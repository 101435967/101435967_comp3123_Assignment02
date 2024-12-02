import React, { useState } from 'react';
import axios from 'axios';

const AddEmployee = ({ navigateTo }) => {
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState('');

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                'http://localhost:5000/api/employees',
                { name, department, position, salary },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            alert('Employee added successfully!');
            navigateTo('employeeList');
        } catch (err) {
            alert('Error adding employee.');
        }
    };

    return (
        <div>
            <h2>Add Employee</h2>
            <form onSubmit={handleAddEmployee}>
                <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
                <input type="text" placeholder="Department" onChange={(e) => setDepartment(e.target.value)} required />
                <input type="text" placeholder="Position" onChange={(e) => setPosition(e.target.value)} required />
                <input type="number" placeholder="Salary" onChange={(e) => setSalary(e.target.value)} required />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddEmployee;

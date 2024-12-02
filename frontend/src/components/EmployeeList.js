import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeList = ({ navigateTo }) => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/employees', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setEmployees(res.data);
            } catch (err) {
                console.error(err);
                alert('Failed to fetch employees.');
            }
        };
        fetchEmployees();
    }, []);

    return (
        <div>
            <h2>Employee List</h2>
            <button onClick={() => navigateTo('addEmployee')}>Add Employee</button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp._id}>
                            <td>{emp.name}</td>
                            <td>{emp.department}</td>
                            <td>{emp.position}</td>
                            <td>
                                <button onClick={() => navigateTo('editEmployee', emp)}>Edit</button>
                                <button onClick={() => axios.delete(`http://localhost:5000/api/employees/${emp._id}`)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;

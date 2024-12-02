import React, { useState } from 'react';
import axios from 'axios';

const SearchEmployee = ({ navigateTo }) => {
    const [searchField, setSearchField] = useState('department'); // Default search by department
    const [searchValue, setSearchValue] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`http://localhost:5000/api/employees/search`, {
                params: { [searchField]: searchValue },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setResults(res.data);
        } catch (err) {
            alert('Error fetching search results. Please try again.');
        }
    };

    return (
        <div>
            <h2>Search Employees</h2>
            <form onSubmit={handleSearch}>
                <label>
                    Search By:
                    <select value={searchField} onChange={(e) => setSearchField(e.target.value)}>
                        <option value="department">Department</option>
                        <option value="position">Position</option>
                    </select>
                </label>
                <input
                    type="text"
                    placeholder={`Enter ${searchField}`}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    required
                />
                <button type="submit">Search</button>
            </form>

            {results.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Position</th>
                            <th>Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((emp) => (
                            <tr key={emp._id}>
                                <td>{emp.name}</td>
                                <td>{emp.department}</td>
                                <td>{emp.position}</td>
                                <td>{emp.salary}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {results.length === 0 && <p>No results found.</p>}

            <button onClick={() => navigateTo('employeeList')}>Back to Employee List</button>
        </div>
    );
};

export default SearchEmployee;

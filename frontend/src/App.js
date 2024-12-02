import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import SearchEmployee from './components/SearchEmployee';

const App = () => {
    const [currentScreen, setCurrentScreen] = useState('login');
    const [employee, setEmployee] = useState(null);

    const navigateTo = (screen, data) => {
        setCurrentScreen(screen);
        setEmployee(data || null);
    };

    return (
        <div>
            {currentScreen === 'login' && <Login navigateTo={navigateTo} />}
            {currentScreen === 'signup' && <Signup navigateTo={navigateTo} />}
            {currentScreen === 'employeeList' && <EmployeeList navigateTo={navigateTo} />}
            {currentScreen === 'addEmployee' && <AddEmployee navigateTo={navigateTo} />}
            {currentScreen === 'editEmployee' && <EditEmployee navigateTo={navigateTo} employee={employee} />}
            {currentScreen === 'searchEmployee' && <SearchEmployee navigateTo={navigateTo} />}
        </div>
    );
};

export default App;

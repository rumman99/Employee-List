import { useEffect, useState } from 'react';
import './App.css'
import AddEmployee from './components/AddEmployee/AddEmployee'
import EmployeeList from './components/EmployeeList/EmployeeList'
// import {uuid} from 'uuidv4';
import { v4 as uuidv4 } from 'uuid';
import { Route, Routes } from 'react-router-dom';
import EmployeeDetails from './components/EmployeeDetails/EmployeeDetails';

function App() {
  const [allEmployee, setAllEmployee]= useState([]);

// Submit Button Handler //
  const submitHandler=(values)=>{
    // const previousData= [...allEmployee];
    setAllEmployee([...allEmployee, {id: uuidv4(), ...values}]);
  }

// Delete Button Handler //
  const deleteHandler=(id)=>{
    const exceptDeleteItem= allEmployee.filter(item => item.id !== id);
    setAllEmployee(exceptDeleteItem);
    alert('DELETED SUCCESSFULLY')
  }

// SetItem and GetItem to LocalStorage //
  useEffect(()=>{
    const getLocalStorage= JSON.parse(localStorage.getItem('employee'));
    if (getLocalStorage && getLocalStorage.length > 0){
        setAllEmployee(getLocalStorage);
    }
}, [])

  useEffect(()=>{
      localStorage.setItem('employee', JSON.stringify(allEmployee));
  }, [allEmployee])


  return (
    <>
      <Routes>
        <Route path='/' element={<EmployeeList allEmployee={allEmployee} deleteHandler={deleteHandler} />}/>
        <Route path='add-employee' element={<AddEmployee allEmployee={allEmployee} setAllEmployee={setAllEmployee} submitHandler={submitHandler} />}/>
        <Route path='/employee/:id' element={<EmployeeDetails deleteHandler={deleteHandler}/>} />
      </Routes>
    </>
  )
}

export default App

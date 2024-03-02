import { useEffect, useState } from 'react';
import './App.css'
import AddEmployee from './components/AddEmployee/AddEmployee'
import EmployeeList from './components/EmployeeList/EmployeeList'
// import {uuid} from 'uuidv4';
import { v4 as uuidv4 } from 'uuid';

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
      <AddEmployee allEmployee={allEmployee} setAllEmployee={setAllEmployee} submitHandler={submitHandler}/>
      <EmployeeList allEmployee={allEmployee} deleteHandler={deleteHandler}/>
    </>
  )
}

export default App

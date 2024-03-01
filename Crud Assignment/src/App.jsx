import { useEffect, useState } from 'react';
import './App.css'
import AddEmployee from './components/AddEmployee/AddEmployee'
import EmployeeList from './components/EmployeeList/EmployeeList'

function App() {
  const [allEmployee, setAllEmployee]= useState([]);

  const submitHandler=(values)=>{
    // const previousData= [...allEmployee];
    setAllEmployee([...allEmployee, values]);

  }

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
      <EmployeeList allEmployee={allEmployee}/>
    </>
  )
}

export default App

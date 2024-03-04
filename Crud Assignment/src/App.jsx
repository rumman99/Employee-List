import { useEffect, useState } from 'react';
import './App.css'
import AddEmployee from './components/AddEmployee/AddEmployee'
import EmployeeList from './components/EmployeeList/EmployeeList'
import { v4 as uuidv4 } from 'uuid';
import { Route, Routes } from 'react-router-dom';
import EmployeeDetails from './components/EmployeeDetails/EmployeeDetails';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import UpdateEmployee from './components/UpdateEmployee/UpdateEmployee';

function App() {
  const [allEmployee, setAllEmployee]= useState([]);

// Submit Button Handler //
  const submitHandler=(values)=>{
    // Post Data to Json-Server Database //
    const fetching= (async ()=>{
      try{
        const response = await axios.post('https://employee-list-production.up.railway.app/employee', {id: uuidv4(), ...values})
        setAllEmployee([...allEmployee, response.data]);
          // Alert Style
          toast.success("Added Successfully",{position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,});
      }
      catch(err){
        console.log(err);
      }
    })() /* Self Invoke Function IIFE*/
  };

// Delete Button Handler //
  const deleteHandler=(id)=>{
    axios.delete(`https://employee-list-production.up.railway.app/employee/${id}`)
    const exceptDeleteItem= allEmployee.filter(item => item.id !== id);
    setAllEmployee(exceptDeleteItem);
      // Alert Style
      toast.success("Deleted Successfully",{position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,});
  }

// Update Handler //
const updateHandler =(employee)=>{
  const fetching = (async()=>{
    try{
      const response = await axios.patch(`https://employee-list-production.up.railway.app/employee/${employee.id}`, employee)
      const updatingEmployee= allEmployee.map(updateEmployee => (updateEmployee.id === response.data.id) ? response.data : updateEmployee)
      setAllEmployee(updatingEmployee);
      // Alert Style
      toast.info("Update Successfully",{position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,});
    }
    catch(err){
      console.log(err);
    }
  })()
}

// Get Data from Json-Server Database //
  useEffect(()=>{
    const fetching = (async()=>{
      try{
        const response = await axios.get('https://employee-list-production.up.railway.app/employee');
          setAllEmployee(response.data);
      }
      catch(err){
        console.log(err);
      }
    })() /* Self Invoke Function IIFE*/
}, [])


  return (
    <>
      <Routes>
        <Route path='/' element={<EmployeeList allEmployee={allEmployee} deleteHandler={deleteHandler} />}/>
        <Route path='add-employee' element={<AddEmployee allEmployee={allEmployee} setAllEmployee={setAllEmployee} submitHandler={submitHandler} />}/>
        <Route path='/employee/:id' element={<EmployeeDetails deleteHandler={deleteHandler}/>} />
        <Route path='/update/:id' element={<UpdateEmployee updateHandler={updateHandler}/>} />
      </Routes>
    </>
  )
}

export default App

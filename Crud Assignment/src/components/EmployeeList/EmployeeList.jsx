import React from 'react';
import EmployeeCard from '../EmployeeCard/EmployeeCard';

const EmployeeList = ({allEmployee, deleteHandler}) => {


    return (
        <div>
            <EmployeeCard allEmployee={allEmployee} deleteHandler={deleteHandler}/>
        </div>
    );
};

export default EmployeeList;
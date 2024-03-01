import React from 'react';
import EmployeeCard from '../EmployeeCard/EmployeeCard';

const EmployeeList = ({allEmployee}) => {


    return (
        <div>
            <EmployeeCard allEmployee={allEmployee}/>
        </div>
    );
};

export default EmployeeList;
import React from 'react';
import EmployeeCard from '../EmployeeCard/EmployeeCard';
import { Button } from 'antd';
import { UsergroupAddOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const EmployeeList = ({allEmployee, deleteHandler}) => {
    const style= {
        marginBottom:"60px"
    }

    return (
        <div>
            <Link to='/add-employee' ><Button style={style} type="primary" size='large' icon={<UsergroupAddOutlined />}>Add Employee <ArrowRightOutlined /></Button></Link>
            <h2>All Employee List</h2>
            <EmployeeCard allEmployee={allEmployee} deleteHandler={deleteHandler}/>
        </div>
    );
};

export default EmployeeList;
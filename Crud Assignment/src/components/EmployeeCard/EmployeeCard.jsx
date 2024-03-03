import React, { useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { MdBlock } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
import { CgUnblock } from "react-icons/cg";
import "./employeeCard.css"
import { Link } from 'react-router-dom';
import { Modal } from 'antd';

const EmployeeCard = ({allEmployee, deleteHandler}) => {
    const [block, setBlock]= useState({}); // Block/Unblock State

// Delete Confirmation Modal //
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = (id) => {
        deleteHandler(id);
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

// Handle Block Unblock Toggle
const handleBlock = (id) => {
    setBlock(state => ({
        ...state,
        [id]: !state[id] // Toggle block state for specific employee id
    }));
};

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Serial</th>
                    <th scope="col">Name</th>
                    <th className='iconHead' scope="col">DETAILS</th>
                    <th className='iconHead' scope="col">DELETE</th>
                    <th className='iconHead' scope="col">BLOCK/UNBLOCK</th>
                    </tr>
                </thead>
                <tbody>
                {allEmployee && allEmployee.map((employee, index) => (
                    
                    <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{employee.firstName+' '+employee.lastName}</td>
                    <td className='detailsIcon'> 
                        <Link to={`/employee/${employee.id}`} state={employee}> <i><BiSolidDetail /></i> </Link>
                    </td>
                    <td className='deleteIcon'><i onClick={showModal}><MdDeleteForever /></i></td>
                    <Modal title="Delete Confirmation" open={isModalOpen} onOk={()=>handleOk(employee.id)} onCancel={handleCancel}>
                        <p style={{color:'red'}}>Do You Really Want To Delete This Employee Data?</p>
                    </Modal>
                    <td className='blockIcon'> <i onClick={()=>handleBlock(employee.id)}> {block[employee.id] ? <p>UnBlock <CgUnblock /></p> : <p>Block <MdBlock /></p>}</i></td>
                    </tr>

                ))}
                </tbody>
                </table>
        </div>
    );
};

export default EmployeeCard;
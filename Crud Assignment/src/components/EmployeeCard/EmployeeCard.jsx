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
    const [deleteId, setDeleteId] = useState(null);

// Delete Confirmation Modal //
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = (id) => {
        setIsModalOpen(true);
        setDeleteId(id);
    };
    const handleOk = () => {
        if (deleteId) {
            deleteHandler(deleteId);
            setIsModalOpen(false);
            setDeleteId(null);
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setDeleteId(null);
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
            {allEmployee.map((employee, index) => (

                    <div key={index} className='table'>
                        <div className='table-row'>
                        <div className='info'>
                            <div className="row">{index+1}.</div>
                            <div className="row">{employee.firstName+' '+employee.lastName}</div>
                        </div>
                        
                        <div className='icons-container'>
                            <div className='icons'>
                            <div className='detailsIcon'> 
                                <Link to={`/employee/${employee.id}`} state={employee}> <i><BiSolidDetail /></i> </Link>
                            </div>
                            <div className='deleteIcon'><i onClick={()=>showModal(employee.id)}><MdDeleteForever /></i></div>
                            <Modal title="Delete Confirmation" open={isModalOpen} onOk={()=>handleOk(employee.id)} onCancel={handleCancel}>
                                <p style={{color:'red'}}>Do You Really Want To Delete This Employee Data?</p>
                            </Modal>
                            <div className='blockIcon'> <i onClick={()=>handleBlock(employee.id)}> {block[employee.id] ? <span>UnBlock <CgUnblock /></span> : <span>Block <MdBlock /></span>}</i></div>
                            </div>
                        </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default EmployeeCard;
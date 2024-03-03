import React, { useState } from 'react';
import { MdBlock } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { EditOutlined, RollbackOutlined } from '@ant-design/icons';
import { CgUnblock } from "react-icons/cg";
import { Button, Modal } from 'antd';


const EmployeeDetails = ({deleteHandler}) => {
    const [block, setBlock]= useState(false);
    const employeeDetails= useLocation();
    const navigate = useNavigate();
    const {firstName, lastName, email, phone, id}= employeeDetails.state;
    
    const handleCombinedClick = (id) => {
        deleteHandler(id);
        navigate('/');
    };

    // Delete Confirmation Modal //
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = (id) => {
        handleCombinedClick(id);
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th className='iconHead' scope="col">DELETE</th>
                    <th className='iconHead' scope="col">{block ? 'UNBLOCK' : 'BLOCK'}</th>
                    <th className='iconHead' scope="col">EDIT</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{firstName+' '+lastName}</td>
                    <td>{email}</td>
                    <td>{phone}</td>
                    <td className='deleteIcon'><i onClick={showModal}><MdDeleteForever /></i></td>
                    <Modal title="Delete Confirmation" open={isModalOpen} onOk={()=>handleOk(id)} onCancel={handleCancel}>
                        <p style={{color:'red'}}>Do You Really Want To Delete This Employee Data?</p>
                    </Modal>
                    <td className='blockIcon' onClick={()=>setBlock(!block)}>{block ? <CgUnblock /> : <MdBlock />}</td>
                    <td className='editIcon'><EditOutlined /></td>
                    </tr>
                </tbody>
                </table>
                <Link to='/' ><Button style={{marginTop:"100px"}} type="default" size='large' icon={<RollbackOutlined />}>Back</Button></Link>
        </div>
    );
};

export default EmployeeDetails;
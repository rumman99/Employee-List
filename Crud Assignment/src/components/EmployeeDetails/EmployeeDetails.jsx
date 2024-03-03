import React, { useEffect, useState } from 'react';
import { MdBlock } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EditOutlined, RollbackOutlined } from '@ant-design/icons';
import { CgUnblock } from "react-icons/cg";
import { Button, Modal } from 'antd';
import axios from 'axios';


const EmployeeDetails = ({deleteHandler}) => {
    const [block, setBlock]= useState(false); // State for bloc-unblock field
    const [employeeDetails, setEmployeeDetails]= useState({});
    const {id}= useParams();
    const navigate = useNavigate();
    
    const handleCombinedClick = (id) => {
        deleteHandler(id);
        navigate('/');
    };

    useEffect(()=>{
        const fetching =(async()=>{
            try{
                const response = await axios.get(`https://employee-list-production.up.railway.app/employee/${id}`)
                setEmployeeDetails(response.data);
            }
            catch(err){
                console.log(err);
            }
        })() /* Self Invoke Function IIFE*/
        
    },[])

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

// Handle Block Unblock Toggle
    const handleBlock = () => {
        setBlock(!block); // Toggle block state
    };

    return (
        <div>
            <h2 style={{color:'green'}}>Details Info of {employeeDetails.firstName+' '+employeeDetails.lastName}</h2>
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
                    <td>{employeeDetails.firstName+' '+employeeDetails.lastName}</td>
                    <td>{employeeDetails.email}</td>
                    <td>{employeeDetails.phone}</td>
                    <td className='deleteIcon'><i onClick={showModal}><MdDeleteForever /></i></td>
                    <Modal title="Delete Confirmation" open={isModalOpen} onOk={()=>handleOk(id)} onCancel={handleCancel}>
                        <p style={{color:'red'}}>Do You Really Want To Delete This Employee Data?</p>
                    </Modal>
                    <td className='blockIcon'><i onClick={handleBlock}>{block ? <p>UnBlock<CgUnblock /></p> : <p>Block<MdBlock /></p>}</i></td>
                    <td className='editIcon'><Link to={`/update/${id}`}><EditOutlined /></Link></td>
                    </tr>
                </tbody>
                </table>
                <Link to='/' ><Button style={{marginTop:"100px"}} type="default" size='large' icon={<RollbackOutlined />}>Back</Button></Link>
        </div>
    );
};

export default EmployeeDetails;
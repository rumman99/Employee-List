import React, { useEffect, useState } from 'react';
import { MdBlock } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EditOutlined, RollbackOutlined } from '@ant-design/icons';
import { CgUnblock } from "react-icons/cg";
import { Button, Modal } from 'antd';
import axios from 'axios';
import "./employeeDetails.css"


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
            <h2 style={{color:'green', marginTop:'150px'}}>Details Info of {employeeDetails.firstName+' '+employeeDetails.lastName}</h2>
                <div className='table2'>
                    <div className='table-row2'>
                    <div className='info2'>
                        <div className="row2">{employeeDetails.firstName+' '+employeeDetails.lastName}</div>
                        <div className="row2">{employeeDetails.email}</div>
                        <div className="row2">{employeeDetails.phone}</div>
                    </div>
                    
                    <div className='icons-container2'>
                        <div className='icons2'>
                            <div className='deleteIcon2'><i onClick={showModal}><MdDeleteForever /></i></div>
                            <Modal title="Delete Confirmation" open={isModalOpen} onOk={()=>handleOk(id)} onCancel={handleCancel}>
                                <p style={{color:'red'}}>Do You Really Want To Delete This Employee Data?</p>
                            </Modal>
                            <div className='blockIcon2'><i onClick={handleBlock}>{block ? <span>UnBlock<CgUnblock /></span> : <span>Block<MdBlock /></span>}</i>
                            </div>
                            <div className='editIcon2'><Link to={`/update/${id}`}><i><EditOutlined /></i></Link>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>




                <Link to='/' ><Button style={{marginTop:"100px"}} type="default" size='large' icon={<RollbackOutlined />}>Back</Button></Link>
        </div>
    );
};

export default EmployeeDetails;
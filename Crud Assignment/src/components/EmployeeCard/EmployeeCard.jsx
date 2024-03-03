import React, { useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { MdBlock } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
import { CgUnblock } from "react-icons/cg";
import "./employeeCard.css"
import { Link } from 'react-router-dom';
import { Col, Modal, Row } from 'antd';

const EmployeeCard = ({allEmployee, deleteHandler}) => {
    const [block, setBlock]= useState({}); // State for bloc-unblock field

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
            [id]: !state[id]
        }));
    }


    return (
        <div>
        <Row>
            {new Array(1).fill(0).map((_, index) => {
            const key = `col-${index}`;
            return (
                <Col
                key={key}
                xs={{
                    flex: '100%',
                }}
                sm={{
                    flex: '50%',
                }}
                md={{
                    flex: '40%',
                }}
                lg={{
                    flex: '20%',
                }}
                xl={{
                    flex: '10%',
                }}
                >
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Serial</th>
                    <th scope="col">Name</th>
                    <th className='iconHead' scope="col">DETAILS</th>
                    <th className='iconHead' scope="col">DELETE</th>
                    <th className='iconHead' scope="col">Block/Unblock</th>
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
                    <td className='blockIcon'><i onClick={()=>handleBlock(employee.id)}>{block[employee.id] ? <p>UnBlock<CgUnblock /></p> : <p>Block<MdBlock /></p>}</i></td>
                    </tr>

                ))}
                </tbody>
                </table>
                </Col>
            );
            })}
        </Row>
            
        </div>
    );
};

export default EmployeeCard;
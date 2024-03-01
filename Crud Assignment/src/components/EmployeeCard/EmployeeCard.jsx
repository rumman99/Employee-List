import React, { useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdBlock } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
import { MdOutlineHideImage } from "react-icons/md";
import "./employeeCard.css"

const EmployeeCard = ({allEmployee}) => {
    const [details, setDetails]= useState(false);
    console.log(allEmployee);
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Serial</th>
                    <th scope="col">Name</th>
                    {   
                        details &&<th scope="col">Phone</th>
                    }
                    {
                        details &&<th scope="col">Email</th>
                    }
                    {
                        details ? <th className='iconHead' scope="col">HIDE</th> : <th className='iconHead' scope="col">DETAILS</th>
                    }
                    <th className='iconHead' scope="col">DELETE</th>
                    <th className='iconHead' scope="col">BLOCK</th>
                    {
                        details && <th className='iconHead' scope="col">EDIT</th>
                    }
                    </tr>
                </thead>
                <tbody>
                {allEmployee.map((employee, index) => (

                    <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{employee.firstName+' '+employee.lastName}</td>
                    {
                        details &&<td>{employee.phone}</td>
                    }
                    {
                        details &&<td>{employee.email}</td>
                    }
                    <td className='detailsIcon' onClick={()=>setDetails(!details)}>
                        {
                            details ? <MdOutlineHideImage /> : <BiSolidDetail />
                        }
                    </td>
                    <td className='deleteIcon'><MdDeleteForever /></td>
                    <td className='blockIcon'><MdBlock /></td>
                    {
                        details && <td className='editIcon'><CiEdit /></td>
                    }
                    </tr>

                ))}
                </tbody>
                </table>
        </div>
    );
};

export default EmployeeCard;
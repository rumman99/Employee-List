import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RollbackOutlined } from '@ant-design/icons';
import { Bounce, toast } from 'react-toastify';
import axios from 'axios';

const UpdateEmployee = ({updateHandler}) => {
    const {id}= useParams();
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const onFinish = (values) => {
            updateHandler({id: id, ...values});
            form.resetFields();
            navigate('/');
        };
            const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
                // Alert Style
                toast.error("Updated Successfully",{position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,});
        }

    useEffect(()=>{
        const fetching = (async()=>{
            try{
                const response= await axios.get(`https://employee-list-production.up.railway.app/employee/${id}`)
                const { firstName, lastName, phone } = response.data;
                form.setFieldsValue({ firstName, lastName, phone });
            }
            catch(err){
                console.log(err);
            }
        })()
    },[])

    return (
        <div>
            <h2 style={{color:'yellow'}}>Edit Employee Details</h2>
            <Form form={form}
                name="basic"
                labelCol={{
                span: 8,
                }}
                wrapperCol={{
                span: 16,
                }}
                style={{
                maxWidth: 600,
                }}
                initialValues={{
                remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                    {
                    required: true,
                    message: 'Please input your firstName!',
                    },
                ]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                    {
                    required: true,
                    message: 'Please input your lastName!',
                    },
                ]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                label="Phone"
                name="phone"
                rules={[
                    {
                    required: true,
                    message: 'Please input your phone!',
                    },
                ]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                >
                <Button type="primary" htmlType="submit">
                    Update
                </Button>
                </Form.Item>
            </Form>
            <Link to='/' ><Button style={{marginTop:"100px"}} type="default" size='large' icon={<RollbackOutlined />}>Back</Button></Link>
        </div>
    );
};

export default UpdateEmployee;
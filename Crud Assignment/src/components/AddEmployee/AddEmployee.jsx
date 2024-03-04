import React from 'react';
import { Button, Form, Input } from 'antd';
import './addEmplyee.css'
import { Link, useNavigate } from 'react-router-dom';
import { RollbackOutlined } from '@ant-design/icons';
import { Bounce, toast } from 'react-toastify';

const AddEmployee = ({submitHandler}) => {
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const onFinish = (values) => {
            submitHandler(values);
            form.resetFields();
            navigate('/');
        };
            const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
                // Alert Style
                toast.error("Input Can't be Blank!",{position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,});
        }


    return (
        <>
        <h2 style={{marginTop:'100px'}}>Add Employee</h2>
        <div className='input-style'>
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
                label="Email"
                name="email"
                rules={[
                    {
                    required: true,
                    message: 'Please input your email!',
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
                    Submit
                </Button>
                </Form.Item>
            </Form>
            </div>
            <Link to='/' ><Button style={{marginTop:"50px"}} type="default" size='large' icon={<RollbackOutlined />}>Back</Button></Link>
        </>
    );
};

export default AddEmployee;
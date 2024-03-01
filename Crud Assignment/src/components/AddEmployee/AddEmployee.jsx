import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import './addEmplyee.css'


const AddEmployee = ({submitHandler}) => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
            submitHandler(values);
            form.resetFields();
        };
            const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        }


    return (
        <div>
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
    );
};

export default AddEmployee;
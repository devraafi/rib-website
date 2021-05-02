import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { EyeIcon } from '@Components/icons/icons';
import { AccountMangeRestServices } from '../account-managements-rest.services';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
const accountManageRestService: AccountMangeRestServices = new AccountMangeRestServices(process.env.staging || '');
const ResetPasswordComponent = (
    props: {
        onResetPassword: (val: any) => void;
    }
) => {
    const router = useRouter();
    const { query } = router;

    function onFinish(val: any) {
        props.onResetPassword({ ...val, id: query.id })
    }

    const [form] = Form.useForm()
    return <div id="forgot-page-dh">
        <NextSeo
            title="Reset Password | Ruang Insan Berbagi"
        />
        <div className="forgor-wrapper forgot-wrapper">
            <div className="forgot-section mt-4 text-center">
                <div className="title">Buat password baru</div>
                <p className="text">Demi keamanan akun-mu password minimal 8-12 karakter dengan menggunakan kombinasi huruf besar, huruf kecil, angka atau spesial karakter.</p>
                <div className="form-section mt-4">
                    <Form
                        form={form}
                        initialValues={{
                            password: null,
                            consfirmPassword: null,
                        }}
                        onFinish={onFinish}
                    >
                        <div className="row">
                            <div className="col-12 p-2">
                                <Form.Item
                                    name="password"
                                    className="m-0"
                                    rules={
                                        [{
                                            required: true, message: 'Harap isi password!'
                                        }]
                                    }
                                >
                                    <Input.Password
                                        size="large"
                                        placeholder="Kata sandi"
                                        className="input-account"
                                        type="password"
                                    // iconRender={visible =>
                                    //     visible ?
                                    //         <EyeIcon />
                                    //         : <EyeIcon />
                                    // }
                                    />
                                </Form.Item>
                            </div>
                            <div className="col-12 p-2">
                                <Form.Item
                                    name="confirmPassword"
                                    className="m-0"
                                    rules={[
                                        {
                                            validator: async (_, names) => {
                                                if (names !== form.getFieldValue('password')) {
                                                    return Promise.reject(new Error('Kata sandi tidak valid.'));
                                                }
                                            },
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        size="large"
                                        placeholder="Konfirmasi Kata sandi"
                                        className="input-account"
                                        type="password"
                                    // iconRender={visible =>
                                    //     visible ?
                                    //         <EyeIcon />
                                    //         : <EyeIcon />
                                    // }
                                    />
                                </Form.Item>
                            </div>
                            <div className="col-12 my-2">
                                <Button htmlType="submit" className="btn btn-dh-primary btn-block">
                                    Reset Password
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
}

const IconMail = () => {
    return <img src="/images/icons/login/mail.svg" alt="" className="img-fluid" />
}

const IconPassword = () => (
    <img src="/images/icons/login/password.svg" alt="" className="img-fluid" />
)

export default ResetPasswordComponent;
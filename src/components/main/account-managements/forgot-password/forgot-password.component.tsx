import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { EyeIcon } from '@Components/icons/icons';
import { AccountMangeRestServices } from '../account-managements-rest.services';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
const accountManageRestService: AccountMangeRestServices = new AccountMangeRestServices(process.env.staging || '');
const ForgotPasswordComponent = () => {
    const router = useRouter();
    const { query } = router;

    function onFinish(val: any) {

    }
    return <div id="forgot-page-dh">
        <NextSeo
            title="Lupa Password | Ruang Insan Berbagi"
        />
        <div className="forgor-wrapper forgot-wrapper">
            <div className="forgot-section mt-4 text-center">
                <div className="title">Lupa kata sandi Anda?</div>
                <p className="text">Jangan khawatir! cukup isi email Anda dan kami akan mengirimkan tautan untuk mereset kata sandi Anda</p>
                <div className="form-section mt-4">
                    <Form
                        initialValues={{
                            remember: false,
                            email: null
                        }}
                        onFinish={onFinish}
                    >
                        <div className="row">
                            <div className="col-12 my-2">
                                <Form.Item
                                    name="username"
                                    className="m-0"
                                    rules={
                                        [{
                                            required: true, message: 'Harap isi email!'
                                        }]
                                    }
                                >
                                    <Input
                                        className="input-login-email"
                                        size="large"
                                        type="email"
                                        placeholder="Alamat E-mail"
                                        suffix={<IconMail />}
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

export default ForgotPasswordComponent;
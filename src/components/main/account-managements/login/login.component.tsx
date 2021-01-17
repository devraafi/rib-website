import Link from 'next/link';
import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { EyeIcon } from '@Components/icons/icons';
import { AccountMangeRestServices } from '../account-managements-rest.services';
const accountManageRestService: AccountMangeRestServices = new AccountMangeRestServices('https://staging-lazis-dh.herokuapp.com/');
const LoginComponent = (props: {
    onLogin?: (val: any) => void;
}) => {
    function onFinish(val: any) {
        props.onLogin ? props.onLogin(val) : '';
    }

    return <div id="login-page-dh">
        <div className="login-wrapper">
            <div className="header-section">
                <img src="/images/logos/dh-logo.svg" alt="" className="img-fluid mb-2" />
                <div className="title my-2">Selamat datang,</div>
                <div className="text">Belum memiliki akun?
                    <Link href="#">
                        <a href="" className="text link"> Sign up</a>
                    </Link>
                </div>
            </div>
            <div className="form-section mt-4">
                <Form
                    initialValues={{ remember: false }}
                    onFinish={onFinish}
                >
                    <div className="row">
                        <div className="col-12 my-2">
                            <Form.Item
                                name="username"
                                className="m-0"
                                rules={
                                    [{
                                        required: true, message: 'Harap ini username atau email!'
                                    }]
                                }
                            >
                                <Input
                                    className="input-login-email"
                                    size="large"
                                    type="email"
                                    suffix={<IconMail />}
                                />
                            </Form.Item>
                        </div>
                        <div className="col-12 my-2">
                            <Form.Item
                                name="password"
                                className="m-0"
                                rules={
                                    [{
                                        required: true, message: 'Harap ini password!'
                                    }]
                                }
                            >
                                <Input.Password
                                    className="input-login-password"
                                    type="password"
                                    visibilityToggle={true}
                                    size="large"
                                    iconRender={visible =>
                                        visible ?
                                            <EyeIcon />
                                            : <EyeIcon />
                                    }
                                />
                            </Form.Item>
                        </div>
                        <div className="col-6 text align-self-center">
                            <Form.Item
                                name="remember"
                                className="m-0"
                            >
                                <Checkbox className="checkbox-dh text">Ingat Saya</Checkbox>
                            </Form.Item>
                        </div>
                        <div className="col-6 text text-right align-self-center">
                            <Link href="#">
                                <a href="" className="text link"> Lupa Password</a>
                            </Link>
                        </div>
                        <div className="col-12 my-2">
                            <Form.Item>
                                <Button htmlType="submit" className="btn btn-dh-primary btn-block">
                                    Log in
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </div>
            <div className="footer-section w-100">
                <div className="d-flex flex-row justify-content-between">
                    <div className="brd"></div>
                    <div className="text">Or Login with</div>
                    <div className="brd"></div>
                </div>
                <div className="action d-flex flex-row justify-content-between my-2">
                    <button className="btn btn-dh-g mr-2 btn-block align-self-center">
                        <img src="/images/logos/g.svg" className="mr-2" alt="" />
                            Google
                        </button>
                    <button className="btn btn-dh-fb btn-block align-self-center">
                        <img src="/images/logos/fb.svg" className="mr-2" alt="" />
                            Facebook
                    </button>
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

export default LoginComponent;
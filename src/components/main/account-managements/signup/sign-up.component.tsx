import { EyeIcon } from '@Components/icons/icons';
import { Checkbox, Form, Input } from 'antd';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import React from 'react';
const SignUpComponent = (props: {
    onSignUp?: (val: any) => void;
}) => {
    function onFinish(values: any) {
        props.onSignUp ? props.onSignUp(values) : null
    }

    return <div id="sign-up-page-dh">
        <NextSeo
            title="Sign Up | Lazih Ruang Insan Berbagi"
        />
        <div className="sign-up-wrapper">
            <div className="header-section text-center w-100">
                <div className="d-flex justify-content-between">
                    <div className="welcome">
                        <div className="title text-left mb-1">
                            Daftar
                        </div>
                        {/* <div className="account">
                            Sudah memiliki akun? <Link href="/login"><a className="link">Masuk Disini</a></Link>
                        </div> */}
                    </div>
                    <Link href="/home">
                        <div className="logo-boi">
                            <img src="/images/logos/dh-logo.svg" alt="" width="100%" />
                        </div>
                    </Link>
                </div>
            </div>
            <div className="form-section my-2">
                <Form
                    onFinish={onFinish}
                >
                    <div className="row">
                        <div className="col-12 p-2">
                            <Form.Item
                                name="fullName"
                                className="m-0"
                                rules={
                                    [{
                                        required: true, message: 'Harap isi Nama Lengkap!'
                                    }]
                                }
                            >
                                <Input
                                    placeholder="Nama Lengkap"
                                    className="input-account"
                                    size="large"
                                    prefix={null}
                                />
                            </Form.Item>
                        </div>
                        <div className="col-12 p-2">
                            <Form.Item
                                name="phoneNumber"
                                className="m-0"
                            >
                                <Input
                                    size="large"
                                    placeholder="Nomor Telepon"
                                    className="input-account"
                                    type="tel"
                                    prefix={<IconPhone />}
                                />
                            </Form.Item>
                        </div>
                        <div className="col-12 p-2">
                            <Form.Item
                                name="email"
                                className="m-0"
                                rules={
                                    [{
                                        required: true, message: 'Harap isi Alamat email!'
                                    }]
                                }
                            >
                                <Input
                                    size="large"
                                    placeholder="Alamat E-mail"
                                    className="input-account"
                                    type="email"
                                    suffix={<IconMail />}
                                />
                            </Form.Item>
                        </div>
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
                        <div className="col-12 p-2 my-1">
                            <Form.Item
                                name="agree"
                                className="m-0"
                            >
                                <div className="d-flex">
                                    <Checkbox name="agree" id="agree" className="checkbox-dh text mr-1" />
                                    <label htmlFor="agree" className="text">
                                        Saya menyetujui
                                            <a className="text link ml-2" href="/syarat-dan-ketentuan" target="_blank">
                                            Syarat Penggunaan
                                            </a>
                                        <span className="mx-2">
                                            dan
                                        </span>
                                        <a className="text link" href="/kebijakan-privasi" target="_blank">
                                            Kebijakan Privasi
                                        </a>
                                    </label>
                                </div>
                            </Form.Item>
                        </div>
                        <div className="col-12 p-2">
                            <button type="submit" className="btn btn-dh-primary btn-block">Buat Akun</button>
                        </div>
                    </div>
                </Form>
            </div>
            <div className="text text-center">
                Sudah memiliki akun?
                <Link href="/login">
                    <a className="text link mr-2">
                        Masuk
                    </a>
                </Link>
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

const IconPhone = () => (
    <div className="plus62">
        +62 |
    </div>
)

export default SignUpComponent;
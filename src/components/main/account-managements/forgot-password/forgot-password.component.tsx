import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { EyeIcon } from '@Components/icons/icons';
import { AccountMangeRestServices } from '../account-managements-rest.services';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
const accountManageRestService: AccountMangeRestServices = new AccountMangeRestServices(process.env.staging || '');
const ForgotPasswordComponent = (
    props: {
        onVerifyEmail: (val: any) => void;
    }
) => {
    const router = useRouter();
    const { query } = router;

    function onFinish(val: any) {
        props.onVerifyEmail(val)
    }
    return <div id="forgot-page-dh">
        <NextSeo
            title="Lupa Password | Ruang Insan Berbagi"
        />
        <div className="forgor-wrapper forgot-wrapper">
            <div className="forgot-section mt-4 text-center">
                <div className="title">Lupa kata sandi Anda?</div>
                <p className="text">
                    Link reset password akan dikirimkan melalui e-mail. Masukkan alamat e-mail yang Anda gunakan untuk login ke Ruang Insan Berbagi, selanjutnya silakan untuk merubah password akun Anda</p>
                <div className="form-section mt-4">
                    <Form
                        initialValues={{
                            email: null
                        }}
                        onFinish={onFinish}
                    >
                        <div className="row">
                            <div className="col-12 my-2">
                                <Form.Item
                                    name="email"
                                    className="m-0"
                                    rules={
                                        [
                                            {
                                                required: true,
                                                message: 'Harap isi email!',
                                            },
                                            {
                                                type: 'email',
                                                message: 'Email tidak valid'
                                            }
                                        ]
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
                                <Link href="/login">
                                    <Button htmlType="submit" className="btn btn-dh-basic mr-2">
                                        Batal
                                </Button>
                                </Link>
                                <Button htmlType="submit" className="btn btn-dh-primary">
                                    Kirim Link
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
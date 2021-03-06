import React, { useState } from 'react';
import { AccountManagementProps } from './accont-management';
import LoginComponent from './login/login.component';
import { AccountMangeRestServices } from './account-managements-rest.services';
import { Spin } from 'antd';
import { Loading } from '@Components/basics/loading/loading.component';
import { useRouter } from 'next/router';
import SignUpComponent from './signup/sign-up.component';
import { AuthenticationService } from 'services/auth/aut.service';
import { RequestService } from 'services/request.services';
import ForgotPasswordComponent from './forgot-password/forgot-password.component';
import ResetPasswordComponent from './reset-password/reset-password.component';
const accountManageRestService: AccountMangeRestServices = new AccountMangeRestServices(process.env.staging || '');
const auth: AuthenticationService = new AuthenticationService();
const { handleRequest } = new RequestService;
const AccontManagementsComponent = (props: AccountManagementProps) => {
    const [loading, SetLoading] = useState(false);
    const router = useRouter();

    function onLogin(val: any) {
        SetLoading(true);
        const obs = auth.login(val);
        handleRequest({
            obs,
            errorMessage: 'Password tidak sesuai, silakan cek kembali e-mail dan password Anda',
            onError: () => SetLoading(false),
            onTap: (res) => {
                localStorage.setItem('userInfo', JSON.stringify(res));
                SetLoading(false);
                if (props.onSuccess) {
                    props.onSuccess()
                } else {
                    router.push('/home');
                }
            }
        })
    };

    function onSignUp(val: any) {
        SetLoading(true);
        const obs = accountManageRestService.register(val);
        handleRequest({
            obs,
            errorMessage: 'Gagal Daftar',
            onError: () => SetLoading(false),
            onTap: (res) => {
                localStorage.setItem('register-data', JSON.stringify(res));
                SetLoading(false);
                router.push('/login?register=true');
            }
        })
    };

    function onVerifyEmail(val: any) {
        SetLoading(true);
        const obs = accountManageRestService.verifyEmail(val);
        handleRequest({
            obs,
            successMessage: 'Silahkan cek email anda',
            onError: () => SetLoading(false),
            onTap: (res) => {
                SetLoading(false);
            }
        })
    };
    
    function onResetPassword(val: any) {
        SetLoading(true);
        const obs = accountManageRestService.resetPassword(val);
        handleRequest({
            obs,
            successMessage: 'Reset password berhasil. Silahkan login',
            onError: () => SetLoading(false),
            onTap: (res) => {
                SetLoading(false);
                router.push('/login');
            }
        })
    };

    function viewPage() {
        switch (props.page) {
            case 'login':
                return <LoginComponent onLogin={onLogin} />;
            case 'signup':
                return <SignUpComponent onSignUp={onSignUp} />;
            case 'forgot-password':
                return <ForgotPasswordComponent onVerifyEmail={onVerifyEmail} />;
            case 'reset-password':
                return <ResetPasswordComponent onResetPassword={onResetPassword} />;
            default:
                return <LoginComponent onLogin={onLogin} />;
        }
    }

    return <div id="account-manage-page">
        <div className="container">
            <div className={"main-login-register " + (props.className || '')}>
                <Spin spinning={loading} indicator={<Loading />} >
                    <div className={`page-wrapper ${props.page || ''}`}>
                        {
                            viewPage()
                        }
                    </div>
                </Spin>
            </div>
        </div>
    </div>
}

export default AccontManagementsComponent;
import React, { useState } from 'react';
import _ from 'lodash';
import { AccountManagementProps } from './accont-management';
import LoginComponent from './login/login.component';
import { AccountMangeRestServices } from './account-managements-rest.services';
import { Spin } from 'antd';
import { Loading } from '@Components/basics/loading/loading.component';
import { useRouter } from 'next/router';
import SignUpComponent from './signup/sign-up.component';
import { AuthenticationService } from 'services/auth/aut.service';
import { RequestService } from 'services/request.services';
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
            errorMessage: 'Gagal Login',
            onTap: (res) => {
                localStorage.setItem('userinfo', JSON.stringify(res));
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
            onTap: (res) => {
                localStorage.setItem('register-data', JSON.stringify(res));
                SetLoading(false);
                router.push('/login?register=true');
            }
        })
    };

    return <div id="account-manage-page">
        <div className="container">
            <div className={"main-login-register " + (props.className || '')}>
                <Spin spinning={loading} indicator={<Loading />} >
                    <div className="page-wrapper">
                        {
                            props.page === 'login' ? <LoginComponent onLogin={onLogin} />
                                : <SignUpComponent onSignUp={onSignUp} />
                        }
                    </div>
                </Spin>
            </div>
        </div>
    </div>
}

export default AccontManagementsComponent;
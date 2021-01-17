import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { AccountManagementProps } from './accont-management';
import LoginComponent from './login/login.component';
import { AccountMangeRestServices } from './account-managements-rest.services';
import { message, Spin } from 'antd';
import { Loading } from '@Components/basics/loading/loading.component';
import { useRouter } from 'next/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import SignUpComponent from './signup/sign-up.component';
const accountManageRestService: AccountMangeRestServices = new AccountMangeRestServices(process.env.staging || '');

const AccontManagementsComponent = (props: AccountManagementProps) => {
    const [loading, SetLoading] = useState(false);
    const router = useRouter();

    function onLogin(val: any) {
        SetLoading(true);
        accountManageRestService.login(val).pipe(
            catchError((err) => {
                SetLoading(false);
                message.error('Gagal Login');
                return throwError(err);
            }),
            tap((res) => {
                console.log(res);
                localStorage.setItem('userinfo', JSON.stringify(res));
                SetLoading(false);
                router.push('/home');
            })
        ).subscribe();
    };

    function onSignUp(val: any) {
        SetLoading(true);
        accountManageRestService.register(val).pipe(
            catchError((err) => {
                SetLoading(false);
                message.error('Gagal Daftar');
                return throwError(err);
            }),
            tap((res) => {
                console.log(res);
                localStorage.setItem('register-data', JSON.stringify(res));
                SetLoading(false);
                router.push('/login');
            })
        ).subscribe();
    };

    return <div id="account-manage-page">
        <div className="container">
            <div className="main-login-register">
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
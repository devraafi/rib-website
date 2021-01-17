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
    useEffect(() => {
        console.log(props);
    })
    return <div id="account-manage-page">
        <div className="container">
            <Spin spinning={loading} indicator={<Loading />} >
                <div className="main-login-register">
                    <div className="page-wrapper">
                        {
                            props.page === 'login' ? <LoginComponent onLogin={onLogin} />
                                : ''
                        }
                    </div>
                </div>
            </Spin>
        </div>
    </div>
}

const getSeo = (page: 'login' | 'register' | 'profile') => {
    const title = _.capitalize(page);
    const seo = {
        title: title,
        description: `${title} Lazis Darul Hikam`,
        pageId: `${page || 'other'}-page-dh`
    }
    return seo;
}

export default AccontManagementsComponent;
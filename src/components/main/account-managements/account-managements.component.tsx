import React, { useState } from 'react';
import _ from 'lodash';
import { AccountManagementProps } from './accont-management';
import LoginComponent from './login/login.component';
import { AccountMangeRestServices } from './account-managements-rest.services';
import { catchError } from 'rxjs/operators';
import { env } from 'process';
const accountManageRestService: AccountMangeRestServices = new AccountMangeRestServices(process.env.staging || '');

const AccontManagementsComponent = (props: AccountManagementProps) => {
    const { Fragment } = React;
    const [loading, SetLoading] = useState(false);
    function onLogin(val: any) {
        SetLoading(true);
        accountManageRestService.login(val).pipe(
            catchError(err => {
                SetLoading(false)
                return err
            })
        ).subscribe(res => {
            SetLoading(false);
            console.log(res);
        });
    }
    return <Fragment>
        <div id="account-manage-page">
            <div className="container">
                <div className="main-login-register">
                    <div className="loading-dh">

                    </div>
                    <div className="page-wrapper">
                        {
                            props.page === 'login' ? <LoginComponent onLogin={onLogin} />
                                : ''
                        }
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
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
import MainComponent from '@Components/layout/main/main-layout.component';
import React from 'react';
import _ from 'lodash';
import { AccountManagementProps } from './accont-management';
import LoginComponent from './login/login.component';

const AccontManagementsComponent = (props: AccountManagementProps) => {
    const { Fragment } = React;
    return <Fragment>
        <div id="account-manage-page">
            <div className="container">
                <div className="main-login-register">
                    <div className="page-wrapper">
                        {
                            props.page === 'login' && <LoginComponent/>
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
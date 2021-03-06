import { Loading } from '@Components/basics/loading/loading.component';
import MainComponent from '@Components/layout/main/main-layout.component';
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { AuthenticationService } from 'services/auth/aut.service';
import { RequestService } from 'services/request.services';
import { ProfileRestService } from './profile-rest.service';
const { handleRequest } = new RequestService;
const auth: AuthenticationService = new AuthenticationService;
const profileRest = new ProfileRestService(process.env.staging || '', auth.axiosInterceptors);
export const ProfileComponent = () => {
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState<IProfile>();
    const [profileTransaction, setProfileTransaction] = useState<any>();

    function loadProfileTransaction() {
        const obs = profileRest.loadProfileTransaction();
        handleRequest({
            obs,
            onDone: setProfileTransaction
        })
    }

    function loadProfile() {
        setLoading(true);
        const obs = profileRest.loadProfile();

        handleRequest({
            obs,
            onTap: loadProfileTransaction,
            onDone: (res: IProfile) => {
                setLoading(false);
                setProfile(res)
            }
        })
    }

    useEffect(() => {
        loadProfile()
    }, [])

    return <MainComponent
        title="Profile"
        description="lazis Darul Hikam"
        pageId="profile-page-dh"
    >
        <Spin spinning={loading} indicator={<Loading />}>
            <div className="container-lg my-3">
                <div className="profile-wrapper">
                    <div className="profile-info">
                        <div className="d-flex">
                            <div className="img-profile mr-2 align-self-center">
                                <img src="/images/icons/people.svg" alt="" />
                            </div>
                            <div className="info align-self-center">
                                <div className="name">
                                    {profile?.fullName}
                                </div>
                                <div className="phone">
                                    {profile?.phoneNumber}
                                </div>
                                <div className="email">
                                    {profile?.email}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-transaction">
                        
                    </div>
                </div>
            </div>
        </Spin>
    </MainComponent>
}
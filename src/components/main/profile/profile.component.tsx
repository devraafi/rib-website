import MainComponent from '@Components/layout/main/main-layout.component';
import React, { useEffect } from 'react';
import { AuthenticationService } from 'services/auth/aut.service';
import { RequestService } from 'services/request.services';
import { ProfileRestService } from './profile-rest.service';
const { handleRequest } = new RequestService;
const auth: AuthenticationService = new AuthenticationService;
const profileRest = new ProfileRestService(process.env.staging || '', auth.axiosInterceptors);
export const ProfileComponent = () => {
    function loadProfile() {
        const obs = profileRest.loadProfile();

        handleRequest({
            obs,
            onDone: console.log
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
        <div className="container-lg">
            <div className="profile-wrapper">
                <div className="profile-info">
                    
                </div>
            </div>
        </div>
    </MainComponent>
}
import { Loading } from '@Components/basics/loading/loading.component';
import MainComponent from '@Components/layout/main/main-layout.component';
import { Spin } from 'antd';
import moment from 'moment';
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
    const [profileTransaction, setProfileTransaction] = useState<IProfileTransaction>();
    const [page, setPage] = useState<'transaction' | ''>('transaction')
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
        description="Ruang Insan Berbagi"
        pageId="profile-page-dh"
    >
        <Spin spinning={loading} indicator={<Loading />}>
            <div className="container-lg my-3">
                <div className="profile-wrapper">
                    <div className="profile-info">
                        <div className="d-flex">
                            <div className="img-profile mr-3 align-self-center">
                                <img src="/images/icons/people.svg" alt="" />
                            </div>
                            <div className="info align-self-center">
                                <div className="name">
                                    {profile?.fullName}
                                </div>
                                <div className="phone my-2">
                                    {profile?.phoneNumber}
                                </div>
                                <div className="email">
                                    {profile?.email}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-transaction">
                        <div className="d-flex my-3">
                            <button className={`btn btn-dh-basic color-next border-0 rounded ${page === 'transaction' && 'active'}`}>
                                Riwayat Transaction
                            </button>
                        </div>
                        <div className="transaction-info">
                            <div className="total-donasi">
                                <p>Total Donasi</p>
                                <div className="d-flex my-2">
                                    <div className="rp mr-1">Rp </div>
                                    <div className="value">
                                        {profileTransaction?.totalAmount && (profileTransaction?.totalAmount).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                            <div className="table-profile-transaction  table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Program</th>
                                            <th>Tanggal</th>
                                            <th>Jumlah</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            profileTransaction?.items && profileTransaction.items.map((item, i) => (
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.transactionDate && moment(item.transactionDate).format('DD MMM YYYY')}</td>
                                                    <td>Rp {item.amount && (item.amount).toLocaleString()}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Spin>
    </MainComponent>
}
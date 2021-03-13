import { Loading } from '@Components/basics/loading/loading.component';
import MainComponent from '@Components/layout/main/main-layout.component';
import { Input, Spin } from 'antd';
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
    const [isUpdate, setisUpdate] = useState<boolean>(false);
    const [profileTransaction, setProfileTransaction] = useState<IProfileTransaction>();
    const [page, setPage] = useState<'transaction' | ''>('transaction');
    const [formValue, setFormValue] = useState({
        email: '',
        fullName: '',
        phoneNumber: '',
        _id: '',
        emailConfirmed: false,
        joinDate: '',
        phoneNumberConfirmed: false
    })
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
            onError: () => setLoading(false),
            onDone: (res: IProfile) => {
                setLoading(false);
                setProfile(res);
                setFormValue(res);
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
            <div className="container-lg mb-3">
                <div className="profile-wrapper">
                    {
                        !isUpdate &&
                        <div className="profile-info d-flex justify-content-around">
                            <div className="d-flex">
                                <div className="img-profile mr-4 align-self-center">
                                    <img src="/images/icons/people.svg" alt="" />
                                </div>
                                <div className="name mr-4 pr-4 border-right align-self-center">
                                    {profile?.fullName}
                                </div>
                                <div className="info align-self-center">
                                    <div className="phone">
                                        {profile?.phoneNumber}
                                    </div>
                                    <div className="email">
                                        {profile?.email}
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-column align-self-center">
                                <button className="btn btn-dh-edit" onClick={() => setisUpdate(!isUpdate)}>
                                    <img src="/images/icons/Edit.svg" alt="" srcSet="" className="mr-2" />
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    }
                    {
                        isUpdate &&
                        <div className="profile-info row justify-content-center">
                            <div className="col-lg-3">
                                <div className="img-profile mx-auto">
                                    <img src="/images/icons/people.svg" alt="" />
                                    {/* <img src="/images/icons/img-up.svg" alt="" className="img-up" /> */}
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group rib-profile">
                                    <label htmlFor="">Nama Lengkap</label>
                                    <Input value={formValue.fullName} onChange={(e) => setFormValue({
                                        ...formValue,
                                        fullName: e.target.value
                                    })} size="large" type="text" className="input-profile" />
                                </div>
                                <div className="form-group rib-profile">
                                    <label htmlFor="">Nomor Seluler</label>
                                    <Input value={formValue.phoneNumber} onChange={(e) => setFormValue({
                                        ...formValue,
                                        phoneNumber: e.target.value
                                    })} size="large" type="tel" className="input-profile" />
                                </div>
                                <div className="form-group rib-profile">
                                    <label htmlFor="">Email</label>
                                    <Input value={formValue.email} onChange={(e) => setFormValue({
                                        ...formValue,
                                        email: e.target.value
                                    })} size="large" type="email" className="input-profile" />
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="pt-3">
                                    <button className="btn btn-dh-edit" onClick={() => setisUpdate(!isUpdate)}>
                                        Simpan
                                </button>
                                </div>
                            </div>
                        </div>

                    }
                    <div className="profile-transaction">
                        <div className="d-flex my-4 justify-content-around">
                            <button className={`btn btn-dh-basic color-next border-0  ${page === 'transaction' && 'active'}`}>
                                Riwayat Transaction
                            </button>
                            <button className={`btn btn-dh-basic color-next border-0`} disabled>
                                Program Tersimpan
                            </button>
                            <button className={`btn btn-dh-basic color-next border-0`} disabled>
                                Galang Dana
                            </button>
                        </div>
                        <div className="transaction-info">
                            <div className="total-donasi">
                                <p>Total Donasi</p>
                                <div className="d-flex my-2">
                                    <div className="rp mr-2">Rp </div>
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
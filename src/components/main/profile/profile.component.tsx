import { Loading } from '@Components/basics/loading/loading.component';
import MainComponent from '@Components/layout/main/main-layout.component';
import { Input, Skeleton, Spin } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import Link from 'next/link';
import { Slider } from 'primereact/slider';
import React, { useEffect, useState } from 'react';
import { AuthenticationService } from 'services/auth/aut.service';
import { NotifService } from 'services/feedback/notif.service';
import { RequestService } from 'services/request.services';
import { DonationRestServices } from '../donation/donation-rest.service';
import { ProfileRestService } from './profile-rest.service';
const { handleRequest } = new RequestService;
const notif: NotifService = new NotifService;
const auth: AuthenticationService = new AuthenticationService;
const profileRest = new ProfileRestService(process.env.staging || '', auth.axiosInterceptors);
const donationRestService: DonationRestServices = new DonationRestServices(process.env.staging || '', auth.axiosInterceptors);
export const ProfileComponent = () => {
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState<IProfile>();
    const [isUpdate, setisUpdate] = useState<boolean>(false);
    const [profileTransaction, setProfileTransaction] = useState<IProfileTransaction>();
    const [page, setPage] = useState<'transaction' | 'bookmark'>('transaction');
    const loadings = [1, 2, 3];
    const [list, setList] = useState<any>(null);
    const [skeleton, setSkeleton] = useState('');
    const [formValue, setFormValue] = useState({
        email: '',
        fullName: '',
        phoneNumber: '',
        _id: '',
        emailConfirmed: false,
        joinDate: '',
        phoneNumberConfirmed: false
    });

    function getItem() {
        const local = localStorage;
        const userInfo = local.getItem('userinfo');
        if (userInfo) {
            return JSON.parse(userInfo)
        } else {
            return null
        }
    }

    function onBookMark(id: string, i: number) {
        if ((typeof window !== 'undefined' && getItem())) {
            setSkeleton(id);
            const obs = donationRestService.onBookMarked(id);
            handleRequest({
                obs,
                onError: () => setSkeleton(''),
                onDone: (res) => {
                    setSkeleton('');
                    let data = [...list];
                    _.remove(data, function (dt) { return dt._id == id })
                    setList(data)
                }
            })
        } else {
            notif.show({
                type: 'error',
                title: 'Error',
                description: 'Harap Login terlebih dahulu',
                // useService: !_.isUndefined(params.useService) ? params.useService : true
            });
        }
    }
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
                setList(res.bookmarkedPrograms)
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
                            <button className={`btn btn-dh-basic color-next border-0  ${page === 'transaction' && 'active'}`} onClick={() => setPage('transaction')}>
                                Riwayat Transaction
                            </button>
                            <button className={`btn btn-dh-basic color-next border-0 ${page === 'bookmark' && 'active'}`} onClick={() => setPage('bookmark')}>
                                Program Tersimpan
                            </button>
                            <button className={`btn btn-dh-basic color-next border-0`} disabled>
                                Galang Dana
                            </button>
                        </div>
                        {
                            page === 'transaction' &&
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
                        }
                        {
                            page === 'bookmark' &&
                            <div className="row justify-content-center">
                                {
                                    (list && list.length > 0) ? list.map((list: any, i: number) => {
                                        return (

                                            <div className="col-lg-4 col-12 px-3 py-3" key={i}>
                                                {
                                                    skeleton == list._id ?
                                                        <Skeleton.Input active className="w-100 card-program h-100" /> :
                                                        <div className="card-program animate__animated animate__bounceIn">
                                                            <Link href={`/donasi/detail?id=${list._id}`}>
                                                                <div className="d-flex flex-column">
                                                                    <div className="program-image">
                                                                        {
                                                                            list.fileUrl ?
                                                                                <img src={list.fileUrl || ''} alt="" className='lazyload blur-up lazyloaded imooge' />
                                                                                : <div className="imooge"></div>
                                                                        }
                                                                    </div>
                                                                    <div className="program-info p-3">
                                                                        <div className="title px-2">
                                                                            {list.name || 'Program'}
                                                                        </div>

                                                                        <div className="profileee-info py-3 px-2">
                                                                            <div className="d-flex flex-row justify-content-between">
                                                                                <div className="is-certified">
                                                                                    {
                                                                                        list.isCertified && (
                                                                                            <img src="/images/program/is-cert.svg" className="img-fluid lazyload blur-up lazyloaded" alt="" />
                                                                                        )
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="target-info p-2">
                                                                            <div className="py-2">
                                                                                <Slider disabled className="slider-program-dh" value={list.collectedAmount} max={list.targetAmount} />
                                                                            </div>
                                                                            <div className="d-flex flex-row justify-content-between py-2">
                                                                                <div className="amount">{'Rp. ' + (list.collectedAmount || 0).toLocaleString()}</div>
                                                                                <div className="target-amount">{`Target Rp. ${(list.targetAmount || 0).toLocaleString()}`}</div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="donation-info p-2">
                                                                            <div className="d-flex flex-row justify-content-between">
                                                                                <div className="d-flex flex-row justify-content-arround">
                                                                                    <div className="donatur-icon">
                                                                                        <img src="/images/icons/peoples.svg" alt="" className="lazyload blur-up lazyloaded" />
                                                                                    </div>
                                                                                    <div className="donatur-amount px-2">
                                                                                        {list.donorAmount || 0}
                                                                                    </div>
                                                                                    <div className="donasi">
                                                                                        Donasi
                                                                                    </div>
                                                                                </div>
                                                                                <div className="d-flex flex-row justify-content-arround">
                                                                                    <div className="cart">
                                                                                        <img src="/images/icons/cart.svg" alt="" className="lazyload blur-up lazyloaded" />
                                                                                    </div>
                                                                                    <div className="days-amount px-2">
                                                                                        {list.remainingDays || 0}
                                                                                    </div>
                                                                                    <div className="days">
                                                                                        Hari
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                            <div className="love" onClick={() => onBookMark(list._id, i)}>
                                                                <img src={`/images/icons/love-fill.svg`} className="img-fluid" alt="" srcSet="" />
                                                            </div>
                                                        </div>
                                                }
                                            </div>
                                        )
                                    })

                                        :
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="p-2 text-center">
                                                    Tidak Ada data
                                                </div>
                                            </div>
                                        </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Spin>
    </MainComponent>
}
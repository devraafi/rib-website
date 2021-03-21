import MainComponent from '@Components/layout/main/main-layout.component';
import React, { Component, useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import _ from 'lodash';
import { Slider } from 'primereact/slider';
import Link from 'next/link';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Skeleton } from 'antd';
import { AuthenticationService } from 'services/auth/aut.service';
import { DonationRestServices } from '../../donation-rest.service';

const filters = [
    'Bandung', 'Jakarta', 'Kesehatan', 'Pendidikan', 'Lingkungan', 'Umat', 'More Filters'
];
const auth: AuthenticationService = new AuthenticationService;
const donationRestService: DonationRestServices = new DonationRestServices(process.env.staging || '', auth.axiosInterceptors);

const DonationListByCategory = () => {
    const fakeLoading = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const [response, setResponse] = useState<any[]>()
    useEffect(() => {
        donationRestService.loadProgramByCategory().pipe(
            catchError(err => {
                return throwError(err);
            })).subscribe((res: any) => {
                console.log(res);
                setResponse(res)
            })
    }, []);
    return <MainComponent
        title="Donasi List Ruang Insan Berbagi"
        description="Ruang Insan Berbagi"
        pageId="donasi-page-dh"
    >
        <div className="container-fluid donasi-list-section p-0">
            <div className="bg-wrapper">
                <img src="/images/backgrounds/islamic.svg" alt="" className="islamic-bg" />
            </div>
            <div className="conatiner-fluid container-list">
                <div className="col-7 col-lg-7 col-md-6 col-12 m-auto py-4">
                    <span className="p-input-icon-right w-100">
                        <i className="pi pi pi-search dh-theme pr-2" />
                        <InputText className="input-dh-search w-100" placeholder="Cari yang ingin kamu bantu" />
                    </span>
                </div>
                <div className="d-flex flex-column filter">
                    <div className="header-small">
                        {response?.length || 0} Program Donasi
                </div>
                    <div className="header py-3">
                        Bantu individu, kelompok dan lingkungan sekitar yang membutuhkan
                </div>
                    {/* <div className="d-flex flex-row flex-wrap">
                    {
                        filters.map((filter, i) => {
                            return (
                                <div className="pr-2 py-2" key={i}>
                                    <button className={'btn btn-dh-outline-2 rounded-16 '}>
                                        {filter}
                                    </button>
                                </div>
                            )
                        })
                    }
                </div> */}
                </div>
                <div className="list-wrapper">
                    {response ? response.map((res: any) => {
                        console.log(res);
                        return <div className="row">
                            <div className="col-12 py-3">
                                <div className="d-flex flex-row justify-content-between">
                                    <div className="title-category">
                                        {res.name}
                                    </div>
                                    <div className="paginator"></div>
                                </div>
                            </div>
                            {
                                (res.programs.length > 0) && res.programs.map((list: any, i: number) => (
                                    <div className="col-lg-3 col-sm-6 col-12 col-md-4 py-2" key={i}>
                                        <Link href={`/donasi/detail?id=${list._id}`}>
                                            <div className="card-program animate__animated animate__bounceIn">
                                                <div className="d-flex flex-column">
                                                    <div className="program-image">
                                                        {
                                                            list.fileUrl && (list.fileUrl !== '-') ?
                                                                <img src={list.fileUrl} alt="" className='lazyload blur-up lazyloaded' />
                                                                : <div className="imooge"></div>
                                                        }
                                                    </div>
                                                    <div className="program-info p-3">
                                                        <div className="title px-2">
                                                            {list.name || 'Program Name'}
                                                        </div>

                                                        <div className="profile-info py-3 px-2">
                                                            <div className="d-flex flex-row justify-content-between">
                                                                {/* <div className="d-flex flex-row">
                                                                <div className="profile-img">
                                                                    {
                                                                        <img src={list.profileInfo ? list.profileInfo.imageUrl : '/images/user/placeholder.svg'} alt="" className="lazyload blur-up lazyloaded" />
                                                                    }
                                                                </div>
                                                                <div className="ml-3 profile-name">
                                                                    {list.profileInfo ? list.profileInfo.name : 'Anonim'}
                                                                </div>
                                                            </div> */}
                                                                <div className="is-certified">
                                                                    {
                                                                        list.isPartnerProgram && (
                                                                            <img src="/images/program/is-cert.svg" className="img-fluid lazyload blur-up lazyloaded" alt="" />
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="target-info p-2">
                                                            <div className="py-2">
                                                                <Slider disabled className="slider-program-dh" value={list.collectedAmount || 0} max={list.targetAmount || 0} />
                                                            </div>
                                                            <div className="d-flex flex-row justify-content-between py-2">
                                                                <div className="amount">{'Rp ' + (list.collectedAmount || 0).toLocaleString()}</div>
                                                                <div className="target-amount">{`Target Rp ${(list.targetAmount || 0).toLocaleString()}`}</div>
                                                            </div>
                                                        </div>

                                                        <div className="donation-info p-2">
                                                            <div className="d-flex flex-row justify-content-between">
                                                                {/* <div className="d-flex flex-row justify-content-arround">
                                                                <div className="donatur-icon">
                                                                    <img src="/images/icons/peoples.svg" alt="" className="lazyload blur-up lazyloaded" />
                                                                </div>
                                                                <div className="donatur-amount px-2">
                                                                    {list.collectedAmount || 0}
                                                                </div>
                                                                <div className="donasi">
                                                                    Donasi
                                                                </div>
                                                            </div> */}
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
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>
                    }) :
                        <div className="row">
                            {
                                fakeLoading.map((li: any, i: number) => (
                                    <div className="col-lg-3 col-sm-6 col-12 col-md-4 py-2" key={i}>
                                        <Skeleton.Input active className="w-100 card-program" />
                                    </div>
                                ))
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    </MainComponent>
}

export default DonationListByCategory;
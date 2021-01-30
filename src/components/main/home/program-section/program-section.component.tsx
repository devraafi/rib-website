import React, { useEffect, useState } from 'react';
import fakeData from './fake-data.json';
import { Slider } from 'primereact/slider';
import Link from 'next/link';
import { DonationRestServices } from '@Components/main/donation/donation-rest.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Skeleton, Spin } from 'antd';

const donationRestService: DonationRestServices = new DonationRestServices;

const ProgramSection = (props: {
    data: any
}) => {
    const loading = [1, 2, 3];
    const [list, setResponse] = useState<any>(null)
    useEffect(() => {
        if (props.data) {
            setResponse(props.data)
        }
    }, [props.data])
    return <div className="container program-section py-5">
        <div className="col-lg-6 m-auto header">
            Mari bantu dan ringankan beban mereka yang membutuhkan
    </div>
        <div className="col-lg-6 m-auto desc py-3">
            Temukan dan bantu mereka yang sedang berjuang bertahan hidup untuk makan, mendapatkan perawatan kesehatan/pengobatan dan mendapatkan pendidikan.
        </div>
        <div className="row justify-content-center">
            {
                (list && list) ? list.map((list: any, i: number) => {
                    return (

                        <div className="col-lg-4 col-12 px-3 py-3" key={i}>
                            <Link href={`/donasi/detail?id=${list._id}`}>
                                <div className="card-program">
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

                                            <div className="profile-info py-3 px-2">
                                                <div className="d-flex flex-row justify-content-between">
                                                    <div className="d-flex flex-row">
                                                        <div className="profile-img">
                                                            <img src={list.userInfo ? list.userInfo.imageUrl : '/images/user/placeholder.svg'} alt="" className="lazyload blur-up lazyloaded" />
                                                        </div>
                                                        <div className="ml-3 profile-name">
                                                            {list.userInfo ? list.userInfo.name : 'Anonim'}
                                                        </div>
                                                    </div>
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
                                                    <Slider disabled className="slider-program-dh" value={list.currentAmount} max={list.targetAmount} />
                                                </div>
                                                <div className="d-flex flex-row justify-content-between py-2">
                                                    <div className="amount">{'Rp. ' + (list.currentAmount || 0).toLocaleString()}</div>
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
                                                            {list.collectedAmount || 0}
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
                                </div>
                            </Link>
                        </div>
                    )
                })

                    :

                    loading.map((list: any, i: number) => (
                        <div className="col-lg-4 col-12 px-3 py-3" key={i}>
                            <Skeleton.Input className="card-program w-100" />
                        </div>
                    ))
            }
        </div>
        <div className="row justify-content-center py-4 program-footer mx-5">
            <div className="col-auto">
                <Link href="/donasi/list">
                    <button className="btn btn-dh-outline">
                        Lihat Semua
                    </button>
                </Link>
            </div>
        </div>
    </div>
}
export default ProgramSection;
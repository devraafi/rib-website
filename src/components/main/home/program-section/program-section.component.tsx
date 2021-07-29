import React, { useEffect, useState } from 'react';
import { Slider } from 'primereact/slider';
import Link from 'next/link';
import { DonationRestServices } from '@Components/main/donation/donation-rest.service';
import { Skeleton } from 'antd';
import { RequestService } from 'services/request.services';
import { AuthenticationService } from 'services/auth/aut.service';
import { NotifService } from 'services/feedback/notif.service';

const auth: AuthenticationService = new AuthenticationService;
const donationRestService: DonationRestServices = new DonationRestServices(process.env.staging || '', auth.axiosInterceptors);
const notif: NotifService = new NotifService;
const { handleRequest } = new RequestService;

const ProgramSection = (props: {
    data: any
}) => {
    const loading = [1, 2, 3];
    const [response, setResponse] = useState<any>(null);
    const [skeleton, setSkeleton] = useState('');

    function getItem() {
        const local = localStorage;
        const userInfo = local.getItem('userInfo');
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
                    let data = [...response];
                    data[i].bookmarked = res;
                    setResponse(data)
                }
            })
        } else {
            notif.show({
                type: 'error',
                title: 'Error',
                description: 'Harap Login terlebih dahulu',
                // useService: !isUndefined(params.useService) ? params.useService : true
            });
        }
    }
    useEffect(() => {
        if (props.data) {
            setResponse([...props.data])
        }
    }, [props.data])
    return <div className="container program-section py-5">
        <div className="col-lg-6 m-auto header">
            Pilihan Program Kebaikan untuk Kamu, Siap Berbagi Hari ini
    </div>
        <div className="col-lg-6 m-auto desc py-3">
            Temukan dan bantu mereka yang sedang berjuang bertahan hidup untuk makan, mendapatkan perawatan kesehatan/pengobatan dan mendapatkan pendidikan.
        </div>
        <div className="row justify-content-center">
            {
                (response && (response.length > 0)) ? response.map((li: any, i: number) => {
                    return (

                        <div className="col-lg-4 col-12 px-3 py-3" key={i}>
                            {
                                skeleton == li._id ?
                                    <Skeleton.Input active className="w-100 card-program h-100" /> :
                                    <div className="card-program animate__animated animate__bounceIn">
                                        <Link href={`/donasi/detail?title=${li.route}&id=${li._id}`}>
                                            <div className="d-flex flex-column">
                                                <div className="program-image">
                                                    {
                                                        li.fileUrl && (li.fileUrl !== '-') ?
                                                            <img src={li.fileUrl || ''} alt="" className='lazyload blur-up lazyloaded imooge' />
                                                            : <div className="imooge"></div>
                                                    }
                                                </div>
                                                <div className="program-info p-3">
                                                    <div className="title px-2">
                                                        {li.name || 'Program'}
                                                    </div>

                                                    <div className="profile-info py-3 px-2">
                                                        <div className="d-flex flex-row justify-content-between">
                                                            {/* <div className="d-flex flex-row">
                                                        <div className="profile-img">
                                                            <img src={li.userInfo ? li.userInfo.imageUrl : '/images/user/placeholder.svg'} alt="" className="lazyload blur-up lazyloaded" />
                                                        </div>
                                                        <div className="ml-3 profile-name">
                                                            {li.userInfo ? li.userInfo.name : 'Anonim'}
                                                        </div>
                                                    </div> */}
                                                            <div className="is-certified">
                                                                {
                                                                    li.isCertified && (
                                                                        <img src="/images/program/is-cert.svg" className="img-fluid lazyload blur-up lazyloaded" alt="" />
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="target-info p-2">
                                                        <div className="py-2">
                                                            <Slider disabled className="slider-program-dh" value={li.collectedAmount} max={li.targetAmount} />
                                                        </div>
                                                        <div className="d-flex flex-row justify-content-between py-2">
                                                            <div className="amount">{'Rp ' + (li.collectedAmount || 0).toLocaleString()}</div>
                                                            <div className="target-amount">{`Target Rp ${(li.targetAmount || 0).toLocaleString()}`}</div>
                                                        </div>
                                                    </div>

                                                    <div className="donation-info p-2">
                                                        <div className="d-flex flex-row justify-content-between">
                                                            <div className="d-flex flex-row justify-content-arround">
                                                                <div className="donatur-icon">
                                                                    <img src="/images/icons/peoples.svg" alt="" className="lazyload blur-up lazyloaded" />
                                                                </div>
                                                                <div className="donatur-amount px-2">
                                                                    {li.donorAmount || 0}
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
                                                                    {li.remainingDays || 0}
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
                                        <div className="love" onClick={() => onBookMark(li._id, i)}>
                                            <img src={`/images/icons/${li.bookmarked ? 'love-fill.svg' : 'love.svg'}`} className="img-fluid" alt="" srcSet="" />
                                        </div>
                                    </div>
                            }
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
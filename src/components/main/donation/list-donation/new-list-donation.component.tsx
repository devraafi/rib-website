import MainComponent from '@Components/layout/main/main-layout.component';
import React, { Component, useEffect, useState } from 'react';
import _ from 'lodash';
import { Slider } from 'primereact/slider';
import Link from 'next/link';
import { DonationRestServices } from '../donation-rest.service';
import { Input, Skeleton } from 'antd';
import { AuthenticationService } from 'services/auth/aut.service';
import { RequestService } from 'services/request.services';
import { NotifService } from 'services/feedback/notif.service';
import { useRouter } from 'next/router';
import { Pagination } from 'antd';

const notif: NotifService = new NotifService;
const auth: AuthenticationService = new AuthenticationService;
const donationRestService: DonationRestServices = new DonationRestServices(process.env.staging || '', auth.axiosInterceptors);
const { handleRequest } = new RequestService;
const NewDonationList = () => {
    const fakeLoading = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [response, setResponse] = useState<any>({});
    const [categories, setCategories] = useState<any[]>();
    const [category, setCategory] = useState<any>();
    const [skeleton, setSkeleton] = useState('');
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState({
        programCategoryId: null,
        keyword: '',
        take: 9,
        skip: 0,
        current: 1
    });
    const router = useRouter();
    const { query }: any = router;

    function onPageChange(page: number, pageSize: number | undefined) {
        setParams({
            ...params,
            current: page,
            skip: (page - 1) * (params.take)
        })
    }

    function itemRender(current: number, type: any, originalElement: any) {
        if (type === 'prev') {
            return <img src="/images/icons/arrow-page-left.svg" alt="" srcSet="" />;
        }
        if (type === 'next') {
            return <img src="/images/icons/arrow-page-right.svg" alt="" srcSet="" />;
        }
        return originalElement;
    }

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
                    let data = response.data;
                    data[i].bookmarked = res;
                    setResponse({
                        ...response,
                        data
                    })
                }
            })
        } else {
            notif.show({
                type: 'error',
                title: 'Error',
                description: 'Harap Login terlebih dahulu',
            });
        }
    }

    function loadDonation() {
        setLoading(true)
        const obs = donationRestService.loadProgram(params);
        handleRequest({
            obs,
            onDone: (res) => {
                setResponse(res);
                setLoading(false);
            }
        })
    }

    function loadCategory() {
        const obs = donationRestService.loadCategory();
        handleRequest({
            obs,
            onDone: (res) => res.data && setCategories(res.data)
        });
    }


    useEffect(() => {
        if (query && query.category) {
            console.log(query);
            setParams({
                ...params,
                programCategoryId: query.category
            })
        } else {
            setParams({
                ...params,
                programCategoryId: null
            })
        }
    }, [router]);

    useEffect(() => {
        if (!params.programCategoryId) {
            loadCategory();
        }
        if (params && params.programCategoryId) {
            const category = _.find(categories, { '_id': params.programCategoryId });
            console.log(category);
            setCategory(category);
        }
        console.log(params.programCategoryId);
        loadDonation();
    }, [params, params.programCategoryId]);

    return <MainComponent
        title="Donasi | Ruang Insan Berbagi"
        description="Ruang Insan Berbagi"
        pageId="donasi-page-dh"
    >
        <div className="container-fluid donasi-list-section new p-0">
            <div className="px-3 px-lg-0">
                <div className="new-img-wrapper container position-relative">
                    <img src="/images/backgrounds/donation-list.svg" className="img-fluid" alt="" />
                    <div className="new-search col-lg-7 mx-auto">
                        <Input onChange={(e) => setParams({
                            ...params,
                            keyword: e.target.value
                        })} onPressEnter={() => loadDonation()} className="input-donation-list" placeholder="Cari yang ingin kamu bantu" suffix={
                            <div className="pointer" onClick={() => loadDonation()}>
                                <img src="/images/icons/search-suff.svg" className="img-fluid" alt="" srcSet="" />
                            </div>
                        } />
                    </div>
                </div>
                {
                    ((params && params.programCategoryId) && category) ?
                        <div className="new-title py-4">
                            Program {category?.name}
                        </div>
                        :
                        <>
                            <div className="new-title py-4">
                                Hadirkan Cerita Kebaikan Setiap Hari, Wujud Nyata Berbagi untuk Ringankan Duka
                            </div>
                            <div className="container container-list px-0">
                                <div className="py-2 new-subtitle mt-4 mb-1">
                                    Kategori Donasi
                                </div>
                                <div className="row row-cols-5">
                                    {
                                        categories && categories?.map((ctg) => (
                                            <Link href={`/donasi?category=${ctg._id}`}>
                                                <div className="col-lg-auto col-4 p-2 pointer">
                                                    <div className="img-categori">
                                                        {
                                                            ctg.fileUrl ? <img src={ctg.fileUrl} alt="" srcSet="" className="imooge" /> : <div className="imooge">
                                                                {/* <div className="tit">
                                                {ctg?.name[0]}
                                            </div> */}
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="new-subtitle sm text-center">
                                                        {ctg?.name}
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        </>
                }
                <div className="container container-list px-0">
                    {
                        (params.programCategoryId && category) &&
                        <div className="py-2 new-subtitle">
                            Program Ruang Insan Berbagi
                        </div>
                    }
                    <div className="list-wrapper">
                        <div className="row">
                            {
                                loading ?
                                    fakeLoading.map((li: any, i: number) => (
                                        <div className="col-lg-4 col-sm-6 col-12 col-md-4 py-2" key={i}>
                                            <Skeleton.Input active className="w-100 card-program" />
                                        </div>
                                    )) :
                                    (response && response.data) ? response.data.map((list: any, i: number) => (
                                        <div className="col-lg-4 col-sm-6 col-12 col-md-4 py-2" key={i}>
                                            {
                                                skeleton == list._id ?
                                                    <Skeleton.Input active className="w-100 card-program h-100" /> :
                                                    <div className="card-program animate__animated animate__bounceIn">
                                                        <Link href={`/donasi/detail?title=${list.name}&id=${list._id}`}>
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
                                                            <img src={`/images/icons/${list.bookmarked ? 'love-fill.svg' : 'love.svg'}`} className="img-fluid" alt="" srcSet="" />
                                                        </div>
                                                    </div>
                                            }
                                        </div>
                                    ))
                                        :
                                        <div className="p-3 text-center">
                                            Tidak Ada Data
                                        </div>
                            }
                        </div>
                        {
                            // response &&
                            <div className="row mt-3">
                                <div className="col-lg-6">
                                    <Pagination itemRender={itemRender} className="pagination-rib" defaultCurrent={1} current={params.current} total={response ? response.total : 0} pageSize={params.take} onChange={onPageChange} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    </MainComponent>
}

export default NewDonationList;
import MainComponent from '@Components/layout/main/main-layout.component';
import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import _ from 'lodash';
import { Slider } from 'primereact/slider';
import Link from 'next/link';

const donationList = [
    {
        title: 'Sodales ornare commodo non dui vivamus a lectus',
        imageUrl: '/images/donasi/list/1.png',
        profileInfo: {
            name: 'Cersei Lannister',
            imageUrl: '/images/user/exp/1.svg'
        },
        amount: 2500000,
        targetAmount: 3000000,
        donaturAmount: 450,
        dayAmount: 65,
        category: 'Pendidikan'
    },
    {
        title: 'Sodales ornare commodo non dui vivamus a lectus',
        imageUrl: '/images/donasi/list/1.png',
        profileInfo: {
            name: 'Cersei Lannister',
            imageUrl: '/images/user/exp/1.svg'
        },
        amount: 2500000,
        targetAmount: 3000000,
        donaturAmount: 450,
        dayAmount: 65,
        category: 'Pendidikan'
    },
    {
        title: 'Sodales ornare commodo non dui vivamus a lectus',
        imageUrl: '/images/donasi/list/1.png',
        profileInfo: {
            name: 'Cersei Lannister',
            imageUrl: '/images/user/exp/1.svg'
        },
        amount: 2500000,
        targetAmount: 3000000,
        donaturAmount: 450,
        dayAmount: 65,
        category: 'Pendidikan'
    },
    {
        title: 'Sodales ornare commodo non dui vivamus a lectus',
        imageUrl: '/images/donasi/list/1.png',
        profileInfo: {
            name: 'Cersei Lannister',
            imageUrl: '/images/user/exp/1.svg'
        },
        amount: 2500000,
        targetAmount: 3000000,
        donaturAmount: 450,
        dayAmount: 65,
        category: 'Pendidikan'
    },
    {
        title: 'Sodales ornare commodo non dui vivamus a lectus',
        imageUrl: '/images/donasi/list/1.png',
        profileInfo: {
            name: 'Cersei Lannister',
            imageUrl: '/images/user/exp/1.svg'
        },
        amount: 2500000,
        targetAmount: 3000000,
        donaturAmount: 450,
        dayAmount: 65,
        category: 'Kesehatan'
    },
    {
        title: 'Sodales ornare commodo non dui vivamus a lectus',
        imageUrl: '/images/donasi/list/1.png',
        profileInfo: {
            name: 'Cersei Lannister',
            imageUrl: '/images/user/exp/1.svg'
        },
        amount: 2500000,
        targetAmount: 3000000,
        donaturAmount: 450,
        dayAmount: 65,
        category: 'Kesehatan'
    },
    {
        title: 'Sodales ornare commodo non dui vivamus a lectus',
        imageUrl: '/images/donasi/list/1.png',
        profileInfo: {
            name: 'Cersei Lannister',
            imageUrl: '/images/user/exp/1.svg'
        },
        amount: 2500000,
        targetAmount: 3000000,
        donaturAmount: 450,
        dayAmount: 65,
        category: 'Kesehatan'
    },
    {
        title: 'Sodales ornare commodo non dui vivamus a lectus',
        imageUrl: '/images/donasi/list/1.png',
        profileInfo: {
            name: 'Cersei Lannister',
            imageUrl: '/images/user/exp/1.svg'
        },
        amount: 2500000,
        targetAmount: 3000000,
        donaturAmount: 450,
        dayAmount: 65,
        category: 'Kesehatan'
    },
    {
        title: 'Sodales ornare commodo non dui vivamus a lectus',
        imageUrl: '/images/donasi/list/1.png',
        profileInfo: {
            name: 'Cersei Lannister',
            imageUrl: '/images/user/exp/1.svg'
        },
        amount: 2500000,
        targetAmount: 3000000,
        donaturAmount: 450,
        dayAmount: 65,
        category: 'Lingkungan'
    },
    {
        title: 'Sodales ornare commodo non dui vivamus a lectus',
        imageUrl: '/images/donasi/list/1.png',
        profileInfo: {
            name: 'Cersei Lannister',
            imageUrl: '/images/user/exp/1.svg'
        },
        amount: 2500000,
        targetAmount: 3000000,
        donaturAmount: 450,
        dayAmount: 65,
        category: 'Lingkungan'
    },
    {
        title: 'Sodales ornare commodo non dui vivamus a lectus',
        imageUrl: '/images/donasi/list/1.png',
        profileInfo: {
            name: 'Cersei Lannister',
            imageUrl: '/images/user/exp/1.svg'
        },
        amount: 2500000,
        targetAmount: 3000000,
        donaturAmount: 450,
        dayAmount: 65,
        category: 'Lingkungan'
    },
    {
        title: 'Sodales ornare commodo non dui vivamus a lectus',
        imageUrl: '/images/donasi/list/1.png',
        profileInfo: {
            name: 'Cersei Lannister',
            imageUrl: '/images/user/exp/1.svg'
        },
        amount: 2500000,
        targetAmount: 3000000,
        donaturAmount: 450,
        dayAmount: 65,
        category: 'Lingkungan'
    },
];


const filters = [
    'Bandung', 'Jakarta', 'Kesehatan', 'Pendidikan', 'Lingkungan', 'Umat', 'More Filters'
];

export default class DonationList extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            rows: []
        }

    }

    componentDidMount() {
        this.setState({
            rows: _.chain(donationList)
                // Group the elements of Array based on `color` property
                .groupBy('category')
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => ({ category: key, list: value }))
                .value()
        })
    }

    render() {
        return (
            <MainComponent
                title="Donasi List Lazis Darul Hikam"
                description="lazis Darul Hikam"
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
                                100+ Program Donasi
                            </div>
                            <div className="header py-3">
                                Integer tellus dui amet.
                            </div>
                            <div className="d-flex flex-row flex-wrap">
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
                            </div>
                        </div>
                        <div className="list-wrapper">
                            {
                                this.state.rows.map((row: any, i: number) => {
                                    return (
                                        <div className="row" key={i}>
                                            <div className="col-12 py-3">
                                                <div className="d-flex flex-row justify-content-between">
                                                    <div className="title-category">
                                                        {row.category}
                                                    </div>
                                                    <div className="paginator"></div>
                                                </div>
                                            </div>
                                            {
                                                row.list.map((list: any, i: number) => {

                                                    return (
                                                        <div className="col-lg-3 col-sm-6 col-12 col-md-4 py-2" key={i}>
                                                            <Link href="/donasi/detail">
                                                                    <div className="card-program">
                                                                        <div className="d-flex flex-column">
                                                                            <div className="program-image">
                                                                                <img src={list.imageUrl} alt="" className='lazyload blur-up lazyloaded' />
                                                                            </div>
                                                                            <div className="program-info p-3">
                                                                                <div className="title px-2">
                                                                                    {list.title}
                                                                                </div>

                                                                                <div className="profile-info py-3 px-2">
                                                                                    <div className="d-flex flex-row justify-content-between">
                                                                                        <div className="d-flex flex-row">
                                                                                            <div className="profile-img">
                                                                                                <img src={list.profileInfo.imageUrl} alt="" className="lazyload blur-up lazyloaded" />
                                                                                            </div>
                                                                                            <div className="ml-3 profile-name">
                                                                                                {list.profileInfo.name}
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
                                                                                        <Slider disabled className="slider-program-dh" value={list.amount} max={list.targetAmount} />
                                                                                    </div>
                                                                                    <div className="d-flex flex-row justify-content-between py-2">
                                                                                        <div className="amount">{'Rp. ' + (list.amount).toLocaleString()}</div>
                                                                                        <div className="target-amount">{`Target Rp. ${(list.targetAmount).toLocaleString()}`}</div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="donation-info p-2">
                                                                                    <div className="d-flex flex-row justify-content-between">
                                                                                        <div className="d-flex flex-row justify-content-arround">
                                                                                            <div className="donatur-icon">
                                                                                                <img src="/images/icons/peoples.svg" alt="" className="lazyload blur-up lazyloaded" />
                                                                                            </div>
                                                                                            <div className="donatur-amount px-2">
                                                                                                {(list.donaturAmount).toLocaleString() || 0}
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
                                                                                                {list.dayAmount}
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
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </MainComponent>
        )
    }
}
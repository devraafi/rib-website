import React, { useState } from 'react';
import _ from 'lodash';
import { Slider } from 'primereact/slider';
const danation = {
    amount: 1600000000,
    targetAmount: 2500000000,
    user: {
        name: 'Jon Snow Foundation',
        imageUrl: '/images/user/exp/1.svg',
        isCertified: true
    },
    donaturAmount: 1020,
    dayAmount: 65
};

const priceList = [20000, 50000, 100000, 250000, 500000, 1000000];

const MainDonation = (props: any) => {
    function handleClick() {
        props.onDone(1);
    }

    const [donateAmount, setDonateAmount] = useState(0)
    return (
        <div className="main-donation m-auto p-3">
            <div className="title-support px-2 py-3">
                Dukung Program Ini
                    </div>
            <div className="d-flex flex-column program-wrapper">
                <div className="program-info p-3">
                    <div className="target-info p-2">
                        <div className="py-2">
                            <Slider disabled className="slider-program-dh" value={danation.amount} max={danation.targetAmount} />
                        </div>
                        <div className="d-flex flex-row justify-content-between py-2">
                            <div className="amount">{'Rp. ' + (danation.amount).toLocaleString()}</div>
                            <div className="target-amount">{`Target Rp. ${(danation.targetAmount).toLocaleString()}`}</div>
                        </div>
                    </div>
                    <div className="profile-info py-3 px-2">
                        <div className="d-flex flex-row justify-content-between">
                            <div className="d-flex flex-row">
                                <div className="profile-img">
                                    <img src={danation.user.imageUrl} alt="" className="lazyload blur-up lazyloaded" />
                                </div>
                                <div className="ml-3 profile-name">
                                    {danation.user.name}
                                </div>
                            </div>
                            <div className="is-certified">
                                {
                                    danation.user.isCertified && (
                                        <img src="/images/program/is-cert.svg" className="img-fluid lazyload blur-up lazyloaded" alt="" />
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="donation-info p-2">
                        <div className="d-flex flex-row justify-content-between">
                            <div className="d-flex flex-row justify-content-arround">
                                <div className="donatur-icon">
                                    <img src="/images/icons/peoples.svg" alt="" className="lazyload blur-up lazyloaded" />
                                </div>
                                <div className="donatur-amount px-2">
                                    {(danation.donaturAmount).toLocaleString() || 0}
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
                                    {danation.dayAmount}
                                </div>
                                <div className="days">
                                    Hari
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="donate-price px-3">
                    <div className="row justify-content-between">
                        {
                            priceList.map((price, i) => {
                                return (
                                    <div className="col-4 px-1 text-center py-1" key={i}>
                                        <button onClick={() => setDonateAmount(price)} className={'btn btn-dh-outline-3 fixmen ' + (donateAmount == price ? 'active' : '')}>
                                            Rp. {(price).toLocaleString()}
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="row py-3">
                        <div className="col-12 my-1">
                            <input type="number" onChange={(e: any) => setDonateAmount(e.target.value)} name="" id="" value={donateAmount} placeholder="Rp 0,00" className="form-control dh-input" />
                        </div>
                        <div className="col-12 my-1">
                            <button className="btn btn-dh-secondary w-100 rounded-lg" onClick={() => handleClick()}>
                                Donate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sharepx-3">
                <div className="row">
                    <div className="col-12 pt-4 share">
                        <div className="text-center py-2">Sebarkan Program Melalui</div>
                        <div className="d-flex flex-row justify-content-between px-lg-5 px-3">
                            <div className="d-flex">
                                <img src="/images/icons/sosmed/inactive/wa.svg" alt="" className="img-fluid" />
                            </div>
                            <div className="d-flex">
                                <img src="/images/icons/sosmed/inactive/fb.svg" alt="" className="img-fluid" />
                            </div>
                            <div className="d-flex">
                                <img src="/images/icons/sosmed/inactive/tw.svg" alt="" className="img-fluid" />
                            </div>
                            <div className="d-flex">
                                <img src="/images/icons/sosmed/inactive/wf.svg" alt="" className="img-fluid" />
                            </div>
                            <div className="d-flex">
                                <img src="/images/icons/sosmed/inactive/mail.svg" alt="" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainDonation;
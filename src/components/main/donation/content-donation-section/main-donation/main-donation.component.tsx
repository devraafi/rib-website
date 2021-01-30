import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Slider } from 'primereact/slider';
import Link from 'next/link';
import { InputNumber } from 'primereact/inputnumber';
import { DonationService } from '../../donation.services';
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
const donationService: DonationService = new DonationService;
const MainDonation = (props: any) => {
    const { data } = props;
    const [donateAmount, setDonateAmount] = useState(0);
    function handleClick() {
        donationService.setTotal(donateAmount);
        props.onDone ? props.onDone(donateAmount) : '';
    }

    const scrollFunction = () => {
        const windTop = window.pageYOffset;
        const footerTop: any = document.getElementById('footer-dh')?.offsetTop;
        const mainFormHeight: any = document.getElementById('main-donation')?.offsetHeight;

        if ((windTop + mainFormHeight + 200) > footerTop) {
            document.getElementById('main-donation')?.classList.remove('syur')
            document.getElementById('main-donation')?.classList.add('solute')
            console.log('1-solute');

        } else {
            document.getElementById('main-donation')?.classList.add('syur');
            document.getElementById('main-donation')?.classList.remove('solute');
            if (window.pageYOffset > 70) {

                document.getElementById('main-donation')?.classList.add('nice');
            } else {
                document.getElementById('main-donation')?.classList.remove('nice');
            }
        }
    }

    useEffect(() => {
        window.onscroll = function () { scrollFunction() };
    });

    return (
        <div className="main-donation m-auto p-3" id="main-donation">
            <div className="title-support px-2 py-3">
                Dukung Program Ini
            </div>
            <div className="d-flex flex-column program-wrapper">
                <div className="program-info p-3">
                    <div className="target-info p-2">
                        <div className="py-2">
                            <Slider disabled className="slider-program-dh" value={data.currentAmount} max={data.targetAmount} />
                        </div>
                        <div className="d-flex flex-row justify-content-between py-2">
                            <div className="amount text-left">{'Rp. ' + (data.currentAmount).toLocaleString()}</div>
                            <div className="target-amount">{`Target Rp. ${(data.targetAmount).toLocaleString()}`}</div>
                        </div>
                    </div>
                    <div className="profile-info py-3 px-2">
                        <div className="d-flex flex-row justify-content-between">
                            {/* <div className="d-flex flex-row">
                                <div className="profile-img">
                                    {
                                        <img src={data.user ? data.user.imageUrl : '/images/user/placeholder.svg'} alt="" className="lazyload blur-up lazyloaded" />
                                    }
                                </div>
                                <div className="ml-3 profile-name">
                                    {data.user ? data.user.name : 'Anonim'}
                                </div>
                            </div> */}
                            <div className="is-certified">
                                {
                                    data.isPartnerProgram && (
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
                                    {data.collectedAmount || 0}
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
                                    {data.remainingDays || 0}
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
                            <InputNumber locale="id-ID"
                                placeholder="Rp 0"
                                currency="IDR" onChange={(e) => setDonateAmount(e.value)}
                                name=""
                                id=""
                                value={donateAmount}
                                inputClassName="input-dh text-right w-100"
                                className="w-100"
                            />
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
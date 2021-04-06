import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Slider } from 'primereact/slider';
import Link from 'next/link';
import { InputNumber } from 'primereact/inputnumber';
import { DonationService } from '../../donation.services';
import { Stepper } from '@Components/basics/stepper/stepper.component';

const priceList = [10000, 20000, 50000, 100000, 200000, 500000];
const donationService: DonationService = new DonationService;
const MainDonation = (props: any) => {
    const { data, isInfaq } = props;
    const [donateAmount, setDonateAmount] = useState(0);
    const [activePkg, setActivePkg] = useState(0);
    const [qty, setQty] = useState(1);
    const [isPackage, setIsPackage] = useState(false);
    const baseUrl: any = process.env.baseUrl;

    function handleClick() {
        import("react-facebook-pixel")
            .then((x) => x.default)
            .then((ReactPixel) => {
                ReactPixel.init('809047500028527');
                ReactPixel.fbq('track', 'AddToCart', {
                    program_name: props?.data?.name || '-',
                    value: donateAmount,
                    currency: 'IDR'
                });
            });
        donationService.setPayload(donateAmount, isInfaq);
        props.onDone ? props.onDone(donateAmount, isInfaq) : '';
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

    function onUpdateQty(val: number) {
        setQty(val);
        const newdonateAmount = activePkg * val;
        setDonateAmount(newdonateAmount)
    }

    function shareCampaign(data: any, target: 'facebook' | 'twitter' | 'whatsapp') {
        let url;
        const templateTitle = `Sahabat+Insan+Berbagi%2C+yuk bantu ${data.name} %0D%0A%23RuangInsanBerbagi%0D%0A`;

        switch (target) {
            case 'whatsapp':
                url = "https://wa.me/?text=" + templateTitle + '%0a%0a' + baseUrl + "/donasi/detail?title=" + data.route + "&id=" + data._id;
                break;
            case 'twitter':
                url = "https://twitter.com/intent/tweet?text=" + templateTitle + '%0a%0a' + baseUrl + "/donasi/detail?title=" + data.route + "&id=" + data._id;
                break;
            case 'facebook':
                url = "https://www.facebook.com/sharer/sharer.php?u=" + baseUrl + "/donasi/detail?title=" + data.route  + "&id=" + data._id + "&quote=" + templateTitle;
                break;
        }

        window.open(url, "Popup", "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")
    }

    useEffect(() => {
        window.onscroll = function () { scrollFunction() };
    });

    useEffect(() => {
        const pkg: boolean = data.donationAmountOption && (data.donationAmountOption.length > 0);
        setIsPackage(pkg);
    }, [data])

    return (
        <div className="main-donation m-auto p-3" id="main-donation form-donation">
            <div className="title-support px-2 py-1">
                {
                    isInfaq ? 'Percayakan infak mu dengan Ruang Insan Berbagi' : 'Dukung Program Ini'
                }
            </div>
            <div className="d-flex flex-column program-wrapper">
                <div className={`${isInfaq ? 'py-2' : 'px-3 py-1'} program-info`}>
                    <div className="target-info p-2">
                        {
                            !isInfaq && <div className="py-2">
                                <Slider disabled className="slider-program-dh" value={data.collectedAmount} max={data.targetAmount} />
                            </div>
                        }
                        <div className="d-flex flex-row justify-content-between py-2">
                            <div className="amount text-left align-self-center">{'Rp' + (data.collectedAmount || 0).toLocaleString()}</div>
                            {
                                isInfaq && <div className="donation-info p-2">
                                    <div className="d-flex flex-row justify-content-between">
                                        <div className="d-flex flex-row justify-content-arround">
                                            <div className="donatur-icon">
                                                <img src="/images/icons/peoples.svg" alt="" className="lazyload blur-up lazyloaded" />
                                            </div>
                                            <div className="donatur-amount px-2">
                                                {data.donorAmount || 0}
                                            </div>
                                            <div className="donasi">
                                                Donasi
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                !isInfaq &&
                                <div className="target-amount">{`Target Rp${(data.targetAmount || 0).toLocaleString()}`}</div>
                            }
                        </div>
                        {
                            isInfaq &&
                            <div className="col-12 p-0 mt-1">
                                <div className="text-left " style={{ fontSize: '12px' }}>
                                    Jumlah Donasi
                                </div>
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
                        }
                    </div>
                    {
                        !isInfaq &&
                        <div className="profile-info py-1 px-2 d-none">
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
                    }

                    {
                        !isInfaq &&
                        <div className="donation-info p-2">
                            <div className="d-flex flex-row justify-content-between">
                                <div className="d-flex flex-row justify-content-arround">
                                    <div className="donatur-icon">
                                        <img src="/images/icons/peoples.svg" alt="" className="lazyload blur-up lazyloaded" />
                                    </div>
                                    <div className="donatur-amount px-2">
                                        {data.donorAmount || 0}
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
                    }
                </div>
                <div className="donate-price px-3 overflow-hidden">
                    <div className="row justify-content-lg-between justify-content-center px-lg-2 py-2">
                        {
                            !isPackage && priceList.map((price, i) => {
                                return (
                                    <div className="col-lg-4 col-auto px-1 text-center py-1" key={i}>
                                        <button onClick={() => setDonateAmount(price)} className={'btn btn-dh-outline-3 fixmen ' + (donateAmount == price ? 'active' : '')}>
                                            Rp{(price).toLocaleString()}
                                        </button>
                                    </div>
                                )
                            })
                        }
                        {
                            isPackage && data.donationAmountOption.map((price: any, i: number) => (
                                <div className="col-4 px-1 text-center py-1" key={i}>
                                    <button onClick={() => { setDonateAmount(price); setActivePkg(price) }} className={'btn btn-dh-outline-3 fixmen ' + (activePkg == price ? 'active' : '')}>
                                        Rp{(price).toLocaleString()}
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                    {
                        isPackage && <div className="row py-2">
                            <div className="col-lg-12">
                                <Stepper
                                    className="justify-content-center"
                                    min={1}
                                    value={qty}
                                    type="basic"
                                    onChange={(val: any) => onUpdateQty(+val)}
                                />
                            </div>
                        </div>
                    }
                    <div className="row py-1">
                        {!isInfaq &&
                            <div className="col-12 my-1">
                                <InputNumber locale="id-ID"
                                    disabled={isPackage}
                                    placeholder="Rp 0"
                                    currency="IDR" onChange={(e) => setDonateAmount(e.value)}
                                    name=""
                                    id=""
                                    value={donateAmount}
                                    inputClassName="input-dh text-right w-100"
                                    className="w-100"
                                />
                            </div>
                        }
                        <div className="col-12 my-1">
                            <button className="btn btn-dh-secondary w-100 rounded-lg" disabled={!donateAmount || ((data.remainingDays <= 0) && !isInfaq)} onClick={() => handleClick()}>
                                Donasi
                            </button>

                        </div>
                    </div>
                </div>
            </div>
            <div className="sharepx-3">
                <div className="row">
                    <div className="col-12 pt-1 share">
                        <div className="text-center py-2">Sebarkan Program Melalui</div>
                        <div className="d-flex flex-row justify-content-between px-lg-5 px-3">
                            <div className="d-flex">
                                <a onClick={() => shareCampaign(data, 'whatsapp')}>
                                    <img src="/images/icons/sosmed/inactive/wa.svg" alt="" className="img-fluid" />
                                </a>
                            </div>
                            <div className="d-flex">
                                <a onClick={() => shareCampaign(data, 'facebook')}>
                                    <img src="/images/icons/sosmed/inactive/fb.svg" alt="" className="img-fluid" />
                                </a>
                            </div>
                            <div className="d-flex">
                                <a onClick={() => shareCampaign(data, 'twitter')}>
                                    <img src="/images/icons/sosmed/inactive/tw.svg" alt="" className="img-fluid" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainDonation;
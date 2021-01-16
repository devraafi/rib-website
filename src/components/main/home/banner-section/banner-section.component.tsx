import React from 'react';
import data from './fake-data.json';
import moment from 'moment';
import _ from 'lodash';
import Slider from 'react-slick';
import Link from 'next/link';

export default class BannerSection extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.theThreeSlider = this.theThreeSlider.bind(this)
        this.state = {
            bannerData: data
        }
    }

    theThreeSlider() {
        const list = this.state.bannerData.bannerList;
        const arrayTest = [1, 2, 3]
        let settings = {
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            vertical: true,
            verticalSwiping: true,
            autoplay: true,
            speed: 2000,
            autoplaySpeed: 0
        };
        return (
            <div className="banner-slider container d-none d-lg-block">
                {
                    <div className="d-flex flex-row justify-content-center justify-content-lg-end">
                        {
                            arrayTest.map((test, i) => {
                                settings.autoplaySpeed += i == 0 ? 1500 : i == 2 ? 300 : 2000;
                                return (
                                    <div className={'banner-list ' + (i == 0 ? 'one' : i == 2 ? 'three' : 'two')} key={i}>
                                        <Slider {...settings} className="slide-index">
                                            {
                                                list.map((li: any, i: number) => {
                                                    return <div className="col-auto px-1 m-ato" key={i}>
                                                        <div className="banner-item">
                                                            <img src={li.imagesUrl} alt="" className="lazyload blur-up lazyloaded" />
                                                            <div className="title p-4">{li.bannerTitle}</div>
                                                        </div>
                                                    </div>
                                                })
                                            }
                                        </Slider>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        )
    }

    render() {
        let bannerList = [];
        bannerList = this.state.bannerData.bannerList;
        return (
            <>
                {this.theThreeSlider()}
                <div className="container banner-section py-5 px-4">
                    <div className="row justify-content-center justify-content-lg-start col-lg-7 px-0">
                        <div className="text-date col-12 text-center text-lg-left">
                            {moment(new Date).format('MMMM YYYY')}
                        </div>
                        <div className="title col-12 text-center text-lg-left">
                            Ambil tindakan, <br /> bantu sesama
                        </div>
                        <div className="description col-lg-9 col-12 text-center text-lg-left py-3">
                            {this.state.bannerData.description}
                        </div>
                        <div className="to col-12 py-4 text-center text-lg-left">
                            <Link href="/donasi">
                                <button className="btn btn-dh-primary">
                                    {this.state.bannerData.to.label}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
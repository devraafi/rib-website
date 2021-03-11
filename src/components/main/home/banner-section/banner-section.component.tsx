import React, { useEffect, useState } from 'react';
import data from './fake-data.json';
import moment from 'moment';
import _ from 'lodash';
import Slider from 'react-slick';
import Link from 'next/link';

export const BannerSection = (props: {
    data: any
}) => {
    const [list, setList] = useState<any>(null);
    const arrayTest = [1, 2, 3]
    const settings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        autoplay: true,
        speed: 3000,
    };

    useEffect(() => {
        if (props.data) {
            setList(props.data)
        }
    }, [props.data])

    const threeSlider = () => (
        <div className="banner-slider container d-none d-lg-block" >

            < div className="d-flex flex-row justify-content-center justify-content-lg-end" >
                {/* {
                        arrayTest.map((test, i) => {
                            return (
                                <div className={'banner-list ' + (i == 0 ? 'one' : i == 2 ? 'three' : 'two')} key={i}>
                                    <Slider {...settings} autoplaySpeed={(i == 0) ? 1500 : (i == 2) ? 300 : 2000} className="slide-index">
                                        {
                                            list && list.map((li: any, i: number) => {
                                                return <div className="col-auto px-1 m-ato" key={i}>
                                                    <div className="banner-item animate__animated animate__bounceIn">
                                                        {li.fileUrl ?
                                                            <img src={li.fileurl || ''} alt="" className="lazyload blur-up lazyloaded" />
                                                            : <div className="imooge"></div>
                                                        }
                                                        <div className="title p-4">{li.name}</div>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </Slider>
                                </div>
                            )
                        })
                    } */}

                <div className={'banner-list one'}>
                    <Slider infinite={true} key={'wou'} {...settings} autoplaySpeed={3000} className="slide-index">
                        {
                            list && list.map((li: any, i: number) => {
                                return <div className="col-auto px-1 m-ato" key={i}>
                                    <div className="banner-item animate__animated animate__bounceIn">
                                        {li.fileUrl ?
                                            <img src={li.fileUrl || ''} alt="" className="lazyload blur-up lazyloaded" />
                                            : <div className="imooge"></div>
                                        }
                                        <div className="title p-4">{li.name}</div>
                                    </div>
                                </div>
                            })
                        }
                    </Slider>
                </div>

                <div className={'banner-list two'}>
                    <Slider infinite={true} key={'wou-1'} {...settings} autoplaySpeed={3100} className="slide-index">
                        {
                            list && _.reverse(list).map((li: any, i: number) => {
                                return <div className="col-auto px-1 m-ato" key={i}>
                                    <div className="banner-item animate__animated animate__bounceIn">
                                        {li.fileUrl ?
                                            <img src={li.fileUrl || ''} alt="" className="lazyload blur-up lazyloaded" />
                                            : <div className="imooge"></div>
                                        }
                                        <div className="title p-4">{li.name}</div>
                                    </div>
                                </div>
                            })
                        }
                    </Slider>
                </div>

                <div className={'banner-list three'}>
                    <Slider infinite={true} key={'wou-2'} {...settings} autoplaySpeed={2900} className="slide-index">
                        {
                            list && list.map((li: any, i: number) => {
                                return <div className="col-auto px-1 m-ato" key={i}>
                                    <div className="banner-item animate__animated animate__bounceIn">
                                        {li.fileUrl ?
                                            <img src={li.fileUrl || ''} alt="" className="lazyload blur-up lazyloaded" />
                                            : <div className="imooge"></div>
                                        }
                                        <div className="title p-4">{li.name}</div>
                                    </div>
                                </div>
                            })
                        }
                    </Slider>
                </div>
            </div >

        </div>
    )

    return <>
        { threeSlider()}
        < div className="container banner-section py-5 px-4" >
            <div className="row justify-content-center justify-content-lg-start col-lg-7 px-0">
                <div className="text-date col-12 text-center text-lg-left">
                    {moment(new Date).format('MMMM YYYY')}
                </div>
                <div className="title col-12 text-center text-lg-left">
                    {/* Ambil tindakan, <br className="d-none d-lg-block" /> bantu sesama */}
                    Get involved in making the dream a reality
            </div>
                <div className="description col-lg-9 col-12 text-center text-lg-left py-3">
                    Serahkan donasi atau ciptakan pengalangan dana untuk membantu lebih banyak orang di sekitar kita menjadi lebih baik.
                </div>
                <div className="to col-12 py-4 text-center text-lg-left">
                    <Link href="/donasi">
                        <button className="btn btn-dh-primary">
                            Donasi Sekarang
                        </button>
                    </Link>
                </div>
            </div>
        </div >
    </>
}
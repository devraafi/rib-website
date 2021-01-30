import React, { Component, useEffect, useState } from 'react';
import Slider from 'react-slick';

export const FundaraisingSection = (props: { data: any }) => {
    const [data, setData] = useState<any>(null);
    useEffect(() => {
        if (props.data) {
            setData(props.data)
        }
    }, [props.data])
    const settings = {
        infinite: false,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    const fundaraisingList = () => (
        <Slider key={'asd'} className="slider-fundaraising" {...settings}>
            {
                data && data.map((list: any, i: number) => {
                    return (
                        <div className="col-12 p-0" key={i}>
                            <div className="wrapper-img-fundaraising">
                                {
                                    list.fileUrl ?
                                        <img src={list.fileUrl || ''} alt="" className="lazyload blur-up lazyloaded" />
                                        : <div className="imooge"></div>
                                }
                                <div className="title col-lg-7 col-12 p-4">
                                    {list.name}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </Slider>
    )

    return <div className="container-fluid fundaraising-section py-5">
        <div className="bg">
        </div>
        <div className="col-lg-6 col-auto m-auto">
            <div className="header">Penggalangan Dana Mendesak</div>
        </div>
        <div className="col-auto py-3 m-auto">
            <div className="description">
                Segera bantu mereka yang membutuhkan untuk mencapai jumlah target donasi agar dapat disalurkan tepat waktu
        </div>
        </div>

        <div className="slider-wrapper px-3 container-lg">
            {fundaraisingList()}
        </div>

    </div>
}


class NextArrow extends Component<any, any> {
    render() {
        const { className, style, onClick } = this.props;
        return (
            <div
                className={className + ' dh-arrow'}
                style={{ ...style }}
                onClick={onClick}
            >
                <img src="/images/icons/forward.svg" alt="" className="lazyload blur-up lazyloaded" />
            </div>
        )
    }
}

class PrevArrow extends Component<any, any> {
    render() {
        const { className, style, onClick } = this.props;
        return (
            <div
                className={className + ' dh-arrow'}
                style={{ ...style }}
                onClick={onClick}
            >
                <img src="/images/icons/back.svg" alt="" className="lazyload blur-up lazyloaded" />
            </div>
        )
    }
}
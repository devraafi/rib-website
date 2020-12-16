import React, { Component } from 'react';
import Slider from 'react-slick';
import fakeData from './fake-data.json';

export default class FundaraisingSection extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.fundaraisingList = this.fundaraisingList.bind(this)
        this.state = {
            data: fakeData,
        }
    }

    fundaraisingList() {
        const settings = {
            infinite: true,
            speed: 700,
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />
        };
        return (
            <>
                <Slider className="slider-fundaraising" {...settings}>
                    {
                        this.state.data.fundaraisingList.map((list: any, i: number) => {
                            return (
                                <div className="col-12 p-0" key={i}>
                                    <div className="wrapper-img-fundaraising">
                                        <img src={list.imageUrl} alt="" className="lazyload blur-up lazyloaded" />
                                        <div className="title col-lg-7 col-12 p-4">
                                            {list.title}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Slider>
            </>

        )
    }

    render() {
        return (
            <>
                <div className="container-fluid fundaraising-section py-5">
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
                        {this.fundaraisingList()}
                    </div>

                </div>
            </>
        )
    }
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
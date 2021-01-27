import MainComponent from '@Components/layout/main/main-layout.component';
import React, { useState } from 'react';
import Slider from 'react-slick';
import aboutUsJson from './about-us.json';
import GoogleMapReact from 'google-map-react';


const data: any = aboutUsJson;
const { vision } = data;
const { mission } = data;
const { meetTheBoard } = data;
const AboutUsComponent = () => (
    <MainComponent
        title="About Us Lazis Darul Hikam"
        description="lazis Darul Hikam"
        pageId="about-page-dh"
    >
        <div className="container-fluid p-0 about-us-page">
            <div className="p-lg-5 p-3 container ">
                <div className="header-about-us">
                    <div className="title-about-us mb-4 col-lg-8 col-12 p-0">
                        {data.title || ''}
                    </div>
                    <div className="description-about-us">
                        {
                            data.desc.map((label: any, i: number) => (
                                <div className="mb-3">
                                    {label || ''}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="vision-mision-board-section text-center py-5 p-lg-5">
                    <div className="vision py-5 ">
                        <div className="title pb-3 mb-3 col-lg-6 mx-auto">
                            {vision.label || ''}
                        </div>
                        <div className="description py-4">
                            {vision.list || ''}
                        </div>
                    </div>
                    <div className="mision py-5 ">
                        <div className="title pb-3 mb-3 col-lg-6 mx-auto">
                            {mission.label || ''}
                        </div>
                        <div className="row description py-4">
                            {
                                mission.list.map((li: any, i: number) => (
                                    <div className="col-6 p-2" key={i}>
                                        <div className="d-flex flex-column text-center m-auto w-100 px-lg-4">
                                            <div className="icon text-center">
                                                <img src={li.image} alt="" />
                                            </div>
                                            <p className="text-center py-2">
                                                {li.mission || '-'}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="meet-the-board py-5">
                        <div className="title pb-3 mb-3 col-lg-6 mx-auto">
                            {meetTheBoard.label || ''}
                        </div>
                        <div className="meet-the-board-slider">
                            <MeetTheBoardSlide data={meetTheBoard.list} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="maps-section">
                <div className="card-connect">
                    <div className="body-connect p-4">

                        <div className="title-connect mb-4">
                            Let’s Connect
                            </div>

                        <div className="field">
                            <div className="sub-title">Headquarter</div>
                            <div className="sub">Jl. Ir. H. Juanda No.285, Dago, Kecamatan Coblong, Kota Bandung, Jawa Barat 40135</div>
                        </div>

                        <div className="field">
                            <div className="sub-title">Phone</div>
                            <div className="sub">022 - 2505375</div>
                        </div>

                        <div className="field">
                            <div className="sub-title">E-Mail</div>
                            <div className="sub">lazisdarulhikam@gmail.com</div>
                        </div>

                        <div className="field">
                            <div className="sub-title">Social</div>
                            <div className="sub">-</div>
                        </div>
                    </div>

                    <div className="footer-connect p-3">
                        Get Directions
                            </div>

                </div>
                <MapsSection />
            </div>
        </div>
    </MainComponent>

);

const MapsSection = () => {
    const [center, setCenter] = useState({ lat: -6.8796325, lng: 107.6138551 });
    const [zoom, setZoom] = useState(13);

    return <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCrTfNq4x3ndCh4nx7jkljL0NmfIUsB96M' }}
        defaultCenter={center}
        defaultZoom={zoom}
    >
        <Pin
            lat={-6.8796325}
            lng={107.6138551}
        />
    </GoogleMapReact>
}

const Pin = ({ text }: any) => <div style={{ width: '80px' }}>
    <img src="/images/icons/pin.svg" alt="" srcSet="" className="w-100" />
</div>;



const NextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return <div
        className={className + ' dh-arrow next-about'}
        style={{ ...style }}
        onClick={onClick}
    >
        <img src="/images/icons/forward.svg" alt="" />
    </div>
}

const PrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return <div
        className={className + ' dh-arrow prev-about'}
        style={{ ...style }}
        onClick={onClick}
    >
        <img src="/images/icons/back.svg" alt="" />
    </div>
}

const MeetTheBoardSlide = (props: { data: [] }) => {
    const settings = {
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return <div className="card-meet-the-board w-100 d-flex flex-row mt-5">
        <div className="left">
            <img src="/images/user/yow.png" alt="" />
        </div>
        <div className="right d-flex align-item-center justify-content-center align-items-center">
            {
                <Slider infinite {...settings} autoplay autoplaySpeed={2000} nextArrow={<NextArrow />} prevArrow={<PrevArrow />} className="w-100 p-5">
                    {
                        props.data.map((list: any, i: any) => (
                            <>
                                <div className="position text-left">{list.position}</div>
                                <div className="name text-left">{list.name}</div>
                            </>
                        ))
                    }
                </Slider>
            }
        </div>
    </div>
}

export default AboutUsComponent;
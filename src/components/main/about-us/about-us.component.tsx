import MainComponent from '@Components/layout/main/main-layout.component';
import React, { useState } from 'react';
import Slider from 'react-slick';
import aboutUsJson from './about-us.json';
import GoogleMapReact from 'google-map-react';
import our from './our-team.json';
import { message } from "antd"
import { InputText } from "primereact/inputtext"

const data: any = aboutUsJson;
const { vision } = data;
const { mission } = data;
const { meetTheBoard } = data;
const { ourTeam } = our as any;

const AboutUsComponent = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        notes: ''
    });

    const [focus, setFocus] = useState(0);

    function onSubmit() {
        if (form.name && form.email && form.notes) {
            const text = `Nama: ${form.name} \r\nEmail: ${form.email} \r\n${form.notes}`;

            window.open(
                `https://api.whatsapp.com/send?phone=+6281218547953&text=${encodeURIComponent(text)}`,
                '_blank'
            )

        } else {
            message.error('Lengkapi formulir');
        }
    }
    return (
        <MainComponent
            title="Tentang Kami | Ruang Insan Berbagi"
            description="Ruang Insan Berbagi"
            pageId="about-page-dh"
        >
            <div className="container-fluid p-0 about-us-page">
                <div className="p-lg-5 p-3 container ">
                    <div className="header-about-us container-lg p-lg-4">
                        <div className="title-about-us mb-4 col-12 p-0">
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
                            <div className="title mb-3 col-lg-6 mx-auto">
                                {vision.label || ''}
                            </div>
                            <div className="col-lg-1 brd-lg mx-auto"></div>
                            <div className="description col-lg-7 py-4 visi mx-auto">
                                {vision.list || ''}
                            </div>
                        </div>
                        <div className="mision py-5 ">
                            <div className="title mb-3 col-lg-6 mx-auto">
                                {mission.label || ''}
                            </div>
                            <div className="col-lg-1 brd-md mx-auto"></div>
                            <div className="row description misi py-4 justify-content-center">
                                {
                                    mission.list.map((li: any, i: number) => (
                                        <div className="col-6 col-lg-5 p-2" key={i}>
                                            <div className="d-flex flex-column text-center m-auto w-100 px-lg-4">
                                                <div className="icon text-center">
                                                    <img src={li.image} alt="" width="75px" />
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
                        {/* <div className="meet-the-board py-5">
                            <div className="title pb-3 mb-3 col-lg-6 mx-auto">
                                {meetTheBoard.label || ''}
                            </div>
                            <div className="meet-the-board-slider container-md">
                                <MeetTheBoardSlide data={meetTheBoard.list} />
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="container-fluid p-0 our-team-aing">
                    {ourTeam &&
                        <div className="container-lg">
                            <div className="d-flex flex-column">
                                <div className="wrapper-section">
                                    <div className="title col-lg-6 align-self-center mx-auto">Our Team</div>
                                    <div className="col-lg-1 brd-lg mx-auto"></div>
                                    <div className="description">
                                        Kami hadir dan bekerja keras untuk mengakomodasi seluruh donatur agar dapat memberikan pengaruh positif dan menyalurkan donasi bagi kebaikan sosial
                                    </div>
                                </div>
                                <div className="wrapper-section">
                                    <div className="title col-lg-4 align-self-center mx-auto gj">{ourTeam.director.title}</div>
                                    <div className="col-lg-1 brd-md mx-auto"></div>
                                    <div className="row justify-content-center">
                                        {
                                            ourTeam.director.data && ourTeam.director.data.map((data: any, i: number) => {

                                                return <div className="col-lg-auto p-2" key={i}>
                                                    <div className="card-team">
                                                        {
                                                            data.file ? <img src={data.file} alt="" srcSet="" className="imooge" /> : <div className="imooge"></div>
                                                        }
                                                    </div>
                                                    <div className="name">
                                                        {data.name}
                                                        {/* <div className="position">
                                                            {data.position}
                                                        </div> */}
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="wrapper-section">
                                    <div className="title col-lg-4 align-self-center mx-auto gj">{ourTeam.manager.title}</div>
                                    <div className="col-lg-1 brd-md mx-auto"></div>
                                    <div className="row justify-content-center">
                                        {
                                            ourTeam.manager.data && ourTeam.manager.data.map((data: any, i: number) => {

                                                return <div className="col-lg-auto p-2 text-center" key={i}>
                                                    <div className="card-team">
                                                        {
                                                            data.file ? <img src={data.file} alt="" srcSet="" className="imooge" /> : <div className="imooge"></div>
                                                        }
                                                    </div>
                                                    <div className="name">
                                                        {data.name}
                                                        <div className="position">
                                                            {data.position}
                                                        </div>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="wrapper-section">
                                    <div className="title col-lg-4 align-self-center mx-auto gj">{ourTeam.cs.title}</div>
                                    <div className="col-lg-1 brd-md mx-auto"></div>
                                    <div className="row justify-content-center">
                                        {
                                            ourTeam.cs.data && ourTeam.cs.data.map((data: any, i: number) => {

                                                return <div className="col-lg-auto p-2 text-center" key={i}>
                                                    <div className="card-team">
                                                        {
                                                            data.file ? <img src={data.file} alt="" srcSet="" className="imooge" /> : <div className="imooge"></div>
                                                        }
                                                    </div>
                                                    <div className="name">
                                                        {data.name}
                                                        <div className="position">
                                                            {data.position || ''}
                                                        </div>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="container-fluid p-0 contact-us">
                    <div className="container-fluid p-0 contact-us-page">
                        <div className="p-lg-5 p-3 container text-center">
                            <div className="header-contact-us">
                                <div className="title-contact-us">
                                    Kontak Kami
                        </div>
                                <div className="description-contact-us py-2">
                                    Jika Anda memiliki pertanyaan, jangan ragu untuk menghubungi kami melalui email. Kami ingin sekali mendengar pendapat Anda!
                        </div>
                            </div>
                            <div className="form-contact-us mt-5">
                                <div className="row">
                                    <div className="col-lg-6 col-12 px-2 py-4">
                                        <span className="p-float-label floating-input-dh">
                                            <InputText id="name" className="w-100 name-contact" placeholder={focus === 1 ? 'First and last name' : ''} onBlur={() => setFocus(0)} onFocus={() => setFocus(1)} value={form.name} onChange={(e: any) => setForm({ ...form, name: e.target.value })} />
                                            <label className="label-contact-us" htmlFor="name">Nama</label>
                                        </span>
                                    </div>
                                    <div className="col-lg-6 col-12 px-2 py-4">
                                        <span className="p-float-label floating-input-dh">
                                            <InputText id="email" type="email" className="w-100" value={form.email} onChange={(e: any) => setForm({ ...form, email: e.target.value })} placeholder={focus === 2 ? 'name@domain.com' : ''} onBlur={() => setFocus(0)} onFocus={() => setFocus(2)} />
                                            <label className="label-contact-us" htmlFor="email">Email</label>
                                        </span>
                                    </div>
                                    <div className="col-12 px-2 py-4">
                                        <span className="p-float-label floating-input-dh">
                                            <InputText id="notes" className="w-100" value={form.notes} onChange={(e: any) => setForm({ ...form, notes: e.target.value })} placeholder={focus === 3 ? 'Your message' : ''} onBlur={() => setFocus(0)} onFocus={() => setFocus(3)} />
                                            <label className="label-contact-us" htmlFor="notes">Pesan</label>
                                        </span>
                                    </div>
                                </div>
                                <div className="text-lg-right text-center w-100">
                                    <button type="submit" className="btn btn-dh-primary" onClick={onSubmit}>Submit</button>
                                </div>
                            </div>
                        </div>
                        <div className="maps-section">
                            <div className="card-connect">
                                <div className="body-connect p-4">

                                    <div className="title-connect mb-4">
                                        Hubungi Kami
                                </div>

                                    <div className="field">
                                        <div className="sub-title">Alamat</div>
                                        <div className="sub">Jl. Setia Graha II No.44, Margasari, Kec. Buahbatu, Kota Bandung, Jawa Barat 40286, Indonesia</div>
                                    </div>

                                    <div className="field">
                                        <div className="sub-title">WhatsApp</div>
                                        <div className="sub">+62 81218547953</div>
                                    </div>

                                    <div className="field">
                                        <div className="sub-title">E-Mail</div>
                                        <div className="sub">info@ruanginsanberbagi.org</div>
                                    </div>

                                </div>

                                <div className="footer-connect p-3">
                                    <a href={`https://www.google.com/maps/place/Jl.+Karawitan+No.14a,+Turangga,+Kec.+Lengkong,+Kota+Bandung,+Jawa+Barat+40264/@-6.937426,107.6242484,17z/data=!3m1!4b1!4m5!3m4!1s0x2e68e87cb1186505:0x43659f706d71c43!8m2!3d-6.9374313!4d107.6264371`} target="_blank">
                                        Get Directions
                            </a>
                                </div>

                            </div>
                            <MapsSection />
                        </div>
                    </div>
                </div>
                {/* <div className="maps-section">
                    <div className="card-connect">
                        <div className="body-connect p-4">
    
                            <div className="title-connect mb-4">
                                Hubungi Kami
                                </div>
    
                            <div className="field">
                                <div className="sub-title">Alamat</div>
                                <div className="sub">Jl. Setia Graha II No.44, Margasari, Kec. Buahbatu, Kota Bandung, Jawa Barat 40286, Indonesia</div>
                            </div>
    
                            <div className="field">
                                <div className="sub-title">Telepon</div>
                                <div className="sub">022 - 2505375</div>
                            </div>
    
                            <div className="field">
                                <div className="sub-title">E-Mail</div>
                                <div className="sub">info@ruanginsanberbagi.org</div>
                            </div>
    
                        </div>
    
                        <div className="footer-connect p-3">
                            Get Directions
                        </div>
    
                    </div>
                    <MapsSection />
                </div> */}
            </div>
        </MainComponent>

    );
}

const MapsSection = () => {
    const [center, setCenter] = useState({ lat: -6.8796325, lng: 107.6138551 });
    const [zoom, setZoom] = useState(13);

    return <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyC2eaRA55-MdPttUMK0WckhxVlMVrNDPWQ' }}
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
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const [src, setSrc] = useState(`${0}.png`);

    function afterChange(i: number) {
        setSrc(`${i}.png`);
    }

    return <div className="card-meet-the-board w-100 d-flex flex-row mt-5">
        <div className="left animate__animated animate__fadeIn"
            style={{
                backgroundImage: `url('images/about-us/meet-the-board/${src}')`
            }}>
        </div>
        <div className="right d-flex flex-lg-row flex-column align-item-center justify-content-center align-items-center">
            {
                <Slider lazyLoad="progressive" afterChange={afterChange} key={'lladjksd'} {...settings} nextArrow={<NextArrow />} prevArrow={<PrevArrow />} className="w-100 p-5">
                    {
                        props.data.map((list: any, i: any) => (
                            <React.Fragment key={i}>
                                <div className="position text-left">{list.position}</div>
                                <div className="name text-left">{list.name}</div>
                            </React.Fragment>
                        ))
                    }
                </Slider>
            }
        </div>
    </div>
}

export default AboutUsComponent;
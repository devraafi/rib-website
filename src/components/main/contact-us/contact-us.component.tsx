import MainComponent from "@Components/layout/main/main-layout.component"
import { message } from "antd"
import { InputText } from "primereact/inputtext"
import React, { useState } from "react"
import GoogleMapReact from 'google-map-react';

const ContactUs = () => {
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

    return <MainComponent
        title="Contact Us Ruang Insan Berbagi"
        description="Ruang Insan Berbagi"
        pageId="contact-page-dh"
    >
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
                            <div className="sub">Jl. Setia Graha II No.44, Margasari, Bandung</div>
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
                        <a href={`https://www.google.com/maps/place/Jl.+Karawitan+No.14a,+Turangga,+Kec.+Lengkong,+Kota+Bandung,+Jawa+Barat+40264/@-6.937426,107.6242484,17z/data=!3m1!4b1!4m5!3m4!1s0x2e68e87cb1186505:0x43659f706d71c43!8m2!3d-6.9374313!4d107.6264371`} target="_blank">
                            Get Directions
                        </a>
                    </div>

                </div>
                <MapsSection />
            </div>
        </div>
    </MainComponent>
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

export default ContactUs;
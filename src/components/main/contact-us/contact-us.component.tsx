import MainComponent from "@Components/layout/main/main-layout.component"
import { message } from "antd"
import { InputText } from "primereact/inputtext"
import React, { useState } from "react"

const ContactUs = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        notes: ''
    })

    function onSubmit() {
        if (form.name && form.email && form.notes) {
            message.success('Pesan terkirim');
        } else {
            message.error('Lengkapi formulir');
        }
    }

    return <MainComponent
        title="Contact Us Lazis Darul Hikam"
        description="lazis Darul Hikam"
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
                        <div className="col-6 px-2 py-4">
                            <span className="p-float-label floating-input-dh">
                                <InputText id="name" className="w-100" value={form.name} onChange={(e: any) => setForm({ ...form, name: e.target.value })} />
                                <label className="label-contact-us" htmlFor="name">Nama</label>
                            </span>
                        </div>
                        <div className="col-6 px-2 py-4">
                            <span className="p-float-label floating-input-dh">
                                <InputText id="email" type="email" className="w-100" value={form.email} onChange={(e: any) => setForm({ ...form, email: e.target.value })} />
                                <label className="label-contact-us" htmlFor="email">Email</label>
                            </span>
                        </div>
                        <div className="col-12 px-2 py-4">
                            <span className="p-float-label floating-input-dh">
                                <InputText id="notes" className="w-100" value={form.notes} onChange={(e: any) => setForm({ ...form, notes: e.target.value })} />
                                <label className="label-contact-us" htmlFor="notes">Pesan</label>
                            </span>
                        </div>
                    </div>
                    <div className="text-right w-100">
                        <button type="submit" className="btn btn-dh-primary" onClick={onSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </MainComponent>
}

export default ContactUs;
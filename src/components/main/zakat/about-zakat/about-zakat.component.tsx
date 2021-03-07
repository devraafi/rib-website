import MainComponent from "@Components/layout/main/main-layout.component"
import React from "react"

export const AboutZakatComponent = () => (
    <MainComponent
        title="About zakat Ruang Insan Berbagi"
        description="lazis Ruang Insan Berbagi"
        pageId="about-zakat-page-dh"
    >
        <div className="container-fluid p-0 about-zakat-page">
            <div className="p-lg-5 p-3 container ">
                <div className="header-about-zakat container-lg p-lg-4">
                    <div className="title-about-zakat mb-4 col-12 p-0">
                        Tentang Zakat
                    </div>
                    <div className="description-about-zakat">
                        Zakat adalah bagian tertentu dari harta yang wajib dikeluarkan oleh setiap muslim apabila telah mencapai syarat yang ditetapkan. Sebagai salah satu rukun Islam, Zakat ditunaikan untuk diberikan kepada golongan yang berhak menerimanya (asnaf).
                        <br />
                        Dalam Al-Quran disebutkan, “Ambillah zakat dari sebagian harta mereka, dengan zakat itu kamu membersihkan dan menyucikan mereka” (QS. at-Taubah [9]: 103).
                    </div>
                </div>
            </div>
        </div>
    </MainComponent>
)
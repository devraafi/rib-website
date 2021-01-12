import MainComponent from "@Components/layout/main/main-layout.component";
import React, { useEffect, useState } from "react";
import BannerDonationSection from "./banner-donation-section/banner-donation.section.component";
import ContentDonationSection from "./content-donation-section/content-donation-section.component";
import MainDonation from "./content-donation-section/main-donation/main-donation.component";
import DonasiFormStep from "./form-step/donasi-form-steps.component";

const DonationPage = () => {
    const [step, onDonate] = useState(0);
    
    return (
        <React.Fragment>
            <MainComponent
                title="Donasi Lazis Darul Hikam"
                description="lazis Darul Hikam"
                pageId="donasi-page-dh"
            >
                {
                    <div className="container-fluid p-0">
                        <div className="donation-section">
                            <img src="/images/backgrounds/islamic.svg" className="islamic-bg" alt="" />
                        </div>
                        <div className="container-lg content">
                            <div className="row">
                                <div className="col-lg-7">
                                    <BannerDonationSection />
                                    <ContentDonationSection />
                                </div>
                                <div className="col-lg-5 py-3 py-lg-0 position-relative">
                                    <MainDonation onDone={(e: any) => onDonate(e)} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </MainComponent>
        </React.Fragment>
    )
}

export default DonationPage;
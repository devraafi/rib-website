import MainComponent from "@Components/layout/main/main-layout.component";
import { set } from "lodash";
import React, { useEffect, useState } from "react";
import BannerDonationSection from "./banner-donation-section/banner-donation.section.component";
import ContentDonationSection from "./content-donation-section/content-donation-section.component";
import MainDonation from "./content-donation-section/main-donation/main-donation.component";
import DonasiFormStep from "./form-step/donasi-form-steps.component";
import { useRouter } from 'next/router';

const DonationPage = () => {
    const router = useRouter();
    const { id } = router.query
    const [step, setStep] = useState(0);
    const [total, setTotal] = useState(0);
    function onDonate(total: number) {
        setTotal(total);
        setStep(1);
    }
    return (
        <React.Fragment>
            <MainComponent
                title="Donasi Lazis Darul Hikam"
                description="lazis Darul Hikam"
                pageId="donasi-page-dh"
                hideNav={step > 0}
            >
                {step === 0 ?
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
                                    <MainDonation onDone={(total: number) => onDonate(total)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <DonasiFormStep step={step} total={total} id={id} />
                }
            </MainComponent>
        </React.Fragment>
    )
}

export default DonationPage;
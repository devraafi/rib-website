import MainComponent from "@Components/layout/main/main-layout.component";
import React from "react";
import BannerDonationSection from "./banner-section/banner.section.component";
import ContentDonationSection from "./content-section/content-section.component";
import MainDonation from "./content-section/main-donation/main-donation.component";
import Step from "./step/step.component";

export default class DonasiPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            step: 0
        }
    }

    onDonate(step: number) {
        this.setState({
            step
        })
    }

    render() {
        return (
            <>
                <MainComponent
                    title="Donasi Lazis Darul Hikam"
                    description="lazis Darul Hikam"
                    pageId="donasi-page-dh"
                >
                    {
                        !this.state.step ? <div className="container-fluid p-0">
                            <div className="donation-section">
                                <img src="/images/backgrounds/islamic.svg" className="islamic-bg" alt="" />
                            </div>
                            <div className="container-lg content">
                                <div className="row">
                                    <div className="col-lg-7">
                                        <BannerDonationSection />
                                        <ContentDonationSection />
                                    </div>
                                    <div className="col-lg-5 py-3 py-lg-0">
                                        <MainDonation onDone={(e: any) => this.onDonate(e)} />
                                    </div>
                                </div>
                            </div>
                        </div> :
                            <Step step={this.state.step} />
                    }
                </MainComponent>
            </>
        )
    }
}
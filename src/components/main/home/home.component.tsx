import MainComponent from "@Components/layout/main/main-layout.component";
import React from "react";
import BannerSection from "./banner-section/banner-section.component";
import DonationSection from "./donation-section/donation-section.component";
import FeatureSection from "./feature-section/feature-section.component";
import FundaraisingSection from "./fundraising-section/fundaraising-section.component";
import NewsSection from "./news-and-stories-section/news-and-stories-section.component";
import OurPartnersSection from "./our-partner/our-partner.component";
import ProgramSection from "./program-section/program-section.component";
import UnnamedSection from "./unnamed-section/unnamed-section.component";
import ZakatSection from "./zakat-section/zakat-section.component";

export default class HomePage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>
                <MainComponent
                    title="Home Lazis Darul Hikam"
                    description="lazis Darul Hikam"
                    pageId="home-page-dh"
                >
                    <BannerSection />
                    <ZakatSection />
                    <DonationSection />
                    <ProgramSection />
                    <FundaraisingSection />
                    <OurPartnersSection />
                    {/* <UnnamedSection /> */}
                    <FeatureSection />
                    <NewsSection />

                </MainComponent>
            </>
        )
    }
}
import MainComponent from "@Components/layout/main/main-layout.component";
import React from "react";
import BannerSection from "./banner-section/banner-section.component";

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

                </MainComponent>
            </>
        )
    }
}
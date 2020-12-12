import MainComponent from "@Components/layout/main/main-layout.component";
import React from "react";

export default class DonasiPage extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>
                <MainComponent
                    title="Donasi Lazis Darul Hikam"
                    description="lazis Darul Hikam"
                    pageId="home-page-dh"
                >
                    Donasi
                </MainComponent>
            </>
        )
    }
}
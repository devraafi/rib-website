import { Loading } from "@Components/basics/loading/loading.component";
import MainComponent from "@Components/layout/main/main-layout.component";
import { Spin } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthenticationService } from "services/auth/aut.service";
import { RequestService } from "services/request.services";
import { TokenRestServices } from "services/rest/token-rest.service";
import { ProfileRestService } from "../profile/profile-rest.service";
import { BannerSection } from "./banner-section/banner-section.component";
import DonationSection from "./donation-section/donation-section.component";
import FeatureSection from "./feature-section/feature-section.component";
import { FundaraisingSection } from "./fundraising-section/fundaraising-section.component";
import { HomeRestService } from "./home-rest.service";
import { NewsSectionComponent } from "./news-and-stories-section/news-and-stories-section.component";
import ProgramSection from "./program-section/program-section.component";
import ZakatSection from "./zakat-section/zakat-section.component";
const auth: AuthenticationService = new AuthenticationService;
const token: TokenRestServices = new TokenRestServices;
const donationRestService: HomeRestService = new HomeRestService(process.env.staging || '', auth.axiosInterceptors);
const { handleRequest } = new RequestService;
export const HomePage = () => {
    const router = useRouter();
    const { query } = router;
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<any>(null);

    function userInfo() {
        token.getUserByToken({ accessToken: query.token }).subscribe((res) => {
            localStorage.setItem('userInfo', JSON.stringify(res));
        });
    }

    async function onInit() {
        setLoading(true);
        if (query.token) {
            await userInfo()
        }
        donationRestService.loadProgram().pipe(
            catchError(err => {
                return throwError(err);
            })).subscribe((res: any) => {
                setResponse(res)
                setLoading(false);
            })
    }
    useEffect(() => {
        onInit()
    }, [query]);

    return <MainComponent
        title="Home Ruang Insan Berbagi"
        description="Ruang Insan Berbagi"
        pageId="home-page-dh"
    >
        <Spin spinning={loading} indicator={<Loading />} >
            <BannerSection data={response ? response.program : []} />
            {/* <ZakatSection /> */}
            <DonationSection />
            <ProgramSection data={response ? response.program : []} />
            <FundaraisingSection data={response ? response.program : []} />
            {/* <UnnamedSection /> */}
            <FeatureSection />
            <NewsSectionComponent data={response ? response.news : []} />
        </Spin>
    </MainComponent>
}
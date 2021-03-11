import MainComponent from "@Components/layout/main/main-layout.component";
import { set } from "lodash";
import React, { useEffect, useState } from "react";
import BannerDonationSection from "./banner-donation-section/banner-donation.section.component";
import ContentDonationSection from "./content-donation-section/content-donation-section.component";
import MainDonation from "./content-donation-section/main-donation/main-donation.component";
import DonasiFormStep from "./form-step/donasi-form-steps.component";
import { useRouter, withRouter } from 'next/router';
import { catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { DonationRestServices } from "./donation-rest.service";
import { Spin } from "antd";
import { Loading } from "@Components/basics/loading/loading.component";
import { AuthenticationService } from "services/auth/aut.service";
import { RequestService } from "services/request.services";
const auth: AuthenticationService = new AuthenticationService;
const donationRestService: DonationRestServices = new DonationRestServices(process.env.staging || '', auth.axiosInterceptors);
const { handleRequest } = new RequestService;
const DonationPage = (props: any) => {
    const { router } = props;
    const { query, pathname } = router;
    const [step, setStep] = useState(0);
    const [total, setTotal] = useState(0);
    const [isInfaq, setIsInfaq] = useState(false);
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    function onDonate(total: number, isInfaq: boolean) {
        setTotal(total);
        setIsInfaq(isInfaq);
        setStep(1);
    }

    function loadData(obs: Observable<any>) {
        setLoading(true);
        handleRequest({
            obs,
            useService: false,
            errorMessage: 'Kesalahan tidak terduga',
            onError: () => setLoading(false),
            onDone: (res) => {
                setData(res);
                setLoading(false);
            }
        })
    }

    useEffect(() => {
        localStorage && localStorage.setItem('lastTotalDonasi', total.toString());
        localStorage && localStorage.setItem('isInfaq', total.toString());
    }, [total, isInfaq]);

    useEffect(() => {
        if (pathname === '/infak') {
            loadData(donationRestService.loadInfaq());
        } else {
            query.id && loadData(donationRestService.loadProgramById(query.id));
        }
    }, [router]);

    return (
        <MainComponent
            title={pathname === '/infak' ? "Infak Ruang Insan Berbagi" : "Donasi Ruang Insan Berbagi"}
            description="lazis Ruang Insan Berbagi"
            pageId="donasi-page-dh"
            hideNav={step > 0}
        >
            <Spin spinning={loading} indicator={<Loading />}>
                {step === 0 ?

                    <div className="container-fluid p-0">
                        <div className="donation-section">
                            <img src="/images/backgrounds/islamic.svg" className="islamic-bg" alt="" />
                        </div>
                        <div className="container-lg content">
                            <div className="row">
                                <div className="col-lg-7">
                                    {data && <BannerDonationSection data={data} />}
                                    {data && <ContentDonationSection data={data} />}
                                </div>
                                <div className="col-lg-5 py-3 py-lg-0 position-relative">
                                    {
                                        data &&
                                        <MainDonation isInfaq={pathname === '/infak' ? true : false} data={data} onDone={(total: number, isInfaq: boolean) => onDonate(total, isInfaq)} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <DonasiFormStep step={step} data={data} total={total} isInfaq={pathname === '/infak' ? true : false} id={query.id} />
                }
            </Spin>

        </MainComponent>
    )
}

export default withRouter(DonationPage);
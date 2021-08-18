import MainComponent from "@Components/layout/main/main-layout.component";
import React, { useEffect, useState } from "react";
import BannerDonationSection from "./banner-donation-section/banner-donation.section.component";
import ContentDonationSection from "./content-donation-section/content-donation-section.component";
import MainDonation from "./content-donation-section/main-donation/main-donation.component";
import DonasiFormStep from "./form-step/donasi-form-steps.component";
import { useRouter } from 'next/router';
import { Observable } from "rxjs";
import { DonationRestServices } from "./donation-rest.service";
import { Spin } from "antd";
import { Loading } from "@Components/basics/loading/loading.component";
import { AuthenticationService } from "services/auth/aut.service";
import { RequestService } from "services/request.services";
import { Helmet } from 'react-helmet';

const auth: AuthenticationService = new AuthenticationService;
const donationRestService: DonationRestServices = new DonationRestServices(process.env.staging || '', auth.axiosInterceptors);
const { handleRequest } = new RequestService;
function DonationPage({ meta, data }: any) {
    const router = useRouter();
    const { query, pathname } = router;
    const [step, setStep] = useState(0);
    const [total, setTotal] = useState(0);
    const [isInfaq, setIsInfaq] = useState(false);
    function onDonate(total: number, isInfaq: boolean) {
        setTotal(total);
        setIsInfaq(isInfaq);
        setStep(1);
    }

    function scroll(to?: boolean) {
        const windTop = window.pageYOffset;
        const mainTop: any = document.getElementById('col-donation')?.offsetTop;
        if (to) {
            window.scrollTo(0, (mainTop - 100));
        }
        if (windTop >= (mainTop - 420)) {
            document.getElementById('fixed-donation')?.classList.remove('animate__fadeInUp');
            document.getElementById('fixed-donation')?.classList.add('animate__fadeOutDown');
            // document.getElementById('fixed-donation')?.classList.add('d-none');
        } else {
            // document.getElementById('fixed-donation')?.classList.remove('d-none');
            document.getElementById('fixed-donation')?.classList.remove('animate__fadeOutDown');
            document.getElementById('fixed-donation')?.classList.add('animate__fadeInUp');
        }
    }

    useEffect(() => {
        data && import("react-facebook-pixel")
            .then((x) => x.default)
            .then((ReactPixel) => {
                ReactPixel.init('809047500028527');
                ReactPixel.fbq('track', 'ViewContent', {
                    program_name: data?.name || '-',
                });
            });
    }, [data]);

    useEffect(() => {
        localStorage && localStorage.setItem('lastTotalDonasi', total.toString());
        localStorage && localStorage.setItem('isInfaq', total.toString());
    }, [total, isInfaq]);

    useEffect(() => {
        if (query && query.transactionId) {
            setStep(1);
        }
    }, [router]);

    useEffect(() => {
        window.onscroll = () => {
            scroll();
        };
    });

    return (
        <MainComponent
            title={meta?.title}
            pageId="donasi-page-dh"
            hideNav={step > 0}
            meta={meta}
        >
            <Spin spinning={!data} indicator={<Loading />}>
                {step === 0 ?

                    <div className="container-fluid p-0">
                        <div className="donation-section">
                        </div>
                        <div className="container-lg content">
                            <div className="row">
                                <div className="col-lg-7">
                                    {data && <BannerDonationSection data={data} />}
                                    {data && <ContentDonationSection data={data} />}
                                </div>
                                <div className="col-lg-5 py-3 py-lg-0 position-relative" id="col-donation">
                                    {data &&
                                        <MainDonation isInfaq={query?.programRoute === 'infak' ? true : false} data={data} onDone={(total: number, isInfaq: boolean) => onDonate(total, isInfaq)} />}
                                </div>
                            </div>
                        </div>
                        <div id="fixed-donation" className="fixed-bottom d-lg-none doation-fixed-section animate__animated " onClick={() => scroll(true)}>
                            DONASI
                        </div>
                    </div>
                    :
                    <DonasiFormStep step={step} data={data} total={total} isInfaq={query?.programRoute === 'infak' ? true : false} id={query.id || data._id} referrer={query.referrer || null} />}
            </Spin>

        </MainComponent>
    );
}

export default DonationPage;

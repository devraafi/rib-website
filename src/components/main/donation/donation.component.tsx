import MainComponent from "@Components/layout/main/main-layout.component";
import { set } from "lodash";
import React, { useEffect, useState } from "react";
import BannerDonationSection from "./banner-donation-section/banner-donation.section.component";
import ContentDonationSection from "./content-donation-section/content-donation-section.component";
import MainDonation from "./content-donation-section/main-donation/main-donation.component";
import DonasiFormStep from "./form-step/donasi-form-steps.component";
import { useRouter, withRouter } from 'next/router';
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { DonationRestServices } from "./donation-rest.service";
import { Spin } from "antd";
import { Loading } from "@Components/basics/loading/loading.component";
const donationRestService: DonationRestServices = new DonationRestServices;

const DonationPage = (props: any) => {
    const { query } = props.router;
    const [step, setStep] = useState(0);
    const [total, setTotal] = useState(0);
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    function onDonate(total: number) {
        setTotal(total);
        setStep(1);
    }

    useEffect(() => {
        setLoading(true);
        console.log(query);
        if (query.id) {
            donationRestService.loadProgramById(query.id).pipe(
                catchError(err => {
                    setLoading(false);
                    return throwError(err);
                })).subscribe((res: any) => {
                    setData(res);
                    setLoading(false);
                })
        }
    }, [query.id]);

    return (
        <React.Fragment>
            <MainComponent
                title="Donasi Lazis Darul Hikam"
                description="lazis Darul Hikam"
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
                                            <MainDonation data={data} onDone={(total: number) => onDonate(total)} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <DonasiFormStep step={step} data={data} total={total} id={query.id} />
                    }
                </Spin>

            </MainComponent>
        </React.Fragment>
    )
}

export default withRouter(DonationPage);
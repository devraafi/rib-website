import React from 'react'
import DonationPage from '@Components/main/donation/donation.component';
import { AuthenticationService } from '../../src/services/auth/aut.service';
import { DonationRestServices } from '../../src/components/main/donation/donation-rest.service';
import axios from 'axios';

const auth: AuthenticationService = new AuthenticationService;
const donationRestService: DonationRestServices = new DonationRestServices(process.env.staging || '', auth.axiosInterceptors);
function Index(props: any) {
    return (
        <DonationPage {...props} />
    );
}

export async function getServerSideProps(ctx: any) {
    let url = `https://rib-production.ruanginsanberbagi.org/public/program/${ctx.query.programRoute}`;
    let meta = null;
    let data = null;
    if (ctx.query.programRoute === 'infak') {
        url = `https://rib-production.ruanginsanberbagi.org/public/infaq`;
    }
    await axios.get(url).then((res: any) => {
        data = res.data;
        meta = {
            url: `https://ruanginsanberbagi.org${ctx.resolvedUrl}`,
            ogTitle: ctx.query.programRoute === 'infak' ? 'Klik untuk Infak' : `Klik untuk donasi - ${data.name}`,
            title: `${data.name} | Ruang Insan Berbagi`,
            ogDesc: data.name,
            name: ctx.query.programRoute === 'infak' ? 'Klik untuk Infak' : `Klik untuk donasi - ${data.name}`,
            img: data.fileUrl,
        }
    }).catch(err => {
        console.error(err);
    });
    return { props: { meta, data } };

}

export default Index;
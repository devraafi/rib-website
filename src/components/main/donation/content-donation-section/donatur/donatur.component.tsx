import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import data from './file.json'
import moment from 'moment';
import { DonationRestServices } from '../../donation-rest.service';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import { AuthenticationService } from 'services/auth/aut.service';
import { RequestService } from 'services/request.services';

const auth: AuthenticationService = new AuthenticationService;
const donationRestService: DonationRestServices = new DonationRestServices(process.env.staging || '', auth.axiosInterceptors);
const { handleRequest } = new RequestService;

const DonorListComponent = (props: WithRouterProps) => {
    const { router } = props;
    const { query, pathname } = router;
    const [list, setList] = useState<IDonor[]>();

    function loadData(obs: Observable<any>) {
        handleRequest({
            obs,
            useService: false,
            errorMessage: 'Kesalahan tidak terduga',
            onDone: (res) => {
                setList(res);
            }
        })
    }

    useEffect(() => {

        if (pathname === '/infak') {
            loadData(donationRestService.loadInfaqDetail());
        } else {
            query.id && loadData(donationRestService.loadProgramDetail(query.id));
        }

    }, [])

    return <div className="d-flex flex-column donatur">
        {
            (list && list.length) ? list.map((data, i: number) => {
                return (
                    <div className="list justify-content-between">
                        <div className="d-flex flex-row">
                            <div className="profile-img align-self-center mr-2">
                                <img src={'/images/icons/profile.svg'} alt="" />
                            </div>
                            <div className="d-flex flex-column align-self-center">
                                <div className="user-name">
                                    {(!data.showAsAnonymous && data.donorName) ? data.donorName : 'Anonim'}
                                </div>
                                <div className="date-info">
                                    {moment(data.donorDate).format('DD MMMM YYYY')}
                                </div>
                                <div className="comment">
                                    {data.donorNote}
                                </div>
                            </div>
                        </div>
                        <div className="amount">
                            Rp. {(data.amount).toLocaleString()}
                        </div>
                    </div>
                )
            }) : <div className="p-2 text-center">Tidak Ada Data</div>
        }
    </div>
}

export default withRouter(DonorListComponent);
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import data from './file.json'
import moment from 'moment';
import { DonationRestServices } from '../../donation-rest.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';


const donationRestService: DonationRestServices = new DonationRestServices;
const DonorListComponent = (props: WithRouterProps) => {
    const { query } = props.router;
    const [list, setList] = useState<IDonor[]>();

    useEffect(() => {
        donationRestService.loadProgramDetail(query.id).pipe(
            catchError(err => {
                return throwError(err);
            })).subscribe((res) => {
                setList(res)
            })
    }, [])

    return <div className="d-flex flex-column donatur">
        {
            list && list.map((data, i: number) => {
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
            })
        }
    </div>
}

export default withRouter(DonorListComponent);
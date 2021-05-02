import { Spin } from "antd";
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AuthenticationService } from "../../../services/auth/aut.service";
import { RequestService } from "../../../services/request.services";
import { NotificationsRestService } from "./notifications-rest.service";
const auth: AuthenticationService = new AuthenticationService;
const notifRest = new NotificationsRestService(process.env.staging || '', auth.axiosInterceptors);
const { handleRequest } = new RequestService();
export function NotificationsComponent() {
    const [loading, setLoading] = useState(false);
    const [notifData, setNotifData] = useState([]);
    function loadNotification() {
        setLoading(true);
        const obs = notifRest.loadNotif();
        handleRequest({
            obs,
            onError: () => setLoading(false),
            onDone: (res) => {
                setNotifData(res);
                setLoading(false)
            }
        })
    }

    useEffect(() => {
        loadNotification();
    }, []);

    return <Spin spinning={loading}>
        <div id="notif-wrapper">
            {
                notifData && notifData?.map((notif: any, i) => (
                    <div className="notif-list p-2" key={i}>
                        <div className="d-flex w-100 mx-auto mb-2">
                            <img src={`/images/icons/${notif?.type}.svg`} alt="" srcSet="" className='mr-3 align-self-center' />
                            <span className="type align-self-center">{_.startCase(_.toLower(notif?.type))}</span>
                            <div className="text-right type align-self-center w-100">
                                {moment(notif?.createdAt).fromNow()}
                            </div>
                        </div>
                        <div className="title">
                            {notif?.title}
                        </div>
                        <div className="msg">
                            {notif?.message}
                        </div>
                    </div>
                ))
            }
        </div>
    </Spin>
}
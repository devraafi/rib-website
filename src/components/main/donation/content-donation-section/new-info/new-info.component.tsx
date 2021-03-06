import React, { useEffect } from 'react';
import data from './file.json'
import { NewsArticleRestService } from '@Components/main/news-article/news-article-rest.service';
import { AuthenticationService } from 'services/auth/aut.service';
import { RequestService } from 'services/request.services';
import { useState } from 'react';
import moment from 'moment';
import Link from 'next/link';

const auth: AuthenticationService = new AuthenticationService;
const newRestService: NewsArticleRestService = new NewsArticleRestService(process.env.staging || '', auth.axiosInterceptors);
const { handleRequest } = new RequestService;

const NewInfoDonation = (props: { id: string }) => {
    const [news, setNews] = useState<INews[]>();
    const [params, setParams] = useState({
        take: 6,
        skip: 0,
        programId: null
    });

    function loadNews(programId: string) {
        const prm = {
            ...params,
            programId,
            take: 5
        }
        const obs = newRestService.loadNews(prm)
        handleRequest({
            obs,
            onDone: (res) => setNews(res.data)
        })
    };

    useEffect(() => {

        (props.id) && loadNews(props.id);
    }, [props])

    return <div className="d-flex flex-column new-info">
        {
            (news && (news.length > 0)) ? news.map((data, i: number) => {
                return (
                    <div className="box-info my-3" key={i}>
                        <div className="date-info py-2">{moment(data.createdAt).format('DD MMM YYYY')}</div>
                        <div className="title py-2">{data.title}</div>
                        {/* <div className="image-wrap my-3">
                            {
                                data.fileUrl ?
                                    <img className="imooge" src={data.fileUrl} alt="" /> :
                                    <div className="imooge"></div>
                            }
                        </div> */}
                        <div className="desc" dangerouslySetInnerHTML={{ __html: data?.description || '' }}></div>
                        {/* <div className="read-more py-2">
                            <Link href={`/news-article/detail/?route=${data?.route}`}>
                                <button className="btn btn-dh-outline-2">
                                    Read More
                                </button>
                            </Link>
                        </div> */}
                    </div>
                )
            }) : <div className="p-2 text-center">Saat ini belum ada kabar terbaru dari program ini. Silakan untuk kembali mengakses halaman ini setelah beberapa waktu untuk melihat kabar terbaru.</div>
        }
    </div>
}

export default NewInfoDonation;
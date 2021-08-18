import { NewsArticleDetailComponent } from '@Components/main/news-article/detail/news-article-detail.component';
import axios from 'axios';
import React from 'react';
const NewsArticleDetail = (props: any) => (
    <NewsArticleDetailComponent  {...props} />
)

export async function getServerSideProps(ctx: any) {
    let url = `https://rib-production.ruanginsanberbagi.org/public/news/${ctx.query.route}`;
    let meta = null;
    let news = null;
    await axios.get(url).then((res: any) => {
        news = res.data;
        meta = {
            url: `https://ruanginsanberbagi.org${ctx.resolvedUrl}`,
            ogTitle: `${news.title}`,
            title: `${news.title} | Ruang Insan Berbagi`,
            ogDesc: news.caption,
            name: `${news.name}`,
            img: news.fileUrl,
        }
    }).catch(err => {
        console.error(err);
    });
    return { props: { meta, news } };

}

export default NewsArticleDetail
import { RequestService } from 'services/request.services';

export class NewsArticleRestService {
    requestService = new RequestService;
    request: RequestService;
    urlDh: string = 'https://staging-rib.herokuapp.com/public/';
    constructor(
        baseUrl?: string,
        useInterceptor: any = true,
        withoutInterceptor: boolean = false
    ) {
        this.request = this.requestService.new(this.urlDh, useInterceptor, withoutInterceptor);
    }

    loadNews(params?: any) {
        return this.request.get(`news`, {
            params
        });
    }

    loadNewsByRoute(route: string) {
        return this.request.get(`news/${route}`)
    }
}

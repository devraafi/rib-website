declare interface INewsArticleProps {
    data: INews[]
}

declare interface INews {
    authorName: string;
    createdAt: string;
    description: string;
    route: string;
    title: string;
    fileUrl: string;
    _id: string;
    caption: string;
    articleCategory: {
        name: string;
        _id: string;
    };
}
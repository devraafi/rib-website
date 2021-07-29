import { ReactNode } from "react";

export interface MainProps {
    title?: string;
    shortTitle?: string;
    description?: string;
    canonical?: string;
    children: ReactNode;
    pageId?: string;
    customNav?: ReactNode;
    hideNav?: boolean;
    hideFooter?: boolean;
    imgUrl?: string;
}
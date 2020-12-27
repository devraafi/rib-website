import { ReactNode } from "react";

export interface MainProps {
    title?: string;
    description?: string;
    canonical?: string;
    children: ReactNode;
    pageId?: string;
    customNav?: ReactNode;
}
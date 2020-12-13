import React, { useEffect } from "react"
import DonationDetailPage from "@Components/main/donasi/donasi.component";
import Router from 'next/router';
import DonasiLIstIndex from "./list";

const Index = () => {
    useEffect(() => {
        const { pathname } = Router
        if (pathname == '/donasi') {
            Router.push('/donasi/list')
        }
    });
    return (
        <DonasiLIstIndex />
    );
}

export default Index;
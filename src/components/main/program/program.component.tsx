import MainComponent from "@Components/layout/main/main-layout.component";
import { useRouter } from "next/router";
import React from "react";
import ProgramCategory from "./category/program-category.component";
import ProgramList from "./list/program-list.component";
const ProgramComponent = () => {
    const router = useRouter()
    const { list } = router.query;
    
    return <MainComponent
        title="Zakat Ruang Insan Berbagi"
        description="Ruang Insan Berbagi"
        pageId="program-page-dh"
    >

        <div className="container-fluid p-0 program-content">
            <div className="banner-program">
                <div className="px-5 w-100 text-lg-left text-center">
                    Commodo semper egestas dictum ultrices
                </div>
            </div>
            {
                list ?
                    <ProgramList />
                    :
                    <ProgramCategory />
            }
        </div>
    </MainComponent>
}

export default ProgramComponent;
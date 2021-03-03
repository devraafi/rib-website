import MainComponent from '@Components/layout/main/main-layout.component';
import React from 'react';
import BannerZakatSection from './banner-zakat-section/banner-zakat.component';
import CalculatorZakatSection from './calculator-zakat-section/calculator-zakat.component';
import ReportZakatSection from './report-zakat-section/report-zakat.component';
import ZakatFitrahSection from './zakat-fitrah-section/zakat-fitrah.component';
import ZakatKnowledgeSection from './zakat-knowledge-section/zakat-knowledge.component';

const ZakatMainPage = () => {
    return (
        <MainComponent
            title="Zakat Ruang Insan Berbagi"
            description="lazis Darul Hikam"
            pageId="zakat-page-dh"
        >

            <div className="container-fluid p-0 content-zakat">
                <BannerZakatSection />
                <CalculatorZakatSection />
                <ZakatFitrahSection />
                <ReportZakatSection />
                <ZakatKnowledgeSection />
            </div>
        </MainComponent>
    )
}

export default ZakatMainPage;
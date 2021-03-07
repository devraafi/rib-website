import Link from 'next/link';
import React from 'react';
import data from './category.json';
const ProgramCategory = () => {
    const { categoryList } = data;
    return (
        <div className="container-lg container-fluid py-4" id="program-category">
            <div className="title text-center">Program Ruang Insan Berbagi</div>
            <div className="description">
                Nec, mi sit cras eget dictum habitasse ac accumsan arcu. Sit purus libero venenatis sit. Quis pellentesque purus eget vitae varius. Orci mauris velit nisi lorem hendrerit donec cursus eget pellentesque. Neque porta augue gravida tincidunt leo nec.
            </div>
            <div className="py-3 row justify-content-center">
                {
                    categoryList.map((category: any, i: number) => (
                        <div className="col-lg-4 py-3 px-3 col-md-6 col-8 " key={i}>
                            <div className="card-category">
                                <div className="header">
                                    <img src="/images/icons/category.svg" alt="" className="img-fluid" />
                                    <div className="title-header ml-3">
                                        {category.name || ''}
                                    </div>
                                </div>
                                <div className="body py-3">
                                    {
                                        category.description || ''
                                    }
                                </div>
                                <div className="footer">
                                    <Link href={`?list=true`}>
                                        <button className="btn btn-dh-next">Lihat Program</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ProgramCategory;
import React from 'react';
import data from './list.json';
const ProgramList = () => {
    const { list } = data;
    return <div className="container-lg container-fluid py-4" id="program-list">
        <div className="title text-center">Program Ruang Insan Berbagi</div>
        <div className="description">
            Nec, mi sit cras eget dictum habitasse ac accumsan arcu. Sit purus libero venenatis sit. Quis pellentesque purus eget vitae varius. Orci mauris velit nisi lorem hendrerit donec cursus eget pellentesque. Neque porta augue gravida tincidunt leo nec.
        </div>
        <div className="py-3 row">
            {
                list.map((doc: any, i: number) => (
                    <div className="col-lg-3 p-3 col-md-6 col-8 " key={i}>
                        <div className="card-program-list">
                            <div className="image">

                            </div>
                            <div className="content px-4 py-3">
                                <div className="title-content mb-3">
                                    {
                                        doc.title
                                    }
                                </div>
                                <div className="profile">
                                    <div className="profile-img">
                                        <img src={doc.user.imageUrl} alt="" srcSet="" />
                                    </div>
                                    <div className="profile-name ml-2">
                                        {
                                            doc.user.name
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
}

export default ProgramList;
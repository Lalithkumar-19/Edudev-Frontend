import React, { useState } from 'react'
import SweetPagination from "sweetpagination";

function PaginationMui() {
    const [currentPageData, setCurrentPageData] = useState([]);
    const [data,setData]=useState([1,2,3,4,5,6,7,8,]);

    return (
        <div style={{alignSelf:"center"}}>
            {currentPageData.map((item) => (
                <div>
                    <h3>Item #{item}</h3>
                </div>
            ))}

            <SweetPagination
                currentPageData={setCurrentPageData}
                dataPerPage={1}
                getData={data}
                navigation={true}
            />
        </div>
    )   
}

export default PaginationMui
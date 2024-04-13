import React from 'react'
import FeaturedInfo from '../AdminpanelComponents/FeaturedInfo'
import "../AdminPanelPages/adminHome.css"
import WidgetLg from '../AdminpanelComponents/WidgetLg';

function Ins_home() {
    return (
        <div>
            <FeaturedInfo />
            <WidgetLg />
        </div>
    )
}

export default Ins_home;
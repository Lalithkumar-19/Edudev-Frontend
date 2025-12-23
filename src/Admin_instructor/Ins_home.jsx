import React from 'react'
import FeaturedInfo from '../AdminpanelComponents/FeaturedInfo'
import "../AdminPanelPages/adminHome.css"
import WidgetLg from '../AdminpanelComponents/WidgetLg';

function Ins_home() {
    return (
        <div className="home_dashboard" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <FeaturedInfo />
            <WidgetLg />
        </div>
    )
}

export default Ins_home;
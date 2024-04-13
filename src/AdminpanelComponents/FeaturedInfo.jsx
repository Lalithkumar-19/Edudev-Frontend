import { useEffect, useState } from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import axios from "axios";

export default function FeaturedInfo() {
    const [data, setData] = useState(0);
    const Fetch_revenue = async () => {
        try {
            const res = await axios.get("https://edudev-server-1.onrender.com/Get_Total_revenue");
            if (res.status === 200) {
                setData(res.data);
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        Fetch_revenue();
    }, [])
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Revanue</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">₹{data/100}</span>
                    <span className="featuredMoneyRate">
                        -11.4 <ArrowDownward className="featuredIcon negative" />
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Sales</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">₹{(3*data-20-data||0)/100}</span>
                    <span className="featuredMoneyRate">
                        -1.4 <ArrowDownward className="featuredIcon negative" />
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Cost</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">₹{data/100}</span>
                    <span className="featuredMoneyRate">
                        +2.4 <ArrowUpward className="featuredIcon" />
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
        </div>
    );
}
import React from 'react'
import "../Styles/teamcard.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useNavigate } from 'react-router-dom';

function Team_member_card({id,name,role,socialmedia}) {
    const navigate=useNavigate();
    return (

        <div class="container">

            <div class="inner_container">
                <div class="our-team">
                    <div class="picture">
                        <img class="img-fluid" src="https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-66609.jpg" />
                    </div>
                    <div class="team-content" onClick={()=>navigate("/instructors/about_instructor/"+id)}>
                        <h3 class="name" style={{cursor:"pointer"}}>{name}</h3>
                        <h4 class="title">{role}</h4>
                    </div>
                    <ul class="social">
                        <li><a href={socialmedia.Linkedin&&socialmedia.Linkedin}><LinkedInIcon/></a></li>
                        <li><a href={socialmedia.facebook&&socialmedia.facebook}><FacebookIcon/></a></li>
                        <li><a href={socialmedia.twitter&&socialmedia.twitter}><TwitterIcon/></a></li>
                    </ul>
                </div>
            </div>




        </div>
    )
}

export default Team_member_card
import React, { useState } from 'react'
import "./Instructor_apply.css";
import Navbar from '../Pages/Navbar';
import Pic from "../assets/Book2.jpg";
import { Leaderboard } from '@mui/icons-material';
import Contactpage from '../Pages/FooterPage';
import Team_member_card from '../Pages/Team_member_card';
import AccordionTemp from '../Multiuse_Pages/Accordion';
import Instructor_Modal from '../Modals/Apply_instructor_Modal';


function Instructor_apply({ header_footer }) {

    return (
        <div className='instructor_apply'>
            {header_footer ? <Navbar /> : ""}
            {
                !header_footer ? (
                    <>
                        <div id="benefits_header">
                            <h3 className='benefits_heading'>ApplyInstructor</h3>
                            <div className='benefits_heading_title_box'>
                                <h1 className='benefits_title'>You can be expand your teaching capabilities with our help <span style={{ color: "tomato" }}>Courses </span></h1>
                                <span className='benefits_sub_quote'>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam numquam beatae nemo? Fuga corporis non culpa esse illum illo recusandae.
                                </span>
                            </div>
                        </div>
                    </>
                ):""
           }

            <header className='instructor_apply_page_header'>
                <section className='instructor_apply_page_header_left'>
                    <h1>Apply as Instructor</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae autem non maiores quos et cumque exercitationem ducimus molestias labore in, facilis praesentium at itaque aspernatur atque libero totam culpa voluptas consectetur adipisci iste accusantium debitis eos. Ex magni, quasi eos ea recusandae molestias aspernatur atque repudiandae ut repellat odio facilis eius aperiam optio quaerat. Consectetur tenetur ad voluptate aliquid obcaecati cupiditate adipisci hic consequuntur ab et unde ea, iste delectus vel corporis! Itaque eos minus nulla consequuntur pariatur! Praesentium commodi ipsa officiis atque, earum deleniti sint voluptatibus odit, sunt velit facilis quia illo rerum cumque totam tempore itaque facere accusantium! Eaque, repellat non? Temporibus atque reiciendis earum dolorem optio at maxime! Cum commodi consequatur voluptates! Voluptate officiis repellat odio veritatis.</p>
                    <Instructor_Modal />

                </section>
                <section className='instructor_apply_page_header_right'>

                    <img src={Pic} alt='backdrop' width={"100%"} height={"100%"} style={{ borderRadius: "10px" }} />
                </section>
            </header>

            <section className='instructor_benefits'>
                <div id="benefits_header">
                    <h3 className='benefits_heading'>Benefits of Instructor</h3>
                    <div className='benefits_heading_title_box'>
                        <h1 className='benefits_title'>You can be your guiding star with our help <span style={{ color: "tomato" }}>Courses </span></h1>
                        <span className='benefits_sub_quote'>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam numquam beatae nemo? Fuga corporis non culpa esse illum illo recusandae.
                        </span>
                    </div>
                </div>

                <div className='benefits_elements'>
                    <div className='benefit_element'>
                        <Leaderboard color='secondary' fontSize='large' />
                        <h1>Leadership</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, optio.</p>
                    </div>
                    <div className='benefit_element'>
                        <Leaderboard color='secondary' fontSize='large' />
                        <h1>Deep Honesty</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, optio.</p>
                    </div>
                    <div className='benefit_element'>
                        <Leaderboard color='secondary' fontSize='large' />
                        <h1>Social Impact</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, optio.</p>
                    </div>
                </div>

            </section>
            <section className='instructors_team'>
                <div id="benefits_header">
                    <h3 className='benefits_heading'>Team</h3>
                    <div className='benefits_heading_title_box'>
                        <h1 className='benefits_title'>A leadership team with <span style={{ color: "tomato" }}>vision </span></h1>
                        <span className='benefits_sub_quote'>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam numquam beatae nemo? Fuga corporis non culpa esse illum illo recusandae.
                        </span>
                    </div>
                </div>
                <div className='instructor_div'>
                    <Team_member_card name={"Lalith kumar"} role={"Software Employee"} key={1} />
                    <Team_member_card name={"Lalith kumar"} role={"Software Employee"} key={2} />
                    <Team_member_card name={"Lalith kumar"} role={"Software Employee"} key={3} />
                    <Team_member_card name={"Lalith kumar"} role={"Software Employee"} key={4} />
                </div>
            </section>

            <section className='instructor_faq'>
                <div id="benefits_header">
                    <h3 className='benefits_heading'>FAQ</h3>
                    <div className='benefits_heading_title_box'>
                        <h1 className='benefits_title'>A few frequently asked <span style={{ color: "tomato" }}>questions</span></h1>
                        <span className='benefits_sub_quote'>
                            Our excecutives lead by example and guide us to accomplish great things every day
                        </span>
                    </div>
                </div>

                <div className="instructor_faq_main">
                    <div className='instructor_faq_left'>
                        <img className='backdrop' src={"https://static.vecteezy.com/system/resources/thumbnails/019/979/414/small/group-of-people-doing-video-conference-online-meeting-online-education-illustration-png.png"} alt='backdrop_faq' width={"100%"} height={"100%"} style={{ borderRadius: "10px" }} />

                    </div>
                    <div className='instructor_faq_right'>
                        <AccordionTemp content={"Our excecutives lead by example and guide us to accomplish great things every day"} heading={"How does billing works"} />
                        <AccordionTemp content={"Our excecutives lead by example and guide us to accomplish great things every day"} heading={"How does billing works"} />
                        <AccordionTemp content={"Our excecutives lead by example and guide us to accomplish great things every day"} heading={"How does billing works"} />
                        <AccordionTemp content={"Our excecutives lead by example and guide us to accomplish great things every day"} heading={"How does billing works"} />
                        <AccordionTemp content={"Our excecutives lead by example and guide us to accomplish great things every day"} heading={"How does billing works"} />
                        <AccordionTemp content={"Our excecutives lead by example and guide us to accomplish great things every day"} heading={"How does billing works"} />
                        <AccordionTemp content={"Our excecutives lead by example and guide us to accomplish great things every day"} heading={"How does billing works"} />

                    </div>
                </div>

            </section>

            {header_footer ? <Contactpage /> : ""}

        </div>
    )
}

export default Instructor_apply
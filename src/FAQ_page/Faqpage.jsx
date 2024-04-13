import React from 'react'
import "./Faqpage.css";
import BasicAccordion from '../AccordionsMUI/Accordion';
import Navbar from '../Pages/Navbar';
import Contactpage from '../Pages/FooterPage';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
function Faqpage() {
    return (
        <div className='faqpage'>
            <Navbar />
            <header className='faqpage_header'>
                <h1 className='faqpage_header_title'>
                    FAQ'S Page
                </h1>
                <span className='faqpage_header_sub_title'>
                    Home/<span className='faqpage_header_sub_sub_title'>
                        FAQ
                    </span>
                </span>
            </header>

            <section className='faqpage_main'>
                <h1 className='faqpage_main_title'>
                    Frequently Asked <span style={{ color: "coral" }}>Questions</span>
                </h1>
                <p className='faqpage_main_sub_title'>Lorem ipsum,  explicabo ducimus, recusandae nobis? Quisquam architecto iure veritatis reiciendis repellat! Repudiandae sapiente cumque corporis placeat, blanditiis molestiae?</p>
            </section>
            <section className='faqpage_main_contents'>
                <div className='faqpage_main_contents_left' >

                    <BasicAccordion visible_title={"How To Learn Web Designing Step By Step through in easy manner"} hidden_details={" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendiss malesuada lacus ex, sit amet blandit leo lobortis eget"} />
                    <BasicAccordion visible_title={"How To Learn Web Designing Step By Step"} hidden_details={" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendiss malesuada lacus ex, sit amet blandit leo lobortis eget"} />
                    <BasicAccordion visible_title={"How To Learn Web Designing Step By Step"} hidden_details={" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendiss malesuada lacus ex, sit amet blandit leo lobortis eget"} />
                    <BasicAccordion visible_title={"How To Learn Web Designing Step By Step"} hidden_details={" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendiss malesuada lacus ex, sit amet blandit leo lobortis eget"} />
                    <BasicAccordion visible_title={"How To Learn Web Designing Step By Step"} hidden_details={" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendiss malesuada lacus ex, sit amet blandit leo lobortis eget"} />
                    <BasicAccordion visible_title={"How To Learn Web Designing Step By Step"} hidden_details={" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendiss malesuada lacus ex, sit amet blandit leo lobortis eget"} />
                    <BasicAccordion visible_title={"How To Learn Web Designing Step By Step"} hidden_details={" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendiss malesuada lacus ex, sit amet blandit leo lobortis eget"} />
                    <BasicAccordion visible_title={"How To Learn Web Designing Step By Step"} hidden_details={" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendiss malesuada lacus ex, sit amet blandit leo lobortis eget"} />
                    <BasicAccordion visible_title={"How To Learn Web Designing Step By Step"} hidden_details={" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendiss malesuada lacus ex, sit amet blandit leo lobortis eget"} />


                </div>
                <div className="faqpage_main_contents_right">
                    <BasicAccordion visible_title={"How To Learn Web Designing Step By Step"} hidden_details={" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendiss malesuada lacus ex, sit amet blandit leo lobortis eget"} />
                    <BasicAccordion visible_title={"How To Learn Web Designing Step By Step"} hidden_details={" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendiss malesuada lacus ex, sit amet blandit leo lobortis eget"} />
                    <BasicAccordion visible_title={"How To Learn Web Designing Step By Step"} hidden_details={" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendiss malesuada lacus ex, sit amet blandit leo lobortis eget"} />
                    <BasicAccordion visible_title={"How To Learn Web Designing Step By Step"} hidden_details={" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendiss malesuada lacus ex, sit amet blandit leo lobortis eget"} />
                    <BasicAccordion visible_title={"How To Learn Web Designing Step By Step"} hidden_details={" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendiss malesuada lacus ex, sit amet blandit leo lobortis eget"} />
                    <BasicAccordion visible_title={"How To Learn Web Designing Step By Step"} hidden_details={" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendiss malesuada lacus ex, sit amet blandit leo lobortis eget"} />
                    <BasicAccordion visible_title={"How To Learn Web Designing Step By Step"} hidden_details={" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendiss malesuada lacus ex, sit amet blandit leo lobortis eget"} />
                    <BasicAccordion visible_title={"How To Learn Web Designing Step By Step"} hidden_details={" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendiss malesuada lacus ex, sit amet blandit leo lobortis eget"} />


                </div>

            </section>

            <Contactpage />
        </div>

    )
}

export default Faqpage
import React, { useState } from 'react'
import "./Faqpage.css";
import BasicAccordion from '../AccordionsMUI/Accordion';
import Navbar from '../Pages/Navbar';
import Contactpage from '../Pages/FooterPage';
import SearchIcon from '@mui/icons-material/Search';

function Faqpage() {
    const [searchQuery, setSearchQuery] = useState("");

    // Sample FAQ Data
    const faqData = [
        {
            question: "How do I start a course?",
            answer: "To start a course, simply browse our catalog, select the course you're interested in, and click the 'Buy Now' or 'Enroll' button. Once purchased, it will appear in your 'My Learnings' dashboard."
        },
        {
            question: "Are the certificates valid for jobs?",
            answer: "Yes! Our certificates are recognized by many top employers. They demonstrate your commitment to learning and mastery of specific skills, which can be a great addition to your resume."
        },
        {
            question: "Can I access the courses on mobile?",
            answer: "Absolutely. Our platform is fully responsive, meaning you can learn on the go using your smartphone, tablet, or laptop without any issues."
        },
        {
            question: "What is the refund policy?",
            answer: "We offer a 30-day money-back guarantee. If you are not satisfied with a course, you can request a full refund within 30 days of purchase, no questions asked."
        },
        {
            question: "Do you offer mentorship?",
            answer: "Many of our premium courses include access to instructor Q&A sections and community forums where you can get help. Some specific bootcamps also offer 1-on-1 mentorship."
        },
        {
            question: "How long do I have access to the course?",
            answer: "Once you purchase a course, you have lifetime access to it! You can revisit the materials anytime you want, even after you completed it."
        },
        {
            question: "Is there a student discount?",
            answer: "Yes, we frequently offer discounts for students. Please verify your student status via our support page to receive a unique discount code."
        },
        {
            question: "How to become an instructor?",
            answer: "You can apply to become an instructor by visiting the 'Instructor' page and filling out the application form. Our team will review your profile and get back to you."
        }
    ];

    const filteredFAQs = faqData.filter(item =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='faqpage'>
            <Navbar />
            <header className='faqpage_header'>
                <h1 className='faqpage_header_title'>
                    FAQ'S Page
                </h1>
                <span className='faqpage_header_sub_title'>
                    Home/<span className='faqpage_header_sub_sub_title'>FAQ</span>
                </span>

                <div className='faq_search_bar_container'>
                    <input
                        type="text"
                        className="faq_search_input"
                        placeholder="Search for answers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <SearchIcon className="faq_search_icon" />
                </div>
            </header>

            <section className='faqpage_main'>
                <h1 className='faqpage_main_title'>
                    Frequently Asked <span style={{ color: "coral" }}>Questions</span>
                </h1>
                <p className='faqpage_main_sub_title'>
                    Find answers to the most common questions about our platform, courses, and policies. If you can't find what you're looking for, feel free to contact us.
                </p>
            </section>

            <section className='faqpage_main_contents'>
                {filteredFAQs.length > 0 ? (
                    filteredFAQs.map((item, index) => (
                        <BasicAccordion
                            key={index}
                            visible_title={item.question}
                            hidden_details={item.answer}
                        />
                    ))
                ) : (
                    <div className='no_results'>
                        <p>No questions found matching "{searchQuery}"</p>
                    </div>
                )}
            </section>

            <Contactpage />
        </div>

    )
}

export default Faqpage
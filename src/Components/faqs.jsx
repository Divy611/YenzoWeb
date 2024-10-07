import { motion } from 'framer-motion';
import React, { useRef, useState, useEffect } from 'react'

export default function FAQs() {
    const faqRef = useRef(null);
    const lastQuestionRef = useRef(null);
    const firstQuestionRef = useRef(null);
    const [scrollLocked, setScrollLocked] = useState(false);

    useEffect(() => {
        const faqSectionObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) { setScrollLocked(true); }
                else { setScrollLocked(false); }
            },
            { threshold: 0.1 }
        );
        if (faqRef.current) { faqSectionObserver.observe(faqRef.current); }
        return () => {//eslint-disable-next-line
            if (faqRef.current) { faqSectionObserver.unobserve(faqRef.current); }
        };
    }, []);

    useEffect(() => {
        const lastQuestionObserver = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setScrollLocked(false); } },
            { threshold: 1.0 }
        );
        if (lastQuestionRef.current) { lastQuestionObserver.observe(lastQuestionRef.current); }
        return () => {//eslint-disable-next-line
            if (lastQuestionRef.current) { lastQuestionObserver.unobserve(lastQuestionRef.current); }
        };
    }, []);

    const handleWheel = (e) => {
        if (scrollLocked) {
            e.preventDefault();
            faqRef.current.scrollBy({ top: e.deltaY });
        }
    };

    return (
        <div className="h-screen overflow-hidden py-12">
            <div className="h-full overflow-y-auto" ref={faqRef} onWheel={handleWheel}>
                <div className="p-10 flex justify-between">
                    <div className="w-1/2 py-24 flex-col text-start sticky top-0 self-start">
                        <motion.div initial={{ opacity: 0, x: 25 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }} className="flex mt-6 justify-start items-center">
                            <div className="w-16 h-1 rounded-full bg-green-600"></div>
                            <span className="text-green-600 px-3">FAQs</span>
                            <div className="w-16 h-1 rounded-full bg-green-600"></div>
                        </motion.div>
                        <motion.h1 initial={{ opacity: 0, x: 25 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay: 0.15 }} className="text-white text-5xl font-semibold">Common Questions</motion.h1>
                    </div>

                    <div className="w-1/2">
                        <div ref={firstQuestionRef}><FAQ question={"What is Yenzo, and how does it work?"} answer={"Yenzo is an AI-powered speech coaching platform that helps professionals and students improve their communication skills. It uses advanced speech recognition, natural language processing, and computer vision to analyze your speech, body language, and content during practice sessions. Based on this comprehensive analysis, Yenzo provides real-time feedback to help you enhance your speaking abilities."} /></div>
                        <FAQ question={"Who is Yenzo for?"} answer={"Yenzo is designed for a wide range of users, including:"} bullet1={"Professionals looking to improve their communication skills for career advancement."} bullet2={"Students preparing for interviews, presentations, or public speaking events."} bullet3={"Non-native English speakers seeking to strengthen their English fluency and confidence."} bullet4={"Aspiring public speakers, entrepreneurs, and business leaders."} />
                        <FAQ question={"Can Yenzo be used for team or group training?"} answer={"Yes, Yenzo offers enterprise-level solutions that cater to the needs of teams and organizations. The key features of the Yenzo Enterprise plan include:"} bullet1={"Customized training modules and scenarios based on company-specific requirements."} bullet2={"Team performance analytics and progress tracking for managers and L&D professionals."} bullet3={"Dedicated account management and onboarding support for seamless implementation."} bullet4={"Bulk licensing and discounts for organizations investing in communication skill development."} />
                        <FAQ question={"How much does Yenzo cost?"} answer={"Yenzo offers a freemium pricing model:"} bullet1={"The 'Yenzo Basic' free tier provides basic speech analysis and limited practice sessions."} bullet2={"The 'Yenzo Pro' premium plan, priced at ₹199/month or ₹1,999/year, unlocks unlimited practice, real-time feedback, and advanced coaching features."} bullet3={"The 'Yenzo Enterprise' plan is designed for organizations and includes customized training modules, team analytics, and dedicated support."} />
                        <div className="mb-8" ref={lastQuestionRef}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}


const FAQ = ({ question, answer, bullet1, bullet2, bullet3, bullet4, bullet5, delay }) => {
    const bulletPoints = [bullet1, bullet2, bullet3, bullet4, bullet5];
    return (
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: delay }} className="py-4">
            <h1 className="text-2xl font-semibold text-white">{question}</h1>
            <h2 className="text-gray-300 text-lg">{answer}</h2>
            {bulletPoints.map((bullet, index) => (
                <ul style={{ listStyleType: "disc" }} className='px-3 py-1 w-4/5' key={index}>
                    {bullet
                        ? <li className='text-white w-full'>{bullet}</li>
                        : <></>
                    }
                </ul>
            ))}
        </motion.div>
    )
}
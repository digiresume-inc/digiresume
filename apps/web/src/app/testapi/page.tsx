'use client';
import React, { useState, useEffect } from 'react';

const TestAPI = () => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("")

  const callAPI = async () => {
    try {
      setLoading(true);

      const apiResponse = await fetch('http://localhost:3333/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `
          You are a structured resume parser.
          From the given resume text, extract only the following fields as a JSON object:
          - full_name
          - headline (a one-line summary from the intro or summary section)
          - skills: list of { label, value, category } objects (based on top skills or mentioned tools)
          - country (if mentioned)
          - profile_link: { url, text } — based on any portfolio or personal site link
          - experience: array of { role, company, start, end, location, duration }
          - socials: array of { platform, url, label }
          - company (current or most important one)
          - education (highest degree or most recent institution)
          
          Return only clean JSON with no explanations.
          
          Text is below:

          Contact  work.shivasai@gmail.com  www.linkedin.com/in/  theshivasaireddy   (LinkedIn)  mikkilishiva-tech.vercel.app/  (Portfolio)  Top Skills  Reverse Engineering  OSINT  Pwn  Certifications  Certificate of Merit  Complete Ethical Hacking Bootcamp  Technical Support and Operational  Assistance  Junior Cybersecurity Analyst Career  Path  Certificate of Participation  Shiva Sai Reddy Mikkili  Cyber Security enthusiast || Co-Founder at Postdev Infosec ||  Cybersecurity Mentor at e-DAM || ACP  Hyderabad, Telangana, India  Summary  Cybersecurity Enthusiast | Co-founder at PostDev InfoSec | Mentor  at e-DAM | Cybersecurity Undergrad at IARE College  Successfully completed the #100DaysOfCybersecurity challenge.  Passionate about securing digital landscapes and fostering a secure  cyber environment.  As the Co-founder at Postdev I lead a dynamic team dedicated to  providing cutting-edge cybersecurity solutions. Our mission is to  innovate, secure, and empower organizations in the digital age.  Sharing knowledge as a Cybersecurity Mentor at e-DAM, guiding  the next generation of professionals in the ever-evolving field of  cybersecurity.  Studying Cybersecurity at IARE College, gaining a solid foundation  in security principles and hands-on experience in protecting digital  assets.  Skills: Consistency | Technical Support | Cybersecurity Strategy |  Team player |  Let's connect and explore opportunities to collaborate and  strengthen the cybersecurity community!  Experience  Hack The Box  CTF Player  March 2024 - Present   (1 year 3 months)  e-DAM 2 years 5 months  Cybersecurity Mentor  January 2024 - Present   (1 year 5 months)  Hyderabad, Telangana, India  Learner at e-DAM  January 2023 - January 2024   (1 year 1 month)  Telangana, India  Postdev Infosec  Co-Founder  August 2023 - Present   (1 year 10 months)  Hyderabad, Telangana, India  TryHackMe  CTF Player  May 2023 - Present   (2 years 1 month)  Hyderabad, Telangana, India  Aveha Solutions Pvt. Ltd.  Cloud Operations and Technical Support Engineer Intern  April 2023 - September 2023   (6 months)  Telangana, India  Education  INSTITUTE OF AERONAUTICAL ENGINEERING  Bachelor of Technology - BTech, Computer Science and Engineering with  Specialization in Cyber Security.   · (2022 - 2026)  Sri Chaitanya College of Education  Intermediate   · (2020 - 2022)  New Era High School  School   · (2011 - 2020)
          `,
          model: 'cohere', // Will try best available model
          options: {
            maxTokens: 200,
            temperature: 0.7,
          },
        }),
      });

      if (!apiResponse.ok) {
        throw new Error(`HTTP error! status: ${apiResponse.status}`);
      }

      const data = await apiResponse.json();
      setResponse(data.data.response)
      console.log('API Response:', data);
    } catch (err) {
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callAPI();
  }, []);

  const handleRefresh = () => {
    callAPI();
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">AI API Test</h1>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        {loading && (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Calling AI API...</span>
          </div>
        )}

        <div className="mt-6 text-xs text-gray-500 space-y-1">
          <p>
            <strong>Endpoint:</strong> POST http://localhost:3333/api/generate
          </p>
          <p>
            <strong>Prompt:</strong> "Explain quantum computing simply"
          </p>
          <p>
            <strong>Model:</strong> auto (tries best available)
          </p>
          <p>
            <strong>Response:</strong> {response}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestAPI;

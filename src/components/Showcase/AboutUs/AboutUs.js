import React, { useState } from 'react';
import Header from '../Header/Header';
import './AboutUs.css';

const AboutUs = () => {
  const aboutUsData = {
    enabled: true, 
    sections: [
      {
        title: "Наша миссия",
        content:
          "Мы помогаем людям развивать навыки публичных выступлений, ораторского мастерства и эффективной коммуникации. Наша цель - создать сообщество, где каждый может раскрыть свой потенциал и научиться выражать свои мысли ясно и убедительно.",
      }
    ]
  }

  if (!aboutUsData.enabled) {
    return null
  }

  return (
    <>
      <Header />
      <section className="about-us-section">
      <div className="container">
        <h2 className="section-title">О нас</h2>

        <div className="about-us-content">
          {aboutUsData.sections.map((section, index) => (
            <div key={index} className="about-us-card">
              <h3 className="about-us-card-title">{section.title}</h3>
              <p className="about-us-card-content">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
      </section>
    </>
  )
}

export default AboutUs


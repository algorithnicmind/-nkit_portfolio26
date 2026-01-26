import React from 'react';
import Timeline from './Timeline';

const Educations = () => {
  const educationData = [
    {
      date: "2025 - Present",
      title: "Bachelor of Technology in Computer Science",
      subtitle: "DRIEMS University",
      description: "Relevant coursework: Data Structures, Algorithms, Web Development, Artificial Intelligence."
    },
    {
      date: "2022 - 2025",
      title: "Diploma in Computer Science and Engineering",
      subtitle: "DRIEMS Polytechnic",
      description: "Graduated with distinction in Science stream (Physics, Chemistry, Mathematics)."
    },
    {
      date: "2019 - 2021",
      title: "High School (10th Board)",
      subtitle: "Tangi Vidyapitha",
      description: "Completed 10th board with 80% marks. Active participant in science exhibitions and debates."
    },
    {
      date: "2010 - 2019",
      title: "Primary Education",
      subtitle: "Saraswati Sishu Vidya Mandir",
      description: "Foundational education with a strong focus on mathematics and science."
    }
  ];

  return (
    <section id="educations" className="timeline-section">
      <h2 className="section-title">Education</h2>
      <Timeline items={educationData} />
    </section>
  );
};

export default React.memo(Educations);
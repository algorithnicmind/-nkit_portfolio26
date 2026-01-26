import React from 'react';
import Timeline from './Timeline';

const Experience = () => {
  const experiences = [
    {
      date: "June 2023 - August 2023",
      title: "Software Developer Intern",
      subtitle: "Envistream Smarttech Pvt. Ltd.",
      description: "Worked on developing and optimizing web application. Collaborated with a team to deliver a high-impact project on time."
    },
    {
      date: "Jan 2023 - May 2023",
      title: "Student Intern",
      subtitle: "Edunet Organization",
      description: "Assisted in research on machine learning models for natural language processing. Published a paper in a reputed journal."
    },
    {
      date: "Sept 2022 - Dec 2022",
      title: "Academic Internship",
      subtitle: "Envistream Smarttech Pvt. Ltd.",
      description: "Gained hands-on experience in full-stack development. Participated in daily stand-ups and contributed to code reviews."
    }
  ];

  return (
    <section id="experience" className="timeline-section">
      <h2 className="section-title">Experience</h2>
      <Timeline items={experiences} />
    </section>
  );
};

export default React.memo(Experience);

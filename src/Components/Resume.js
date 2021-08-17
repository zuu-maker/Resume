import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion"
import {  useInView } from "react-intersection-observer"

const Resume = ({ data }) => {

  const {ref, inView} = useInView({
    threshold:0.3
  })
  
  const animationLeft = useAnimation()
  const animationRight = useAnimation()

  useEffect(() => {
        if(inView) {
          animationLeft.start({
            x:0, 
            transition:{
              type:'spring', duration: 1, bounce: 0.35
            }
          })

          animationRight.start({
            x:0, 
            transition:{
              type:'spring', duration: 1, bounce: 0.35
            }
          })
        }

        if(!inView) {
          animationLeft.start({
            x:'-100vw',
            transition:{
              duration:0.5
            }
          })

          animationRight.start({
            x:'100vw',
            transition:{
              duration:0.5
            }
          })
        }
  },[inView,animationRight,animationLeft])

  if (data) {
    var skillmessage = data.skillmessage;
    var education = data.education.map(function (education) {
      return (
        <div key={education.school}>
          <h3>{education.school}</h3>
          <p className="info">
            {education.degree} <span>&bull;</span>
            <em className="date">{education.graduated}</em>
          </p>
          <p>{education.description}</p>
        </div>
      );
    });
    // var work = data.work.map(function (work) {
    //   return (
    //     <div key={work.company}>
    //       <h3>{work.company}</h3>
    //       <p className="info">
    //         {work.title}
    //         <span>&bull;</span> <em className="date">{work.years}</em>
    //       </p>
    //       <p>{work.description}</p>
    //     </div>
    //   );
    // });
    var skills = data.skills.map(function (skills) {
      var className = "bar-expand " + skills.name.toLowerCase();
      return (
        <li key={skills.name}>
          <span style={{ width: skills.level }} className={className}></span>
          <em>{skills.name}</em>
        </li>
      );
    });
  }

  return (
    <section ref={ref} id="resume">
      <div className="row education">
        <motion.div
        className="three columns header-col"
        animate={animationLeft}
        >
          <h1>
            <span>Education</span>
          </h1>
        </motion.div>

        <motion.div 
        className="nine columns main-col"
        animate={animationRight}
        >
          <div className="row item">
            <div className="twelve columns">{education}</div>
          </div>
        </motion.div>
      </div>

      {/* <div className="row work">
        <div className="three columns header-col">
          <h1>
            <span>Work</span>
          </h1>
        </div>

        <div className="nine columns main-col">{work}</div>
      </div> */}

      <div className="row skill">
        <motion.div
         animate={animationLeft}
         className="three columns header-col">
          <h1>
            <span>Skills</span>
          </h1>
        </motion.div>

        <motion.div 
        animate={animationRight}
        className="nine columns main-col">
          <p>{skillmessage}</p>

          <div className="bars">
            <ul className="skills">{skills}</ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;

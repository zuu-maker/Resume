import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const About = ({ data }) => {
  const { ref, inView } = useInView({
    threshold: 0.6,
  });
  const animatation = useAnimation();
  const [done, setDone] = useState(false);

  if (data) {
    var name = data.name;
    var profilepic = "images/" + data.image;
    var bio = data.bio;
    var street = data.address.street;
    var city = data.address.city;
    var state = data.address.state;
    var zip = data.address.zip;
    var phone = data.phone;
    var email = data.email;
    var resumeDownload = data.resumedownload;
  }

  useEffect(() => {
    if (!done && inView) {
      animatation.start({
        scale: [1, 1.2, 1.2, 1, 1],
        rotate: [0, 0, 0, 180, 0],
        transition: {
          duration: 2.4,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
        },
      });
      setDone(true);
    }
    // eslint-disable-next-line
  }, [inView, animatation]);

  return (
    <section id="about">
      <div ref={ref} className="row">
        <div className="three columns">
          <motion.img
            animate={animatation}
            className="profile-pic"
            src={profilepic}
            alt="Mkhuzo's Profile Pic"
          />
        </div>
        <div className="nine columns main-col">
          <h2>About Me</h2>

          <p>{bio}</p>
          <div className="row">
            <div className="columns contact-details">
              <h2>Contact Details</h2>
              <p className="address">
                <span>{name}</span>
                <br />
                <span>
                  {street}
                  <br />
                  {city} {state}, {zip}
                </span>
                <br />
                <span>{phone}</span>
                <br />
                <span>{email}</span>
              </p>
            </div>
            <div className="columns download">
              <p>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={resumeDownload}
                  className="button"
                >
                  <i className="fa fa-download"></i>Download Resume
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

import { useProgress } from "@react-three/drei";
import { usePlay } from "./contexts/Play";
import { useRef } from "react";
import emailjs from "@emailjs/browser";

export const Overlay = () => {
  const { progress } = useProgress();
  const { play, end, setPlay, hasScroll } = usePlay();
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_vu3lg4s",
        "template_pm0clue",
        form.current,
        "hT5L6riFMcBANupO_"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <div
      className={`overlay ${play ? "overlay--disable" : ""}
    ${hasScroll ? "overlay--scrolled" : ""}`}
    >
      <div
        className={`loader ${progress === 100 ? "loader--disappear" : ""}`}
      />
      {progress === 100 && (
        <div className={`intro ${play ? "intro--disappear" : ""}`}>
          <h1 className="logo">HARSHIT P G</h1>
          <h5 className="logosub">WebDevloper | UI/UX Designer</h5>
          <p className="intro__scroll">Scroll slowly to begin the journey</p>
          <button
            className="explore"
            onClick={() => {
              setPlay(true);
            }}
          >
            Explore
          </button>
        </div>
      )}
      <div className={`outro ${end ? "outro--appear" : ""}`}>
        <div className="contactme">
          <p className="outro__text">Wish you had a great experience...</p>
          <div className="glass-container">
            <h1>CONTACT ME</h1>

            <form ref={form} onSubmit={sendEmail}>
              <input
                type="text"
                name="name"
                placeholder="Your Full Name"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
              />
              <textarea
                name="message"
                rows={7}
                placeholder="Your Message"
                required
              />
              <button type="submit" className="sendmessage">
                {" "}
                Send Message
              </button>
              <div className="contactmelinks">
                <a href="https://www.instagram.com/harshitpg/">
                  {" "}
                  <img
                    className="contactmeimg"
                    src="/images/instagram.png"
                    alt=""
                    style={{ width: "32px", height: "32px" }}
                  />
                </a>
                <a href="https://www.linkedin.com/in/harshit-p-g-a87623272">
                  {" "}
                  <img
                    className="contactmeimg"
                    src="/images/linkedin.png"
                    alt=""
                    style={{ width: "32px", height: "32px" }}
                  />
                </a>
                <a href="https://github.com/HarshitPG">
                  {" "}
                  <img
                    className="contactmeimg"
                    src="/images/github.png"
                    alt=""
                    style={{ width: "32px", height: "32px" }}
                  />
                </a>
                <a href="">
                  {" "}
                  <img
                    className="contactmeimg"
                    src="/images/twitter.png"
                    alt=""
                    style={{ width: "32px", height: "32px" }}
                  />
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

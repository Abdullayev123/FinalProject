import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { motion } from "framer-motion";
import BackButton from "../components/details/BackButton";
import CarModal from "../components/details/CarModal";
import CarInfo from "../components/details/CarInfo";

gsap.registerPlugin(ScrollTrigger);
const Detail = () => {
  const { brand, id } = useParams();
  const [data, setData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isHover, setIsHover] = useState(false);
  const [image, setImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const timeLine = useRef();
  const [text, setText] = useState("");
  const scrollTl = useRef();

  // Fetch
  useEffect(() => {
    fetch(`http://localhost:3000/cars/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [brand, id]);
  // Fetch

  // Modal
  useGSAP(() => {
    gsap.set("#modal-text", {
      y: 100,
    });
    gsap.set("#info-section", {
      opacity: 0,
    });
    scrollTl.current = gsap
      .timeline()
      .to("#info-section", {
        opacity: 1,
        duration: 0.3,
        scrollTrigger: {
          trigger: "#info-section",
          start: "-=100px 60%",
          end: "center 60%",
          scrub: 0.1,
        },
      })
      .to("#properties", {
        opacity: 1,
        duration: 0.3,
        scrollTrigger: {
          trigger: "#properties",
          start: "+=100px center",
          end: "center center",
          scrub: 0.1,
        },
      });

    timeLine.current = gsap
      .timeline({ paused: true })
      .to("#modal", 0.5, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        ease: "power4.inOut",
      })
      .to("#modal-text", 0.75, {
        y: 0,
        ease: "power4.inOut",
      })
      .to(
        "#modal-image",
        0.5,
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%",
          ease: "power4.inOut",
        },
        "<"
      );
  });

  useEffect(() => {
    if (isOpen) {
      timeLine.current.play();
    } else {
      timeLine.current.reverse();
    }
  }, [isOpen]);
  // Modal

  // Back Button animated
  function hoverAnim() {
    if (isHover) {
      gsap.to("#animated-icon", {
        rotate: -135,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to("#animated-icon", {
        rotate: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }
  useEffect(() => {
    hoverAnim();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHover]);
  // button animation

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ y: 20 }}
        transition={{ duration: 1 }}
      >
        <div className="py-[150px] px-4">
          <BackButton />
          <div id="detail-hero">
            <h1 className="text-white text-[18px] sm:text-[28px] md:text-[3rem] py-[60px] font-bold">
              ({data.modelName})
            </h1>
          </div>
          <div id="grid-overlay">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {data.modelImage &&
                data.modelImage.map((img, i) => {
                  return (
                    <img
                      key={i}
                      src={img}
                      alt=""
                      className="object-cover h-full cursor-pointer"
                      onClick={() => {
                        setImage(img);
                        setIsOpen(!isOpen);
                        setText("Exterior");
                      }}
                    />
                  );
                })}
              {data.modelInterior &&
                data.modelInterior.map((img, i) => {
                  return (
                    <img
                      key={i}
                      src={img}
                      alt=""
                      className="object-cover h-full cursor-pointer"
                      onClick={() => {
                        setImage(img);
                        setIsOpen(!isOpen);
                        setText("Interior");
                      }}
                    />
                  );
                })}
            </div>
          </div>
        </div>
        <CarModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isHover={isHover}
          image={image}
          text={text}
        />

        <CarInfo data={data} />
      </motion.div>
    </>
  );
};

export default Detail;

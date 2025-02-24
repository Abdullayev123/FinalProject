import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CursorContext } from "../components/context/CursorProvider";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger, useGSAP);
const About = () => {
  const scroll = useRef();
  const rightIndicator = useRef();
  const leftIndicator = useRef();
  const [data, setData] = useState([]);
  const { setCursorsize } = useContext(CursorContext);
  useEffect(() => {
    const shuffleData = (array) => {
      return array.sort(() => Math.random() - 0.5);
    };
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/cars");
      const data = await response.json();
      const shuffledArray = shuffleData(data);
      setData(shuffledArray);
    };
    fetchData();
  }, []);

  useGSAP(() => {
    gsap.to(scroll.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
        // markers: true,
      },
      ease: "power2.inOut",
    });

    gsap.to([leftIndicator.current], {
      rotate: 360,
      transformOrigin: "center center", // Ensures rotation happens from the center
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to([rightIndicator.current], {
      rotate: -360,
      transformOrigin: "center center", // Ensures rotation happens from the center
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to("#overlay", {
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#info-section",
        start: "top center",
      },
    });
  });

  return (
    <>
      <section id="hero" className="w-full h-screen relative overflow-hidden">
        <div id="bg-image" className="bg-black w-full h-full fixed -z-10">
          <img
            className="w-full h-full object-cover"
            src="https://res.cloudinary.com/dlajjeqxv/image/upload/v1740296590/photo-1678203699263-917199c725b2_dkbv0c.jpg"
            alt="Car Background"
          />
        </div>
        {/* Left Indicator */}
        <div
          ref={leftIndicator}
          className="absolute left-5 top-[50%] -translate-y-1/2 text-white text-[6rem] origin-center"
        >
          +
        </div>
        {/* Right Indicator */}
        <div
          ref={rightIndicator}
          className="absolute right-5 top-[50%] -translate-y-1/2 text-white text-[6rem] origin-center"
        >
          +
        </div>
        {/* Scroll Indicator */}
        <div ref={scroll}>
          <div className="absolute bottom-0 left-[50%] -translate-x-1/2">
            <h1 className="text-white text-[3rem]">Scroll</h1>
          </div>
        </div>
      </section>
      <section id="info-section" className="py-[100px] px-[18px] bg-white">
        <div id="overlay" className="flex flex-col lg:flex-row opacity-0">
          <div className="w-full mb-14 lg:w-1/3 ">
            <h1 className="text-[24px]">(Info)</h1>
          </div>
          <div id="text" className="w-full lg:w-2/3 text-2xl md:text-3xl">
            <h1 className="mb-10">
              At Azerbaijan Gallery, we bring the world of automotive excellence
              to your fingertips. Whether you&apos;re a car enthusiast, a
              collector, or simply someone who appreciates the beauty of finely
              crafted vehicles, our gallery is your gateway to a stunning
              collection of cars from every era and style.
            </h1>
            <h1 className="mb-10">
              Explore our curated selection of luxury sedans, powerful sports
              cars, rugged SUVs, and timeless classics. Each vehicle is a
              masterpiece of engineering and design, showcased in
              high-resolution images and detailed descriptions. From sleek
              modern designs to vintage treasures, our gallery celebrates the
              artistry and innovation of the automotive world.
            </h1>
            <h1>
              Step into the future with our exclusive collection of modern cars.
              These vehicles represent the pinnacle of automotive technology,
              combining cutting-edge performance with breathtaking aesthetics.
              From electric vehicles (EVs) that redefine sustainability to
              high-performance supercars that push the limits of speed, our
              modern car gallery showcases the best of what today&apos;s
              automotive industry has to offer.
            </h1>
          </div>
        </div>
      </section>

      <section id="selected-we" className="py-[100px] px-[18px] bg-white">
        <div id="section-heading">
          <Link
            to={`/allcars/`}
            onMouseEnter={() => {
              setCursorsize({ cursorWidth: 80, cursorHeight: 80 });
            }}
            onMouseLeave={() => {
              setCursorsize({ cursorWidth: 30, cursorHeight: 30 });
            }}
            onClick={() => {
              setCursorsize({ cursorWidth: 30, cursorHeight: 30 });
            }}
            className="h-fit mb-10 relative group flex  -gap-30"
          >
            <h1 className="md:text-[10rem] sm:text-[7rem] text-[4rem] leading-[1] mb-[60px]">
              All Cars
            </h1>
            <FaArrowRight
              id="arrow"
              className="transition-all duration-500 group-hover:translate-x-10 text-[3rem] md:text-[4rem]"
            />
          </Link>
        </div>
        <div>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-x-5 md:px-5">
            {data &&
              data.slice(0, 8).map((data) => {
                return (
                  <Link
                    key={data._id}
                    to={`/allcars/${data.brand.toLowerCase()}/${data._id}`}
                    onMouseEnter={() => {
                      setCursorsize({ cursorWidth: 80, cursorHeight: 80 });
                    }}
                    onMouseLeave={() => {
                      setCursorsize({ cursorWidth: 30, cursorHeight: 30 });
                    }}
                    onClick={() => {
                      setCursorsize({ cursorWidth: 30, cursorHeight: 30 });
                    }}
                    className="h-fit mb-10 relative group"
                  >
                    <div className=" border-b-2 pb-4 flex items-center justify-between ">
                      <h1 className=" text-black  text-md lg:text-2xl font-extralight">
                        {data.modelName}({data.brand})
                      </h1>
                      <FaArrowLeft
                        id="arrow"
                        className="transition-all duration-500 group-hover:rotate-180"
                      />
                    </div>
                    <img
                      className="absolute right-10 -top-1/2 -translate-y-5 w-[200px] opacity-0 group-hover:opacity-100 transition-all duration-500"
                      src={data.modelImage[0]}
                      alt=""
                    />
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

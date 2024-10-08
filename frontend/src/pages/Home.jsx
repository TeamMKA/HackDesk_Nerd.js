/* eslint-disable no-unused-vars */
import Button from "../components/Button";
import FaqSection from "../components/FaqSection";
import Features from "../components/Features";
import Map from "../components/Map";
import { IoIosArrowDown } from "react-icons/io";


const Home = () => {

  return (
    <>
      <section className=" mt-5 ">
        <div>
          <h1 className="head_text text-center">
            Navigate Safely:
            <br />
            <span className="orange_gradient">
              Your City, Your Safety Guide
            </span>
          </h1>
        </div>

        <div className="my-10">
          <p className="text-center font-satoshi  text-gray-800 text-base">
            Your City, Your Safety Guide is a web or mobile application designed
            to help users crowdsource and visualize real-time safety information
            about different areas of a city. It allows individuals to report
            incidents, view safety heatmaps, track safety scores for routes, and
            access community feedback, ensuring a safer navigation experience.
            By combining user-generated data and visual tools, it empowers
            residents and visitors to make informed decisions about the safety
            of their surroundings.
          </p>
        </div>

        <div className=" flex flex-center w-full mt-[5rem] ">
          <a href="#Main">
            <Button text={"Next Section"} />
          </a>
        </div>
      </section>

      <section id="Main" className="h-[100vh] w-full mt-[10rem]">
        <Map />
        <button className="flex w-full justify-center items-center">
          <a href="#main_2">
            <IoIosArrowDown size={50} className="translate-y-[-5rem] " />
          </a>
        </button>
      </section>

      <section id="main_2" className="h-[100vh] w-full mt-[10rem]">
        <Features />
      </section>

      <div className="py-20 mt-[8rem] h-[50vh] flex flex-col justify-center items-center " >
      <a href="/signIn">
      <Button text={"Join our Community"} />
      </a>
      </div>

    <section id="faq" className="h-[100vh] w-full mt-[5rem]" >
      <FaqSection />
    </section>

    </>
  );
};

export default Home;

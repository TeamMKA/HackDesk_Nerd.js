import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className=" mt-5 ">
      <div>
        <h1 className="head_text text-center">
          Navigate Safely:
          <br />
          <span className="orange_gradient">Your City, Your Safety Guide</span>
        </h1>
      </div>

      <div className="my-10">
        <p className="text-center font-satoshi  text-gray-800 text-base">
          Your City, Your Safety Guide is a web or mobile application designed
          to help users crowdsource and visualize real-time safety information
          about different areas of a city. It allows individuals to report
          incidents, view safety heatmaps, track safety scores for routes, and
          access community feedback, ensuring a safer navigation experience. By
          combining user-generated data and visual tools, it empowers residents
          and visitors to make informed decisions about the safety of their
          surroundings.
        </p>
      </div>

      <div className=" flex flex-center w-full mt-[5rem] ">
        <button className=" py-2 px-7 bg-orange-500 rounded-full">
          <Link to={"#Main"}> Get started</Link>
        </button>
      </div>
    </section>
  );
};

export default Home;

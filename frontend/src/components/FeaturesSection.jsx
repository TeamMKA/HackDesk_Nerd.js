/* eslint-disable react/prop-types */

const Card = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col justify-between p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="flex items-center justify-center mb-4 h-12 w-12 rounded-full bg-blue-100">
        {/* Replace with your icon */}
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-base">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      title: "Real-Time Incident Reporting",
      description:
        "Users can report incidents like theft, harassment, and accidents on a map, categorize them, and upload photos or videos for better documentation",
      icon: <svg> {/* Icon code */} </svg>,
    },
    {
      title: "Route Safety Score",
      description:
        "Users can check the safety of different travel routes and receive alerts near recently reported unsafe areas.",
      icon: <svg> {/* Icon code */} </svg>,
    },
    {
      title: "Incident History & Trends",
      description:
        "View historical safety data and analyze common incident types in specific neighborhoods over time.",
      icon: <svg> {/* Icon code */} </svg>,
    },
    {
      title: "Community Verification & Feedback",
      description:
        "Users can verify incidents by commenting or voting and provide feedback on safety conditions like lighting or police presence",
      icon: <svg> {/* Icon code */} </svg>,
    },
    {
      title: "Intuitive Interface",
      description:
        "Enjoy a user-friendly and intuitive interface for seamless navigation and boost productivity.",
      icon: <svg> {/* Icon code */} </svg>,
    },
    {
      title: "Automated Workflows",
      description:
        "Optimize your processes with automated workflows, saving time and reducing manual errors.",
      icon: <svg> {/* Icon code */} </svg>,
    },
  ];

  return (
    <section className="glassmorphism py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
          Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

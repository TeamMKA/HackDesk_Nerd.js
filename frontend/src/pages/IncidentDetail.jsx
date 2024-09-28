import { ArrowUpIcon, ArrowDownIcon, MessageCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const IncidentDetail = () => {
  const [incident, setIncident] = useState(null);
  const [video, setVideo] = useState(null);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const response = await axios.get(
          "https://6nddmv2g-8000.inc1.devtunnels.ms/api/posts/get-post"
        );
        console.log(response.data);
        setIncident(response.data[0]);
        setVideo(response.data[0].videoFile);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataAsync();
  }, []);

  if (!incident) {
    return <div>Loading...</div>;
  }

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{incident.type}</h2>
          <span className="text-gray-500">{incident.location}</span>
        </div>

        {incident.imageFiles && incident.imageFiles.length > 0 && (
          <div className="mb-4 space-y-2">
            {incident.imageFiles.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Incident photo ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>
        )}

        <div className="mb-4 space-y-2 w-full flex justify-center items-center">
          <video autoPlay muted preload="false">
            <source src={video} />
          </video>
        </div>

        <p className="text-gray-700 mb-4">{incident.description}</p>

        <div className="flex justify-between items-center text-gray-500">
          <div className="flex space-x-4">
            <button className="flex items-center space-x-1">
              <ArrowUpIcon className="w-5 h-5" />
              <span>{incident.like}</span>
            </button>
            <button className="flex items-center space-x-1">
              <ArrowDownIcon className="w-5 h-5" />
              <span>{incident.dislike}</span>
            </button>
          </div>
          <button className="flex items-center space-x-1" onClick={toggleComments}>
            <MessageCircleIcon className="w-5 h-5" />
            <span>{incident.comments.length}</span>
          </button>
        </div>

        {showComments && (
          <div className="mt-4">
            {incident.comments.length > 0 ? (
              incident.comments.map((comment, index) => (
                <div key={index} className="p-2 border-t border-gray-200">
                  <p className="text-gray-700">{comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IncidentDetail;
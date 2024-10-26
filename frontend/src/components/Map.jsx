/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix for default marker icon issue
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
})

const SetViewOnClick = ({ coords }) => {
    const map = useMap()
    useEffect(() => {
        if (coords) {
            map.setView(coords, 13)
        }
    }, [coords, map])
    return null
}

const Map = () => {
    const [position, setPosition] = useState(null)

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setPosition([
                        position.coords.latitude,
                        position.coords.longitude,
                    ])
                },
                (error) => {
                    console.error("Error retrieving geolocation: ", error)
                }
            )
        }
    }, [])

    return (
        <div className="py-20 flex flex-1 justify-between items-center space-x-8">
            <div>
                <MapContainer
                    center={[20.5937, 78.9629]}
                    zoom={5}
                    style={{
                        height: "600px",
                        width: "600px",
                        borderRadius: "50%",
                    }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {position && (
                        <>
                            <Marker position={position}>
                                <Popup> Current Location is {position} </Popup>
                            </Marker>
                            <SetViewOnClick coords={position} />
                        </>
                    )}
                </MapContainer>
            </div>
            <div className="flex flex-col space-y-[2rem] items-center ">
                <h1 className=" head_text orange_gradient text-center border-b-4 border-orange-600 pb-2 w-[65%]">
                    About US
                </h1>
                <p className="text-base font-satoshi text-wrap overflow-hidden text-gray-800 leading-relaxed mt-4 mb-6 px-4  tracking-wider whitespace-pre-wrap text-md ">
                    At SafeHer, we are committed to empowering women by creating
                    safer, more supportive communities. Founded on the belief
                    that safety is a right, not a privilege, our platform brings
                    women together to share resources, experiences, and support.
                    Through the power of crowdsourcing, we offer tools and
                    insights that help women navigate their environments more
                    safely and confidently. Our community-driven platform
                    encourages women to connect, report, and access real-time
                    information about safe spaces, giving everyone a voice in
                    shaping a safer world. By uniting our collective knowledge
                    and experiences, we aim to foster an environment of mutual
                    trust, safety, and empowerment. Together, we can make a
                    difference. Join SafeHer and be part of a movement that
                    prioritizes women's safety, well-being, and empowerment.
                </p>
            </div>
        </div>
    )
}

export default Map

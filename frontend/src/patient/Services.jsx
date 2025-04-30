import React from "react";
import "./Services.css";
import { FcPlus } from "react-icons/fc";
import { MdOutlineDateRange } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";

const Services = () => {
  const allServices = [
    {
      id: 1,
      name: "Blood Test",
      date: "May 3, 2025",
      time: "9.00 AM",
      roomNum: "ABC-001",
      instruction:
        "fast for a specific duration (usually 8-12 hours), drink water, and avoid certain foods and drinks.",
    },
    {
      id: 2,
      name: "Urine Test",
      date: "May 5, 2025",
      time: "9.00 AM",
      roomNum: "ABC-001",
      instruction:
        "fast for a specific duration (usually 8-12 hours), drink water, and avoid certain foods and drinks.",
    },
    {
      id: 3,
      name: "X-Ray",
      date: "May 8, 2025",
      time: "9.00 AM",
      roomNum: "ABC-001",
      instruction:
        "fast for a specific duration (usually 8-12 hours), drink water, and avoid certain foods and drinks.",
    },
  ];

  return (
    <div class="service-container">
      <h2>Your Upcoming Services</h2>
      <p>
        Here are your upcoming services. We’re with you every step of the way!
      </p>

      <button>
        <FcPlus className="icon" />
        add new service
      </button>

      <div className="service-card-wrapper">
        {allServices.map((service) => (
          <div class="service-card" key={service.id}>
            <h3>{service.name}</h3>
            <p>
              <MdOutlineDateRange className="icon" />
              {service.date}
            </p>
            <p>
              <IoTimeOutline className="icon" />
              {service.time}
            </p>
            <p>
              <IoLocationOutline className="icon" />
              {service.roomNum}
            </p>
            <p>
              Instruction:<br></br>
              {service.instruction}
            </p>

            <button>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;

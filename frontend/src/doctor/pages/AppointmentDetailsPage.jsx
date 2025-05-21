import { useParams } from 'react-router-dom';
import appointmentsData from '../data/appointments.json';
import { useState ,useEffect} from 'react';
import axios from 'axios';

const AppointmentDetailsPage = () => {
  const { id } = useParams();
  const [data,setData] = useState([]);

  const appointment = appointmentsData?.find(a => a.appointment_ID === id);

    const getAllAppointments = async () => {


    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointments/"
      );

      setData((preData) =>
        response.data.data.find((appointment) =>appointment?._id===id)
      );
      
    } catch (error) {
      console.log("Error fetching appointments", error);
      setData([]);
    }
  };

  useEffect(() => {
    getAllAppointments();
  }, []);

  console.log(data,"data")

  if (!data) {
    return <div className="p-4 text-danger">Appointment not found.</div>;
  }

  return (
    <div className="container py-5">
      <h3 className="display-5 fw-bold text-teal mb-5 text-center">Appointment Details</h3>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm healthcare-card">
            <div className="card-header healthcare-card-header">
              <h4 className="mb-0 text-white">Patient & Appointment Information</h4>
            </div>
            <div className="card-body">
              <dl className="row mb-0">
                <dt className="col-sm-4 fw-semibold">Appointment ID</dt>
                <dd className="col-sm-8">{data?._id}</dd>

                <dt className="col-sm-4 fw-semibold">Patient ID</dt>
                <dd className="col-sm-8">{data?.patient?._id}</dd>

                <dt className="col-sm-4 fw-semibold">Name</dt>
                <dd className="col-sm-8">{data?.patient?.fullName}</dd>

                <dt className="col-sm-4 fw-semibold">NIC</dt>
                <dd className="col-sm-8">{data?.patient?.nic}</dd>

                {/* <dt className="col-sm-4 fw-semibold">Age</dt>
                <dd className="col-sm-8">{data?.age}</dd>

                <dt className="col-sm-4 fw-semibold">Gender</dt>
                <dd className="col-sm-8">{data?.gender}</dd> */}

                <dt className="col-sm-4 fw-semibold">Phone</dt>
                <dd className="col-sm-8">{data?.patient?.mobileNumber}</dd>

                <dt className="col-sm-4 fw-semibold">Email</dt>
                <dd className="col-sm-8">{data?.patient?.email}</dd>
{/* 
                <dt className="col-sm-4 fw-semibold">Address</dt>
                <dd className="col-sm-8">{data?.address}</dd> */}

                <dt className="col-sm-4 fw-semibold">Medicine</dt>
                <dd className="col-sm-8">{data?.medicine}</dd>

                <dt className="col-sm-4 fw-semibold">Description</dt>
                <dd className="col-sm-8">{data?.advice}</dd>

                <dt className="col-sm-4 fw-semibold">Date</dt>
                <dd className="col-sm-8">{data?.appointment?.date}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .text-teal {
          color: #17a2b8;
        }
        .healthcare-card {
          border: none;
          border-radius: 12px;
          background-color: #ffffff;
          transition: transform 0.3s ease;
        }
        .healthcare-card:hover {
          transform: translateY(-5px);
        }
        .healthcare-card-header {
          background: linear-gradient(135deg, #17a2b8, #138496);
          border-radius: 12px 12px 0 0;
          padding: 1.5rem;
        }
        .card-body {
          background-color: #e9ecef;
          border-radius: 0 0 12px 12px;
        }
        .row.mb-0 > dt, .row.mb-0 > dd {
          margin-bottom: 0.75rem;
        }
        dt.fw-semibold {
          color: #343a40;
        }
        @media (max-width: 767px) {
          .row.mb-0 > dt {
            margin-bottom: 0.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AppointmentDetailsPage;

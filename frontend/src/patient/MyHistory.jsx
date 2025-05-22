import React, { useState, useEffect, useContext } from "react";
import "./MyHistory.css";
import {
  FaUserMd,
  FaFileMedical,
  FaFlask,
  FaSearch,
  FaFilter,
  FaDownload,
} from "react-icons/fa";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import axios from "axios";
import { UserContext } from "../common/UserContext";

function MyHistory() {
  const [activeTab, setActiveTab] = useState("visits");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("all");
  const [serviceHistory, setServiceHistory] = useState([]);
  const [medicalHistory, setmedicalHistory] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const userId = user?.patient?.patientId;

  // const medicalHistory = [
  //   {
  //     id: 1,
  //     name: "Ashan Vimod",
  //     doctor: "Dr. Kavindya Perera",
  //     specialty: "Neurologist",
  //     date: "2025-05-14",
  //     time: "2:30 PM",
  //     location: "Clinical Room-001",
  //     status: "Pending",
  //     phone: "+94 77 123 4567",
  //     reason: "cscscsdscs",
  //     diagnosis: "123444",
  //     recommendations: "sdfscsdcsd",
  //   },
  //   {
  //     id: 2,
  //     name: "Ashan Vimod",
  //     doctor: "Dr. Isuru Perera",
  //     specialty: "Dental",
  //     date: "2025-05-14",
  //     time: "2:30 PM",
  //     location: "Clinical Room-001",
  //     status: "Confirmed",
  //     phone: "+94 77 123 4567",
  //     reason: "nam cmasc ",
  //     diagnosis: " jc nakca",
  //     recommendations: "ajsjcnjasc",
  //   },
  //   {
  //     id: 3,
  //     name: "Ashan Vimod",
  //     doctor: "Dr. Isuru Perera",
  //     specialty: "Dental",
  //     date: "2025-05-14",
  //     time: "2:30 PM",
  //     location: "Clinical Room-001",
  //     status: "Confirmed",
  //     phone: "+94 77 123 4567",
  //     reason: "ffffffffffffffff",
  //     diagnosis: "hhhh",
  //     recommendations: "ajcb habcasj",
  //   },
  // ];

  // const serviceHistory = [
  //   {
  //     id: 1,
  //     name: "Blood Test",
  //     date: "2025-05-14",
  //     time: "9.00 AM",
  //     roomNum: "ABC-001",
  //     result: "normal",
  //     notes: "ewjfuirhuh hbioj oejrgore ok",
  //   },
  //   {
  //     id: 2,
  //     name: "Blood Test",
  //     date: "2025-05-14",
  //     time: "9.00 AM",
  //     roomNum: "ABC-001",
  //     result: "normal",
  //     notes: "d cd kdmcksdm lkmv;slv,s",
  //   },
  //   {
  //     id: 3,
  //     name: "Blood Test",
  //     date: "2025-05-14",
  //     time: "9.00 AM",
  //     roomNum: "ABC-001",
  //     result: "abnormal",
  //     notes: "kdcnalkcnlkmc k klwcv dlsnckldnv",
  //   },
  // ];

  useEffect(() => {
    if (userId) {
      fetchServiceHistoryByPatientsId();
      fetchMedicalHistoryByPatientId();
    }
  }, [userId]);

  const fetchMedicalHistoryByPatientId = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointments/"
      );
      setmedicalHistory(
        response.data.data.filter(
          (item) => item?.patient?._id === userId && item?.completed === true
        )
      );
      console.log(response.data.data);
    } catch (error) {
      console.log("Error fetching medical history");
    }
  };

  const fetchServiceHistoryByPatientsId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/services/patient/${userId}`
      );

      const allServices = response.data?.data || [];

      const today = new Date();
      const upcomingServices = allServices.filter((service) => {
        const serviceDate = new Date(service.date);
        // Keep only services that are today or in the future
        return serviceDate >= today.setHours(0, 0, 0, 0);
      });

      setServiceHistory(upcomingServices);
      console.log(upcomingServices);
    } catch (error) {
      console.log("Error fetching services", error);
    }
  };

  // Get unique years for filtering
  const getAllYears = () => {
    const years = new Set();
    [medicalHistory, serviceHistory].forEach((items) => {
      items.forEach((item) => {
        const year = new Date(item.date).getFullYear();
        if (!isNaN(year)) years.add(year);
      });
    });
    return Array.from(years).sort((a, b) => b - a);
  };

  // Filter visits data based on search term and year
  const getFilteredVisits = () => {
    return medicalHistory.filter((visit) => {
      const visitYear = new Date(visit?.appointment?.date)
        .getFullYear()
        .toString();
      const yearMatch = filterYear === "all" || visitYear === filterYear;
      const searchLower = searchTerm.toLowerCase();
      const searchMatch =
        searchTerm === "" ||
        visit?.appointment?.doctorName.toLowerCase().includes(searchLower) ||
        visit?.appointment?.specialization
          .toLowerCase()
          .includes(searchLower) ||
        visit?.medicine.toLowerCase().includes(searchLower) ||
        visit?.advice.toLowerCase().includes(searchLower);
      return yearMatch && searchMatch;
    });
  };

  // Filter tests data based on search term and year
  const getFilteredTests = () => {
    return serviceHistory.filter((test) => {
      const testYear = new Date(test.date).getFullYear().toString();
      const yearMatch = filterYear === "all" || testYear === filterYear;
      const searchLower = searchTerm.toLowerCase();
      const searchMatch =
        searchTerm === "" ||
        test.name?.toLowerCase().includes(searchLower) ||
        test.result?.toLowerCase().includes(searchLower) ||
        test.notes?.toLowerCase().includes(searchLower);
      return yearMatch && searchMatch;
    });
  };

  // Function to generate and download PDF
  const downloadPDF = async () => {
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([595, 842]); // A4 size in points
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontSize = 12;
    let yPosition = height - 50;

    // Helper function to add a new page if needed
    const addNewPageIfNeeded = () => {
      if (yPosition < 50) {
        page = pdfDoc.addPage([595, 842]);
        yPosition = height - 50;
      }
    };

    // Add title
    page.drawText("My Medical History", {
      x: 50,
      y: yPosition,
      size: 20,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 40;

    // Add Doctor Visits section
    page.drawText("Doctor Visits", {
      x: 50,
      y: yPosition,
      size: 16,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 20;

    getFilteredVisits().forEach((visit) => {
      addNewPageIfNeeded();
      const text = `Appointment No: ${visit.id}\nDoctor: ${visit.doctor} (${visit.specialty})\nReason: ${visit.reason}\nDiagnosis: ${visit.diagnosis}\nRecommendations: ${visit.recommendations}\nDate: ${visit.date}`;
      const lines = text.split("\n");
      lines.forEach((line) => {
        addNewPageIfNeeded();
        page.drawText(line, {
          x: 50,
          y: yPosition,
          size: fontSize,
          font: font,
          color: rgb(0, 0, 0),
        });
        yPosition -= 20;
      });
      yPosition -= 10; // Space between entries
    });

    yPosition -= 20;
    addNewPageIfNeeded();

    // Add Medical Tests section
    page.drawText("Medical Tests", {
      x: 50,
      y: yPosition,
      size: 16,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= 20;

    getFilteredTests().forEach((test) => {
      addNewPageIfNeeded();
      const text = `Appointment No: ${test.id}\nTest: ${test.name}\nResult: ${test.result}\nNotes: ${test.notes}\nDate: ${test.date}`;
      const lines = text.split("\n");
      lines.forEach((line) => {
        addNewPageIfNeeded();
        page.drawText(line, {
          x: 50,
          y: yPosition,
          size: fontSize,
          font: font,
          color: rgb(0, 0, 0),
        });
        yPosition -= 20;
      });
      yPosition -= 10; // Space between entries
    });

    // Save and download the PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "medical_history.pdf";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  // Render different content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "visits":
        return renderVisits();
      case "tests":
        return renderTests();
      default:
        return renderVisits();
    }
  };

  // Render doctor visits
  const renderVisits = () => {
    const filteredVisits = getFilteredVisits();
    if (filteredVisits.length === 0) {
      return renderEmptyState("No doctor visits found matching your criteria");
    }
    return (
      <div className="history-items-container">
        {filteredVisits.map((visit) => (
          <div className="history-card" key={visit._id}>
            <div className="history-card-header">
              <div className="history-card-title">
                <div>
                  <h4>{visit.appointment?.doctorName}</h4>
                  <p className="history-subtitle">
                    {visit.appointment?.specialization}
                  </p>
                </div>
              </div>
              <div className="appoinment-number">
                <span>
                  <MdOutlineFormatListNumbered className="appoinment-number-icon" />
                  <span>Appointment No:</span>
                </span>
                <span> {visit._id}</span>
              </div>
            </div>
            <div className="history-card-content">
              <div className="history-detail-item">
                <span className="detail-label">Diagnosis:</span>
                <span className="detail-value">{visit.medicine}</span>
              </div>
              <div className="history-detail-item">
                <span className="detail-label">Recommendations:</span>
                <span className="detail-value">{visit.advice}</span>
              </div>
              <div className="history-detail-item">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{visit.appointment?.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render medical tests
  const renderTests = () => {
    const filteredTests = getFilteredTests();
    if (filteredTests.length === 0) {
      return renderEmptyState("No medical tests found matching your criteria");
    }
    return (
      <div className="history-items-container">
        {filteredTests.map((test) => (
          <div className="history-card" key={test._id}>
            <div className="history-card-header">
              <div className="history-card-title">
                <FaFlask className="history-icon" />
                <div>
                  <h4>{test.name}</h4>
                </div>
              </div>
              <div className="appoinment-number">
                <span>
                  <MdOutlineFormatListNumbered className="appoinment-number-icon" />
                  <span className="appointment-title">Appoinment No:</span>
                </span>
                <span>{test._id}</span>
              </div>
            </div>
            <div className="history-card-content">
              <div className="history-detail-item">
                <span className="detail-label">Result:</span>
                <span
                  className={`detail-value result-${test.result?.toLowerCase()}`}
                >
                  {test.result}
                </span>
              </div>
              <div className="history-detail-item">
                <span className="detail-label">Notes:</span>
                <span className="detail-value">{test.notes}</span>
              </div>
              <div className="history-detail-item">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{test.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render empty state when no data is found
  const renderEmptyState = (message) => {
    return (
      <div className="empty-history-state">
        <div className="empty-history-icon">
          <FaFileMedical />
        </div>
        <h4>{message}</h4>
        <p>Try changing your search or filter settings</p>
      </div>
    );
  };

  return (
    <div className="channeling-info-card">
      <div className="medical-history-container">
        <div className="medical-history-header">
          <h1>My Medical History</h1>
          <p className="history-description">
            Access and monitor your comprehensive medical history, Including
            doctor consultations, diagnostic reports, and test results, All in
            one secure and organized platform for improved health oversight.
          </p>
        </div>

        {/* Search and filter controls */}
        <div className="history-controls">
          <div className="history-search">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search your medical history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="history-filter">
            <FaFilter className="filter-icon" />
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
            >
              <option value="all">All Years</option>
              {getAllYears().map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Download button */}
          <button className="download-button" onClick={downloadPDF}>
            <FaDownload className="download-icon" />
            <span>Download PDF</span>
          </button>
        </div>

        {/* Navigation tabs */}
        <div className="history-tabs">
          <button
            className={`history-tab ${activeTab === "visits" ? "active" : ""}`}
            onClick={() => setActiveTab("visits")}
          >
            <FaUserMd className="tab-icon" />
            <span>Doctor Visits</span>
          </button>
          <button
            className={`history-tab ${activeTab === "tests" ? "active" : ""}`}
            onClick={() => setActiveTab("tests")}
          >
            <FaFlask className="tab-icon" />
            <span>Medical Tests</span>
          </button>
        </div>

        {/* Tab content */}
        <div className="history-content">{renderTabContent()}</div>
      </div>
    </div>
  );
}

export default MyHistory;

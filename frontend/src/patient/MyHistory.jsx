import React, { useState } from "react";
import "./MyHistory.css";
import {
  FaCalendarAlt,
  FaUserMd,
  FaFileMedical,
  FaClipboardList,
  FaFlask,
  FaPills,
  FaHeartbeat,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import { MdOutlineFormatListNumbered } from "react-icons/md";

function MyHistory() {
  const [activeTab, setActiveTab] = useState("visits");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("all");

  const medicalHistory = [
    {
      id: 1,
      name: "Ashan Vimod",
      doctor: "Dr. Kavindya Perera",
      specialty: "Neurologist",
      date: "2025-05-14",
      time: "2:30 PM",
      location: "Clinical Room-001",
      status: "Pending",
      phone: "+94 77 123 4567",
      reason: "cscscsdscs",
      diagnosis: "123444",
      recommendations: "sdfscsdcsd",
    },
    {
      id: 2,
      name: "Ashan Vimod",
      doctor: "Dr. Isuru Perera",
      specialty: "Dental",
      date: "2025-05-14",
      time: "2:30 PM",
      location: "Clinical Room-001",
      status: "Confirmed",
      phone: "+94 77 123 4567",
      reason: "nam cmasc ",
      diagnosis: " jc nakca",
      recommendations: "ajsjcnjasc",
    },
    {
      id: 3,
      name: "Ashan Vimod",
      doctor: "Dr. Isuru Perera",
      specialty: "Dental",
      date: "2025-05-14",
      time: "2:30 PM",
      location: "Clinical Room-001",
      status: "Confirmed",
      phone: "+94 77 123 4567",
      reason: "ffffffffffffffff",
      diagnosis: "hhhh",
      recommendations: "ajcb habcasj",
    },
  ];

  const serviceHistory = [
    {
      id: 1,
      name: "Blood Test",
      date: "2025-05-14",
      time: "9.00 AM",
      roomNum: "ABC-001",
      result: "normal",
      notes: "ewjfuirhuh hbioj oejrgore ok",
    },
    {
      id: 2,
      name: "Blood Test",
      date: "2025-05-14",
      time: "9.00 AM",
      roomNum: "ABC-001",
      result: "normal",
      notes: "d cd kdmcksdm lkmv;slv,s",
    },
    {
      id: 3,
      name: "Blood Test",
      date: "2025-05-14",
      time: "9.00 AM",
      roomNum: "ABC-001",
      result: "abnormal",
      notes: "kdcnalkcnlkmc k klwcv  dlsnckldnv",
    },
  ];

  // Get unique years for filtering
  const getAllYears = () => {
    const years = new Set();

    // use medicalHistory and serviceHistory
    [medicalHistory, serviceHistory].forEach((items) => {
      items.forEach((item) => {
        const year = new Date(item.date).getFullYear();
        if (!isNaN(year)) years.add(year);
      });
    });

    return Array.from(years).sort((a, b) => b - a); // Sort descending
  };

  // Filter visits data based on search term and year
  const getFilteredVisits = () => {
    return medicalHistory.filter((visit) => {
      // Apply year filter
      const visitYear = new Date(visit.date).getFullYear().toString();
      const yearMatch = filterYear === "all" || visitYear === filterYear;

      // Apply search filter with case insensitive
      const searchLower = searchTerm.toLowerCase();
      const searchMatch =
        searchTerm === "" ||
        visit.doctor.toLowerCase().includes(searchLower) ||
        visit.specialty.toLowerCase().includes(searchLower) ||
        visit.reason.toLowerCase().includes(searchLower) ||
        visit.diagnosis.toLowerCase().includes(searchLower) ||
        visit.recommendations.toLowerCase().includes(searchLower);

      return yearMatch && searchMatch;
    });
  };

  // Filter tests data based on search term and year
  const getFilteredTests = () => {
    return serviceHistory.filter((test) => {
      // Apply year filter
      const testYear = new Date(test.date).getFullYear().toString();
      const yearMatch = filterYear === "all" || testYear === filterYear;

      // Apply search filter case insensitive
      const searchLower = searchTerm.toLowerCase();
      const searchMatch =
        searchTerm === "" ||
        test.name.toLowerCase().includes(searchLower) ||
        test.result.toLowerCase().includes(searchLower) ||
        test.notes.toLowerCase().includes(searchLower);

      return yearMatch && searchMatch;
    });
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
          <div className="history-card" key={visit.id}>
            <div className="history-card-header">
              <div className="history-card-title">
                <div>
                  <h4>{visit.doctor}</h4>
                  <p className="history-subtitle">{visit.specialty}</p>
                </div>
              </div>
              <div className="appoinment-number">
                <span>
                  <MdOutlineFormatListNumbered className="appoinment-number-icon" />
                  <span>Appointment No:</span>
                </span>
                <span> {visit.id}</span>
              </div>
            </div>

            <div className="history-card-content">
              <div className="history-detail-item">
                <span className="detail-label">Reason for Visit:</span>
                <span className="detail-value">{visit.reason}</span>
              </div>

              <div className="history-detail-item">
                <span className="detail-label">Diagnosis:</span>
                <span className="detail-value">{visit.diagnosis}</span>
              </div>

              <div className="history-detail-item">
                <span className="detail-label">Recommendations:</span>
                <span className="detail-value">{visit.recommendations}</span>
              </div>

              <div className="history-detail-item">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{visit.date}</span>
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
          <div className="history-card" key={test.id}>
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
                <span>{test.id}</span>
              </div>
            </div>

            <div className="history-card-content">
              <div className="history-detail-item">
                <span className="detail-label">Result:</span>
                <span
                  className={`detail-value result-${test.result.toLowerCase()}`}
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

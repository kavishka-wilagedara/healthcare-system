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

  // Sample medical history data
  const medicalHistory = [
    {
      id: 1,
      date: "2025-04-15",
      doctor: "Dr. Sarah Williams",
      specialty: "General Physician",
      reason: "Annual checkup",
      diagnosis: "Healthy, minor vitamin D deficiency",
      recommendations: "Vitamin D supplements, regular exercise",
    },
    {
      id: 2,
      date: "2025-02-10",
      doctor: "Dr. Michael Chen",
      specialty: "Cardiologist",
      reason: "Chest pain investigation",
      diagnosis: "Mild anxiety-induced chest pain",
      recommendations: "Stress management techniques, follow-up in 3 months",
    },
    {
      id: 3,
      date: "2024-11-22",
      doctor: "Dr. Emma Rodriguez",
      specialty: "Dermatologist",
      reason: "Skin rash",
      diagnosis: "Contact dermatitis",
      recommendations: "Apply prescribed cream twice daily, avoid allergen",
    },
  ];

  const serviceHistory = [
    {
      id: 1,
      date: "2025-04-15",
      name: "Complete Blood Count",
      result: "Normal",
      notes: "All parameters within normal range",
    },
    {
      id: 2,
      date: "2025-02-10",
      name: "ECG",
      requestedBy: "Dr. Michael Chen",
      result: "Normal",
      notes: "Regular sinus rhythm, no abnormalities detected",
    },
    {
      id: 3,
      date: "2025-02-10",
      name: "Cardiac Enzyme Panel",
      requestedBy: "Dr. Michael Chen",
      result: "Normal",
      notes: "Troponin, CK-MB within normal limits",
    },
  ];

  // Get unique years for filtering
  const getAllYears = () => {
    const years = new Set();

    const allHistory = [medicalHistory, serviceHistory];

    allHistory.forEach((history) => {
      Object.values(history).forEach((category) => {
        if (!Array.isArray(category)) {
          console.warn("Expected array but got:", category);
          return;
        }

        category.forEach((item) => {
          const year = new Date(item.date).getFullYear();
          if (!NaN(year)) years.add(year);
        });
      });
    });

    return Array.from(years).sort((a, b) => b - a); // Sort descending
  };

  // Filter data based on search term and year
  const filterData = (data) => {
    const combinedHistory = [];

    const allHistories = [medicalHistory, serviceHistory];

    allHistories.forEach((history) => {
      Object.values(history).forEach((category) => {
        if (Array.isArray(category)) {
          combined.push(...category);
        }
      });
    });

    return combinedHistory;
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
    if (medicalHistory.length === 0) {
      return renderEmptyState("No doctor visits found matching your criteria");
    }

    return (
      <div className="history-items-container">
        {medicalHistory.map((visit) => (
          <div className="history-card" key={visit.id}>
            <div className="history-card-header">
              <div className="history-card-title">
                <FaUserMd className="history-icon" />
                <div>
                  <h4>{visit.doctor}</h4>
                  <p className="history-subtitle">{visit.specialty}</p>
                </div>
              </div>
              <div className="appoinment-number">
                <span>
                  <MdOutlineFormatListNumbered className="appoinment-number-icon" />
                  Appoinment No:
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
    if (serviceHistory.length === 0) {
      return renderEmptyState("No medical tests found matching your criteria");
    }

    return (
      <div className="history-items-container">
        {serviceHistory.map((test) => (
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
          <h2>My Medical History</h2>
          <p className="history-description">
            View and track your complete medical history including doctor
            visits, test results, medications, and vital signs.
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

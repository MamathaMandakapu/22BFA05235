import React, { useState } from 'react';
import './Dashboard.css';

// Mock data
const mockData = {
  overviewStats: {
    totalUrls: 1247,
    totalClicks: 89432,
    avgCtr: 3.4,
    activeUrls: 1089,
  },
  
  urlStatsList: [
    {
      id: "1",
      shortUrl: "lnk.sh/abc123",
      originalUrl: "https://example.com/very-long-url-that-needs-shortening",
      clicks: 2847,
      status: "active",
      createdAt: new Date("2024-01-15"),
      expiresAt: new Date("2025-01-15"),
    },
    {
      id: "2",
      shortUrl: "lnk.sh/def456",
      originalUrl: "https://github.com/user/repository",
      clicks: 1523,
      status: "expired",
      createdAt: new Date("2024-01-12"),
      expiresAt: new Date("2024-02-12"),
    },
    {
      id: "3",
      shortUrl: "lnk.sh/ghi789",
      originalUrl: "https://docs.google.com/document/d/abc123",
      clicks: 892,
      status: "active",
      createdAt: new Date("2024-01-10"),
      expiresAt: new Date("2024-03-10"),
    },
     {
      id: "4",
      shortUrl: "lnk.sh/jkl012",
      originalUrl: "https://youtube.com/watch?v=abc123",
      clicks: 5234,
      status: "active",
      createdAt: new Date("2024-01-08"),
      expiresAt: null,
    },
    {
      id: "5",
      shortUrl: "lnk.sh/mno345",
      originalUrl: "https://amazon.com/product/dp/B08N5WRWNW",
      clicks: 743,
      status: "disabled",
      createdAt: new Date("2024-01-05"),
      expiresAt: new Date("2024-07-05"),
    },
   
  ],
  
  referrerData: [
    {
      name: "Google Search",
      domain: "google.com",
      clicks: 24891,
      percentage: 34.2,
      icon: "🔍",
    },
    {
      name: "Twitter",
      domain: "twitter.com",
      clicks: 18243,
      percentage: 25.1,
      icon: "🐦",
    },
    {
      name: "Facebook",
      domain: "facebook.com",
      clicks: 12567,
      percentage: 17.3,
      icon: "👤",
    },
    {
      name: "Direct",
      domain: "Direct traffic",
      clicks: 9431,
      percentage: 13.0,
      icon: "🌐",
    },
  ],
  
  geographicData: [
    {
      country: "United States",
      countryCode: "🇺🇸",
      percentage: 45,
      clicks: 40244,
    },
    {
      country: "United Kingdom",
      countryCode: "🇬🇧",
      percentage: 18,
      clicks: 16098,
    },
    {
      country: "Canada",
      countryCode: "🇨🇦",
      percentage: 12,
      clicks: 10732,
    },
    {
      country: "Germany",
      countryCode: "🇩🇪",
      percentage: 8,
      clicks: 7155,
    },
    {
      country: "Australia",
      countryCode: "🇦🇺",
      percentage: 6,
      clicks: 5366,
    },
  ],
  
  cityData: [
    {
      city: "New York",
      clicks: 8234,
      color: "#3b82f6",
    },
    {
      city: "London",
      clicks: 5892,
      color: "#10b981",
    },
    {
      city: "Toronto",
      clicks: 3567,
      color: "#f59e0b",
    },
    {
      city: "Berlin",
      clicks: 2134,
      color: "#8b5cf6",
    },
    {
      city: "Sydney",
      clicks: 1891,
      color: "#ec4899",
    },
  ],
};

// Header Component
const Header = () => (
  <header className="header">
    <div className="header-container">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo">
            <span className="logo-icon">🔗</span>
          </div>
          <h1 className="logo-text">LinkStats</h1>
        </div>
        
        <div className="header-actions">
          <button className="notification-btn">
            <span className="bell-icon">🔔</span>
            <span className="notification-dot"></span>
          </button>
          <div className="user-section">
            <div className="avatar">MM</div>
            <span className="user-name">22BFA05235</span>
          </div>
        </div>
      </div>
    </div>
  </header>
);

// Overview Stats Component
const OverviewStats = ({ stats }) => {
  const statCards = [
    {
      title: "Total URLs",
      value: stats.totalUrls.toLocaleString(),
      icon: "🔗",
      change: "+12.5%",
      changeType: "positive",
    },
    {
      title: "Total Clicks",
      value: stats.totalClicks.toLocaleString(),
      icon: "👆",
      change: "+8.2%",
      changeType: "positive",
    },
    {
      title: "Avg. CTR",
      value: `${stats.avgCtr}%`,
      icon: "📈",
      change: "-2.1%",
      changeType: "negative",
    },
    {
      title: "Active URLs",
      value: stats.activeUrls.toLocaleString(),
      icon: "✅",
      change: "+5.7%",
      changeType: "positive",
    },
  ];

  return (
    <div className="overview-section">
      <h2 className="section-title">Dashboard Overview</h2>
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <p className="stat-label">{stat.title}</p>
                <p className="stat-value">{stat.value}</p>
              </div>
              <div className="stat-icon">
                {stat.icon}
              </div>
            </div>
            <div className="stat-change">
              <span className={`change-value ${stat.changeType}`}>
                {stat.change}
              </span>
              <span className="change-label">from last month</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// URLs Table Component
const UrlsTable = ({ urls }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredUrls = urls.filter((url) => {
    const matchesSearch = url.shortUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || url.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedUrls = [...filteredUrls].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === "createdAt" || sortField === "expiresAt") {
      aValue = aValue ? new Date(aValue).getTime() : 0;
      bValue = bValue ? new Date(bValue).getTime() : 0;
    }

    if (aValue !== null && bValue !== null) {
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedUrls.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUrls = sortedUrls.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const copyToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      alert("URL copied to clipboard!");
    } catch (err) {
      alert("Failed to copy URL");
    }
  };

  const getStatusBadge = (status) => (
    <span className={`status-badge status-${status}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );

  const formatDate = (date) => {
    if (!date) return "Never";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const truncateUrl = (url, maxLength = 40) => {
    return url.length > maxLength ? `${url.substring(0, maxLength)}...` : url;
  };

  return (
    <div className="urls-table-section">
      <div className="table-header">
        <h3 className="table-title">URL Statistics</h3>
        
        <div className="table-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search URLs..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="urls-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("shortUrl")}>
                Short URL ↕️
              </th>
              <th onClick={() => handleSort("originalUrl")}>
                Original URL ↕️
              </th>
              <th onClick={() => handleSort("clicks")}>
                Clicks ↕️
              </th>
              <th onClick={() => handleSort("createdAt")}>
                Created ↕️
              </th>
              <th onClick={() => handleSort("expiresAt")}>
                Expires ↕️
              </th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUrls.map((url) => (
              <tr key={url.id}>
                <td>
                  <div className="url-cell">
                    <span className="short-url">{url.shortUrl}</span>
                    <button
                      className="copy-btn"
                      onClick={() => copyToClipboard(url.shortUrl)}
                      title="Copy URL"
                    >
                      📋
                    </button>
                  </div>
                </td>
                <td>
                  <div className="original-url" title={url.originalUrl}>
                    {truncateUrl(url.originalUrl)}
                  </div>
                </td>
                <td>
                  <div className="clicks-cell">
                    <span className="clicks-count">
                      {url.clicks.toLocaleString()}
                    </span>
                    <button className="chart-btn" title="View analytics">
                      📊
                    </button>
                  </div>
                </td>
                <td className="date-cell">
                  {formatDate(url.createdAt)}
                </td>
                <td className="date-cell">
                  {formatDate(url.expiresAt)}
                </td>
                <td>
                  {getStatusBadge(url.status)}
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn edit-btn" title="Edit">
                      ✏️
                    </button>
                    <button className="action-btn delete-btn" title="Delete">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div className="results-info">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedUrls.length)} of {sortedUrls.length} results
        </div>
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            );
          })}
          
          <button
            className="page-btn"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

// Analytics Charts Component
const AnalyticsCharts = ({ referrerData }) => (
  <div className="analytics-section">
    <div className="charts-grid">
      <div className="chart-card">
        <h3 className="chart-title">Click Trends (Last 30 Days)</h3>
        <div className="chart-placeholder">
          <div className="trend-line">📈 Click trends visualization would go here</div>
          <p>Daily clicks: 1200 → 1900 → 3000 → 2500 → 2800 → 3200 → 3500</p>
        </div>
      </div>

      <div className="chart-card">
        <h3 className="chart-title">Top Referrers</h3>
        <div className="referrer-list">
          {referrerData.map((referrer, index) => (
            <div key={index} className="referrer-item">
              <div className="referrer-info">
                <div className="referrer-icon">{referrer.icon}</div>
                <div>
                  <p className="referrer-name">{referrer.name}</p>
                  <p className="referrer-domain">{referrer.domain}</p>
                </div>
              </div>
              <div className="referrer-stats">
                <p className="referrer-clicks">{referrer.clicks.toLocaleString()}</p>
                <p className="referrer-percentage">{referrer.percentage}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Geographic Insights Component
const GeographicInsights = ({ geographicData, cityData }) => (
  <div className="geographic-section">
    <div className="geographic-card">
      <h3 className="card-title">Geographic Insights</h3>
      <div className="geographic-grid">
        <div className="countries-section">
          <h4 className="subsection-title">Top Countries</h4>
          <div className="countries-list">
            {geographicData.map((country, index) => (
              <div key={country.country} className="country-item">
                <div className="country-info">
                  <span className="country-flag">{country.countryCode}</span>
                  <span className="country-name">{country.country}</span>
                </div>
                <div className="country-stats">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${country.percentage}%` }}
                    />
                  </div>
                  <span className="country-percentage">{country.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cities-section">
          <h4 className="subsection-title">Top Cities</h4>
          <div className="cities-list">
            {cityData.map((city, index) => (
              <div key={city.city} className="city-item">
                <div className="city-info">
                  <div 
                    className="city-dot"
                    style={{ backgroundColor: city.color }}
                  />
                  <span className="city-name">{city.city}</span>
                </div>
                <span className="city-clicks">{city.clicks.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Main Dashboard Component
const Dashboard = () => {
  return (
    <div className="dashboard">
      <Header />
      
      <div className="dashboard-content">
        <OverviewStats stats={mockData.overviewStats} />
        
        <AnalyticsCharts referrerData={mockData.referrerData} />
        
        <UrlsTable urls={mockData.urlStatsList} />
        
        <GeographicInsights 
          geographicData={mockData.geographicData} 
          cityData={mockData.cityData} 
        />
      </div>
    </div>
  );
};

export default Dashboard;
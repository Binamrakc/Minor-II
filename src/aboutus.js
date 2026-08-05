import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_BASE_URL = "http://localhost:8080";

const AboutPage = () => {
  const [stats, setStats] = useState({
    properties: '1.2K',
    tenants: '100K',
    experience: '3.5',
    reviews: '830+'
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/dashboard`);
        if (response.ok) {
          const data = await response.json();
          setStats({
            properties: data.totalProperties || '1.2K',
            tenants: data.totalUsers || '100K',
            experience: '3.5',
            reviews: '830+'
          });
        }
      } catch (err) {
        console.log("Using default stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="gb-about-layout py-5 min-vh-100 d-flex align-items-center">
      <style>{`
        .gb-about-layout {
          background-color: #f6f8fb;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #1e293b;
        }

        .gb-card-left {
          background: #ffffff;
          border-radius: 28px;
          padding: 3rem;
          height: 100%;
          box-shadow: 0 4px 25px rgba(0, 0, 0, 0.03);
          border: 1px solid #f1f5f9;
        }

        .gb-subtitle {
          color: #d97706; /* Accent color matching image */
          font-weight: 700;
          font-size: 0.95rem;
          text-transform: capitalize;
          letter-spacing: 0.2px;
        }

        .gb-title {
          font-weight: 800;
          font-size: 3rem;
          line-height: 1.15;
          color: #0f172a;
          letter-spacing: -0.02em;
        }

        .gb-description {
          color: #64748b;
          font-size: 0.95rem;
          line-height: 1.7;
        }

        .gb-image-wrapper {
          border-radius: 28px;
          overflow: hidden;
          height: 320px;
          background-color: #dbeafe;
        }

        .gb-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .gb-stat-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 1.75rem 1.5rem;
          border: 1px solid #f1f5f9;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          transition: transform 0.2s ease;
        }

        .gb-stat-card:hover {
          transform: translateY(-3deg);
        }

        .gb-stat-number {
          font-size: 2.25rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1;
        }

        .gb-stat-label {
          color: #64748b;
          font-size: 0.875rem;
          font-weight: 500;
        }
      `}</style>

      <div className="container" style={{ maxWidth: "1140px" }}>
        <div className="row g-4 align-items-stretch">
          
          {/* Left Hero Card Block */}
          <div className="col-lg-6">
            <div className="gb-card-left d-flex flex-column justify-content-between">
              <div>
                <span className="gb-subtitle mb-3 d-block">How It Started</span>
                <h1 className="gb-title mb-4">
                  Our Dream is <br />
                  Rental Market <br />
                  Transformation
                </h1>
              </div>

              <p className="gb-description mb-0">
                GharBasai was founded with a shared vision to eliminate middleman commission traps and bring total transparency to house and room rentals across Nepal. United by our commitment to trust and accessibility, our platform connects tenants directly with verified landlords—creating a seamless community for stress-free living.
              </p>
            </div>
          </div>

          {/* Right Visual & Metrics Block */}
          <div className="col-lg-6 d-flex flex-column justify-content-between gap-4">
            
            {/* Top Featured Image Banner */}
            <div className="gb-image-wrapper shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop" 
                alt="GharBasai Rental Journey" 
              />
            </div>

            {/* Bottom 2x2 Stats Grid */}
            <div className="row g-3">
              <div className="col-6">
                <div className="gb-stat-card">
                  <div className="gb-stat-number mb-2">{stats.experience}</div>
                  <div className="gb-stat-label">Years Experience</div>
                </div>
              </div>

              <div className="col-6">
                <div className="gb-stat-card">
                  <div className="gb-stat-number mb-2">{stats.properties}</div>
                  <div className="gb-stat-label">Properties Listed</div>
                </div>
              </div>

              <div className="col-6">
                <div className="gb-stat-card">
                  <div className="gb-stat-number mb-2">{stats.reviews}</div>
                  <div className="gb-stat-label">Positive Reviews</div>
                </div>
              </div>

              <div className="col-6">
                <div className="gb-stat-card">
                  <div className="gb-stat-number mb-2">{stats.tenants}</div>
                  <div className="gb-stat-label">Trusted Tenants</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutPage;
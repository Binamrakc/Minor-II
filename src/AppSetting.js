import React, { useState } from 'react';

// GharBasai — "Ghar" (home) + "Basai" (to settle/dwell)
// Simple account settings page: profile, rental preferences, notifications, security.
// Requires Bootstrap CSS + Bootstrap Icons to be loaded in your project, e.g. in index.html:
// <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
// <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">

const GharBasaiSettings = () => {
  const [notifyNewListings, setNotifyNewListings] = useState(true);
  const [notifyMessages, setNotifyMessages] = useState(true);
  const [notifyPriceDrops, setNotifyPriceDrops] = useState(false);

  return (
    <div className="gb-page">
      <style>{`
        .gb-page {
          --gb-primary: #2F5233;
          --gb-primary-dark: #223D26;
          --gb-accent: #D8A448;
          --gb-bg: #F7F5F0;
          --gb-surface: #FFFFFF;
          --gb-text: #2B2B28;
          --gb-muted: #7A7A72;
          --gb-border: #E7E3D8;
          background: var(--gb-bg);
          min-height: 100vh;
          color: var(--gb-text);
          font-family: 'Segoe UI', Inter, sans-serif;
        }
        .gb-heading {
          font-family: Georgia, 'Times New Roman', serif;
        }
        .gb-roofline {
          height: 4px;
          width: 48px;
          background: var(--gb-accent);
          border-radius: 2px;
        }
        .gb-card {
          background: var(--gb-surface);
          border: 1px solid var(--gb-border);
          border-radius: 14px;
        }
        .gb-icon-badge {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(47, 82, 51, 0.08);
          color: var(--gb-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .form-control:focus, .form-select:focus {
          border-color: var(--gb-primary);
          box-shadow: 0 0 0 0.2rem rgba(47, 82, 51, 0.15);
        }
        .form-check-input:checked {
          background-color: var(--gb-primary);
          border-color: var(--gb-primary);
        }
        .btn-gb-primary {
          background: var(--gb-primary);
          border-color: var(--gb-primary);
          color: #fff;
        }
        .btn-gb-primary:hover {
          background: var(--gb-primary-dark);
          border-color: var(--gb-primary-dark);
          color: #fff;
        }
        .btn-gb-outline {
          border-color: var(--gb-border);
          color: var(--gb-text);
        }
        .gb-muted { color: var(--gb-muted); }
      `}</style>

      <div className="container py-5" style={{ maxWidth: '760px' }}>
        {/* Brand + page title */}
        <div className="d-flex align-items-center gap-2 mb-1">
          <i className="bi bi-house-door-fill" style={{ color: 'var(--gb-primary)', fontSize: '20px' }}></i>
          <span className="fw-bold gb-heading" style={{ letterSpacing: '0.5px' }}>GharBasai</span>
        </div>
        <div className="gb-roofline mb-3"></div>
        <h3 className="fw-bold gb-heading mb-1">Account settings</h3>
        <p className="gb-muted mb-4">Manage your profile, rental preferences, and notifications.</p>

        {/* Profile */}
        <div className="gb-card p-4 mb-4">
          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="gb-icon-badge">
              <i className="bi bi-person"></i>
            </div>
            <div>
              <h6 className="fw-bold mb-0">Profile</h6>
              <small className="gb-muted">Your personal details</small>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Full name</label>
              <input type="text" className="form-control" defaultValue="Sunita Shrestha" />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Phone number</label>
              <input type="text" className="form-control" defaultValue="+977 98XXXXXXXX" />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Email address</label>
              <input type="email" className="form-control" defaultValue="sunita@example.com" />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">City</label>
              <input type="text" className="form-control" defaultValue="Kathmandu" />
            </div>
          </div>
        </div>

        {/* Rental preferences */}
        <div className="gb-card p-4 mb-4">
          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="gb-icon-badge">
              <i className="bi bi-key"></i>
            </div>
            <div>
              <h6 className="fw-bold mb-0">Rental preferences</h6>
              <small className="gb-muted">What kind of place you're looking for</small>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small fw-semibold">I am a</label>
              <select className="form-select" defaultValue="tenant">
                <option value="tenant">Tenant, looking to rent</option>
                <option value="landlord">Landlord, listing a property</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Preferred property type</label>
              <select className="form-select" defaultValue="apartment">
                <option value="apartment">Apartment / Flat</option>
                <option value="room">Single room</option>
                <option value="house">Full house</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Preferred area</label>
              <input type="text" className="form-control" placeholder="e.g. Baneshwor, Lalitpur" />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Monthly budget (NPR)</label>
              <input type="text" className="form-control" placeholder="e.g. 15,000 - 25,000" />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="gb-card p-4 mb-4">
          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="gb-icon-badge">
              <i className="bi bi-bell"></i>
            </div>
            <div>
              <h6 className="fw-bold mb-0">Notifications</h6>
              <small className="gb-muted">Choose what you hear about</small>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
            <div>
              <div className="fw-semibold" style={{ fontSize: '14px' }}>New listings matching my search</div>
              <small className="gb-muted">Get notified when a new place fits your preferences</small>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                checked={notifyNewListings}
                onChange={() => setNotifyNewListings(!notifyNewListings)}
                style={{ width: '2.2em', height: '1.2em' }}
              />
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
            <div>
              <div className="fw-semibold" style={{ fontSize: '14px' }}>Messages from landlords/tenants</div>
              <small className="gb-muted">Get notified about new chat messages</small>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                checked={notifyMessages}
                onChange={() => setNotifyMessages(!notifyMessages)}
                style={{ width: '2.2em', height: '1.2em' }}
              />
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center py-2">
            <div>
              <div className="fw-semibold" style={{ fontSize: '14px' }}>Price drops on saved listings</div>
              <small className="gb-muted">Get notified when rent is reduced</small>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                checked={notifyPriceDrops}
                onChange={() => setNotifyPriceDrops(!notifyPriceDrops)}
                style={{ width: '2.2em', height: '1.2em' }}
              />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="gb-card p-4 mb-4">
          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="gb-icon-badge">
              <i className="bi bi-shield-lock"></i>
            </div>
            <div>
              <h6 className="fw-bold mb-0">Security</h6>
              <small className="gb-muted">Password and account access</small>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
            <div>
              <div className="fw-semibold" style={{ fontSize: '14px' }}>Password</div>
              <small className="gb-muted">Last changed 3 months ago</small>
            </div>
            <button className="btn btn-gb-outline btn-sm">Change password</button>
          </div>

          <div className="d-flex justify-content-between align-items-center py-2">
            <div>
              <div className="fw-semibold text-danger" style={{ fontSize: '14px' }}>Delete account</div>
              <small className="gb-muted">This will permanently remove your GharBasai account</small>
            </div>
            <button className="btn btn-outline-danger btn-sm">Delete</button>
          </div>
        </div>

        {/* Save bar */}
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-gb-outline">Cancel</button>
          <button className="btn btn-gb-primary px-4">Save changes</button>
        </div>
      </div>
    </div>
  );
};

export default GharBasaiSettings;
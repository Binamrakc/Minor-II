import React, { useState, useEffect } from 'react';

// Set Go Backend Base URL
const API_BASE_URL = 'http://localhost:8080';

const GharBasaiSettings = () => {
  // --- Form & Data States ---
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    age: 0
  });

  const [preferences, setPreferences] = useState({
    role: 'tenant',
    propertyType: 'apartment',
    preferredArea: '',
    budget: ''
  });

  const [notifications, setNotifications] = useState({
    notifyNewListings: true,
    notifyMessages: true,
    notifyPriceDrops: false
  });

  // Password Modal State
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // UI Feedback States
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Helper for displaying temporary status toasts/alerts
  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: '', message: '' }), 4000);
  };

  // Helper to get JWT token from LocalStorage
  const getAuthToken = () => localStorage.getItem('token') || '';

  // --- 1. Fetch Profile Data on Mount ---
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      // Added API_BASE_URL
      const response = await fetch(`${API_BASE_URL}/user/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          showAlert('danger', 'Session expired. Please log in again.');
          return;
        }
        throw new Error('Failed to fetch profile details.');
      }

      const data = await response.json();
      setProfile({
        name: data.name || '',
        phone: data.phone || '',
        email: data.email || '',
        city: data.city || '',
        address: data.address || '',
        age: data.age || 0
      });
    } catch (err) {
      showAlert('danger', err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- 2. Save Updated Profile ---
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Added API_BASE_URL
      const response = await fetch(`${API_BASE_URL}/user/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({
          name: profile.name,
          address: profile.address,
          phone: profile.phone,
          age: Number(profile.age),
          city: profile.city
        })
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Failed to update profile.');
      }

      showAlert('success', 'Your profile details have been saved successfully!');
    } catch (err) {
      showAlert('danger', err.message);
    } finally {
      setSaving(false);
    }
  };

  // --- 3. Change Password ---
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      showAlert('warning', 'New password and confirm password do not match!');
      return;
    }

    try {
      // Added API_BASE_URL
      const response = await fetch(`${API_BASE_URL}/user/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({
          old_password: passwords.oldPassword,
          new_password: passwords.newPassword
        })
      });

      const resData = await response.json();
      if (!response.ok) throw new Error(resData.message || 'Failed to change password.');

      showAlert('success', 'Password updated successfully!');
      setShowPasswordModal(false);
      setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      showAlert('danger', err.message);
    }
  };

  // --- 4. Delete Account ---
  const handleDeleteAccount = async () => {
    try {
      // Added API_BASE_URL
      const response = await fetch(`${API_BASE_URL}/user/me`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });

      const resData = await response.json();
      if (!response.ok) throw new Error(resData.message || 'Failed to delete account.');

      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (err) {
      showAlert('danger', err.message);
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return (
      <div className="gb-page d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading profile...</span>
        </div>
      </div>
    );
  }

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
        .gb-heading { font-family: Georgia, 'Times New Roman', serif; }
        .gb-roofline { height: 4px; width: 48px; background: var(--gb-accent); border-radius: 2px; }
        .gb-card { background: var(--gb-surface); border: 1px solid var(--gb-border); border-radius: 14px; }
        .gb-icon-badge {
          width: 40px; height: 40px; border-radius: 10px;
          background: rgba(47, 82, 51, 0.08); color: var(--gb-primary);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .form-control:focus, .form-select:focus {
          border-color: var(--gb-primary); box-shadow: 0 0 0 0.2rem rgba(47, 82, 51, 0.15);
        }
        .form-check-input:checked { background-color: var(--gb-primary); border-color: var(--gb-primary); }
        .btn-gb-primary { background: var(--gb-primary); border-color: var(--gb-primary); color: #fff; }
        .btn-gb-primary:hover { background: var(--gb-primary-dark); border-color: var(--gb-primary-dark); color: #fff; }
        .btn-gb-outline { border-color: var(--gb-border); color: var(--gb-text); }
        .gb-muted { color: var(--gb-muted); }
        .modal-backdrop.show { opacity: 0.5; }
      `}</style>

      <div className="container py-5" style={{ maxWidth: '760px' }}>
        {/* Toast Alert */}
        {alert.show && (
          <div className={`alert alert-${alert.type} alert-dismissible fade show mb-4`} role="alert">
            {alert.message}
            <button type="button" className="btn-close" onClick={() => setAlert({ show: false })}></button>
          </div>
        )}

        {/* Brand Header */}
        <div className="d-flex align-items-center gap-2 mb-1">
          <i className="bi bi-house-door-fill" style={{ color: 'var(--gb-primary)', fontSize: '20px' }}></i>
          <span className="fw-bold gb-heading" style={{ letterSpacing: '0.5px' }}>GharBasai</span>
        </div>
        <div className="gb-roofline mb-3"></div>
        <h3 className="fw-bold gb-heading mb-1">Account settings</h3>
        <p className="gb-muted mb-4">Manage your profile, rental preferences, and notifications.</p>

        <form onSubmit={handleSaveChanges}>
          {/* Profile Section */}
          <div className="gb-card p-4 mb-4">
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="gb-icon-badge"><i className="bi bi-person"></i></div>
              <div>
                <h6 className="fw-bold mb-0">Profile</h6>
                <small className="gb-muted">Your personal details</small>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small fw-semibold">Full name</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-semibold">Phone number</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-semibold">Email address</label>
                <input
                  type="email"
                  className="form-control bg-light"
                  value={profile.email}
                  disabled
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-semibold">City</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.city}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                />
              </div>
              <div className="col-md-8">
                <label className="form-label small fw-semibold">Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-semibold">Age</label>
                <input
                  type="number"
                  className="form-control"
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Rental Preferences */}
          <div className="gb-card p-4 mb-4">
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="gb-icon-badge"><i className="bi bi-key"></i></div>
              <div>
                <h6 className="fw-bold mb-0">Rental preferences</h6>
                <small className="gb-muted">What kind of place you're looking for</small>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small fw-semibold">I am a</label>
                <select
                  className="form-select"
                  value={preferences.role}
                  onChange={(e) => setPreferences({ ...preferences, role: e.target.value })}
                >
                  <option value="tenant">Tenant, looking to rent</option>
                  <option value="landlord">Landlord, listing a property</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-semibold">Preferred property type</label>
                <select
                  className="form-select"
                  value={preferences.propertyType}
                  onChange={(e) => setPreferences({ ...preferences, propertyType: e.target.value })}
                >
                  <option value="apartment">Apartment / Flat</option>
                  <option value="room">Single room</option>
                  <option value="house">Full house</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-semibold">Preferred area</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Baneshwor, Lalitpur"
                  value={preferences.preferredArea}
                  onChange={(e) => setPreferences({ ...preferences, preferredArea: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-semibold">Monthly budget (NPR)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. 15,000 - 25,000"
                  value={preferences.budget}
                  onChange={(e) => setPreferences({ ...preferences, budget: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="gb-card p-4 mb-4">
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="gb-icon-badge"><i className="bi bi-bell"></i></div>
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
                  checked={notifications.notifyNewListings}
                  onChange={() => setNotifications({ ...notifications, notifyNewListings: !notifications.notifyNewListings })}
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
                  checked={notifications.notifyMessages}
                  onChange={() => setNotifications({ ...notifications, notifyMessages: !notifications.notifyMessages })}
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
                  checked={notifications.notifyPriceDrops}
                  onChange={() => setNotifications({ ...notifications, notifyPriceDrops: !notifications.notifyPriceDrops })}
                  style={{ width: '2.2em', height: '1.2em' }}
                />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="gb-card p-4 mb-4">
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="gb-icon-badge"><i className="bi bi-shield-lock"></i></div>
              <div>
                <h6 className="fw-bold mb-0">Security</h6>
                <small className="gb-muted">Password and account access</small>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
              <div>
                <div className="fw-semibold" style={{ fontSize: '14px' }}>Password</div>
                <small className="gb-muted">Manage your password settings</small>
              </div>
              <button
                type="button"
                className="btn btn-gb-outline btn-sm"
                onClick={() => setShowPasswordModal(true)}
              >
                Change password
              </button>
            </div>

            <div className="d-flex justify-content-between align-items-center py-2">
              <div>
                <div className="fw-semibold text-danger" style={{ fontSize: '14px' }}>Delete account</div>
                <small className="gb-muted">This will permanently remove your GharBasai account</small>
              </div>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete
              </button>
            </div>
          </div>

          {/* Action Bar */}
          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-gb-outline" onClick={fetchProfile}>
              Cancel
            </button>
            <button type="submit" className="btn btn-gb-primary px-4" disabled={saving}>
              {saving ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Change Password</h5>
                <button type="button" className="btn-close" onClick={() => setShowPasswordModal(false)}></button>
              </div>
              <form onSubmit={handleChangePassword}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Current Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwords.oldPassword}
                      onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwords.newPassword}
                      onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Confirm New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwords.confirmPassword}
                      onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-gb-outline" onClick={() => setShowPasswordModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-gb-primary">Update Password</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold text-danger">Delete Account</h5>
                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                <p className="mb-0">Are you sure you want to delete your GharBasai account? This action cannot be undone and will remove all your data.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-gb-outline" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDeleteAccount}>
                  Permanently Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GharBasaiSettings;
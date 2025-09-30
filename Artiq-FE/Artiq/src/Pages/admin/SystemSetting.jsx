import React, { useState, useEffect } from 'react';
import { FaCog } from 'react-icons/fa';
import api from '../../api';
// import"../../Styles/SystemSetting.css"

const SystemSettings = () => {
  const [siteTitle, setSiteTitle] = useState('');
  const [siteDescription, setSiteDescription] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [logo, setLogo] = useState(null);

  // ---------------- Fetch current settings ----------------
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/admin/settings", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSiteTitle(res.data.siteTitle);
        setSiteDescription(res.data.siteDescription);
        setAdminEmail(res.data.adminEmail);
        setLogo(res.data.logo);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSettings();
  }, []);

  // ---------------- Save settings ----------------
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const payload = { siteTitle, siteDescription, adminEmail, logo };

      const res = await api.put("/admin/settings", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Settings saved successfully!");
      setLogo(res.data.logo);
    } catch (err) {
      console.error(err);
      alert("Failed to save settings.");
    }
  };

  return (
    <div className="admin-page container py-5">
      <h4 className="mb-4"><FaCog className="me-2" />Admin System Settings</h4>

      <div className="card p-4 shadow-sm">
        <div className="mb-3">
          <label>Site Title</label>
          <input type="text" className="form-control" value={siteTitle} onChange={e => setSiteTitle(e.target.value)} />
        </div>

        <div className="mb-3">
          <label>Site Description</label>
          <textarea className="form-control" rows="4" value={siteDescription} onChange={e => setSiteDescription(e.target.value)} />
        </div>

        <div className="mb-3">
          <label>Admin Email</label>
          <input type="email" className="form-control" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} />
        </div>

        <div className="mb-3">
          <label>Logo URL</label>
          <input type="text" className="form-control" value={logo || ''} onChange={e => setLogo(e.target.value)} />
        </div>

        <button className="btn btn-primary" onClick={handleSave}>Save Settings</button>
      </div>
    </div>
  );
};

export default SystemSettings;

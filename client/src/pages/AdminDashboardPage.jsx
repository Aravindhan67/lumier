import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  RefreshCw, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';
import SpotlightCard from '../components/common/SpotlightCard.jsx';

export default function AdminDashboardPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');
  const [updatingId, setUpdatingId] = useState(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      if (data.success) {
        setInquiries(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/inquiries/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setInquiries(prev => prev.map(item => item._id === id ? { ...item, status: newStatus } : item));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = inquiries.filter(item => {
    if (filterStatus === 'All') return true;
    return item.status === filterStatus;
  });

  // Analytics stats
  const totalInquiries = inquiries.length;
  const newCount = inquiries.filter(i => i.status === 'New').length;
  const vipCount = inquiries.filter(i => i.priority === 'VIP Tier' || i.estimatedBudget?.includes('Crore')).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-paper-300 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-900 text-xs font-semibold uppercase tracking-widest mb-2 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
            <span>MERN Executive Concierge Portal (India)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-ink-950">
            Client Inquiries & Royal Pipeline Governance
          </h1>
          <p className="text-xs text-ink-500 mt-1">
            Real-time MongoDB Atlas inquiry management, status tracking, and VIP high-budget classification (INR).
          </p>
        </div>

        <button
          onClick={fetchInquiries}
          disabled={loading}
          className="btn-gold px-4 py-2.5 rounded-xl text-xs uppercase font-bold tracking-wider flex items-center gap-2 self-start md:self-auto shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Sync Database</span>
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <SpotlightCard className="p-6 bg-white border border-paper-300 shadow-lux-sm">
          <span className="text-[10px] uppercase tracking-wider text-ink-500 block font-semibold">Total Dossiers</span>
          <div className="font-serif text-3xl font-extrabold gold-text-gradient mt-1">
            {totalInquiries} Inquiries
          </div>
          <p className="text-[11px] text-ink-400 mt-1">Active client dossiers in database</p>
        </SpotlightCard>

        <SpotlightCard className="p-6 bg-white border border-paper-300 shadow-lux-sm">
          <span className="text-[10px] uppercase tracking-wider text-ink-500 block font-semibold">Requires Producer Review</span>
          <div className="font-serif text-3xl font-extrabold text-amber-700 mt-1">
            {newCount} New
          </div>
          <p className="text-[11px] text-ink-400 mt-1">Awaiting 12-hour concierge response</p>
        </SpotlightCard>

        <SpotlightCard className="p-6 bg-white border border-gold-300 shadow-lux-sm">
          <span className="text-[10px] uppercase tracking-wider text-gold-800 font-bold block">VIP High-Priority Tier</span>
          <div className="font-serif text-3xl font-extrabold text-gold-700 mt-1">
            {vipCount} Royal Tier
          </div>
          <p className="text-[11px] text-ink-400 mt-1">₹1 Crore+ celebration allocation dossiers</p>
        </SpotlightCard>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {['All', 'New', 'Under Review', 'Proposal Drafted', 'Confirmed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterStatus === status
                ? 'bg-gold-500 text-ink-950 font-bold shadow-sm'
                : 'bg-white text-ink-600 hover:text-ink-900 border border-paper-300'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Inquiries Table / Cards */}
      {loading ? (
        <div className="text-center py-20 text-ink-400 text-xs">
          Syncing with LUMIÈRE India Database...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-paper-300 shadow-lux-sm space-y-2">
          <p className="text-ink-500 text-xs">No dossiers found matching status "{filterStatus}".</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((inq) => (
            <SpotlightCard key={inq._id} className="p-6 bg-white border border-paper-300 rounded-3xl shadow-lux">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                {/* Left Profile */}
                <div className="space-y-2 max-w-xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-serif text-lg font-bold text-ink-950">
                      {inq.fullName}
                    </span>
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full border ${
                      inq.priority === 'VIP Tier'
                        ? 'bg-gold-100 text-gold-900 border-gold-300'
                        : 'bg-paper-100 text-ink-600 border-paper-200'
                    }`}>
                      {inq.priority || 'Standard'}
                    </span>
                    <span className="text-[10px] font-mono text-ink-400">
                      ID: {inq._id}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-ink-700 pt-1">
                    <div>
                      <span className="text-[10px] text-ink-400 block font-medium">Classification:</span>
                      <span className="font-semibold text-gold-800">{inq.eventType}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-ink-400 block font-medium">Attendance:</span>
                      <span>{inq.guestCount} Guests</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-ink-400 block font-medium">Target Muhurat:</span>
                      <span>{inq.targetDate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-ink-400 block font-medium">Target Budget:</span>
                      <span className="font-semibold text-emerald-700">{inq.estimatedBudget}</span>
                    </div>
                  </div>

                  {inq.visionDetails && (
                    <p className="text-xs text-ink-600 italic bg-paper-50 p-3.5 rounded-2xl border border-paper-200 mt-2 font-light">
                      "{inq.visionDetails}"
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-ink-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-gold-600" />
                      {inq.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-gold-600" />
                      {inq.phone}
                    </span>
                    {inq.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gold-600" />
                        {inq.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Action & Status Dropdown */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-paper-200">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-ink-400 font-semibold block">Workflow State</span>
                    <select
                      value={inq.status}
                      disabled={updatingId === inq._id}
                      onChange={(e) => handleStatusUpdate(inq._id, e.target.value)}
                      className="bg-paper-50 border border-paper-300 text-gold-900 text-xs font-semibold rounded-xl px-3.5 py-2 focus:outline-none focus:border-gold-500 shadow-sm"
                    >
                      <option value="New">New</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Proposal Drafted">Proposal Drafted</option>
                      <option value="Consultation Booked">Consultation Booked</option>
                      <option value="Confirmed">Confirmed</option>
                    </select>
                  </div>
                </div>

              </div>
            </SpotlightCard>
          ))}
        </div>
      )}

    </div>
  );
}

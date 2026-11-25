import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  RefreshCw, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  Unlock, 
  ExternalLink, 
  LogOut, 
  Sparkles,
  ArrowRight,
  Database,
  Eye,
  EyeOff
} from 'lucide-react';
import SpotlightCard from '../components/common/SpotlightCard.jsx';
import { getApiUrl } from '../config/api.js';

export default function AdminDashboardPage({ onExitAdmin }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('lumier_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [authError, setAuthError] = useState('');

  // Dashboard Data States
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');
  const [updatingId, setUpdatingId] = useState(null);

  // Authenticate Admin Passcode
  const handleLogin = (e) => {
    e.preventDefault();
    // Default master admin passcode
    const validCodes = ['admin123', 'lumiere2025', 'royaladmin'];
    if (validCodes.includes(passcode.trim())) {
      setIsAuthenticated(true);
      sessionStorage.setItem('lumier_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Invalid Executive Access Key. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('lumier_admin_auth');
    setPasscode('');
  };

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch(getApiUrl('/api/inquiries'));
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
    if (isAuthenticated) {
      fetchInquiries();
    }
  }, [isAuthenticated]);

  const handleStatusUpdate = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(getApiUrl(`/api/inquiries/${id}/status`), {
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

  // 1. LOGIN / PASSCODE SCREEN (If not authenticated)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-paper-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
        {/* Background glow accents */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-200/30 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-md w-full bg-white border border-paper-300 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-gold-600 via-gold-500 to-amber-300 flex items-center justify-center text-white shadow-md shadow-gold-600/20 mb-3">
              <Lock className="w-7 h-7" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold-700 font-bold block">
              Private Executive Atelier
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-ink-950">
              LUMIÈRE Portal
            </h1>
            <p className="text-xs text-ink-500 font-light">
              Restricted executive access for inquiries governance and pipeline intelligence.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-ink-700 mb-1.5">
                Executive Security Key
              </label>
              <div className="relative">
                <input
                  type={showPasscode ? "text" : "password"}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (authError) setAuthError('');
                  }}
                  placeholder="Enter passcode (e.g. admin123)"
                  autoFocus
                  required
                  className="w-full bg-paper-50 border border-paper-300 rounded-xl px-4 py-3 text-sm text-ink-900 focus:outline-none focus:border-gold-500 pr-10 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700 p-1"
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {authError && (
                <p className="text-xs text-red-600 mt-1.5 font-medium">{authError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full btn-gold py-3 rounded-xl text-xs uppercase tracking-widest font-bold shadow-lux flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>

          <div className="pt-4 border-t border-paper-200 text-center space-y-3">
            <div className="text-[11px] text-ink-400 bg-paper-50 p-2.5 rounded-xl border border-paper-200">
              Default access key: <strong className="text-gold-900">admin123</strong>
            </div>

            {onExitAdmin && (
              <button
                onClick={onExitAdmin}
                className="text-xs text-ink-500 hover:text-gold-800 transition-colors flex items-center justify-center gap-1.5 mx-auto font-medium"
              >
                <span>Return to Live Public Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED ADMIN DASHBOARD VIEW
  const filtered = inquiries.filter(item => {
    if (filterStatus === 'All') return true;
    return item.status === filterStatus;
  });

  const totalInquiries = inquiries.length;
  const newCount = inquiries.filter(i => i.status === 'New').length;
  const vipCount = inquiries.filter(i => i.priority === 'VIP Tier' || i.estimatedBudget?.includes('Crore')).length;

  return (
    <div className="min-h-screen flex flex-col bg-paper-50">
      
      {/* DEDICATED SEPARATE ADMIN HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-paper-300 shadow-lux-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20 gap-4">
            
            {/* Admin Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold-600 via-gold-500 to-amber-300 flex items-center justify-center text-white font-serif font-black text-xl shadow-md">
                L
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif tracking-widest text-lg font-bold uppercase gold-text-gradient">
                    LUMIÈRE
                  </span>
                  <span className="bg-gold-100 text-gold-900 text-[10px] font-bold px-2 py-0.5 rounded-md border border-gold-300 uppercase tracking-wider">
                    Executive Portal
                  </span>
                </div>
                <span className="text-[10px] tracking-wider text-ink-500 uppercase font-sans block font-semibold">
                  Royal Pipeline & Dossier Governance
                </span>
              </div>
            </div>

            {/* Admin Top Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="hidden md:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <Database className="w-3.5 h-3.5" />
                <span>MongoDB Atlas: Connected</span>
              </div>

              {onExitAdmin && (
                <button
                  onClick={onExitAdmin}
                  className="px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold text-ink-700 bg-white hover:bg-paper-100 border border-paper-300 shadow-sm transition-all flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-gold-700" />
                  <span className="hidden sm:inline">View Public Website</span>
                  <span className="sm:hidden">Website</span>
                </button>
              )}

              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 shadow-sm transition-all flex items-center gap-1.5"
                title="Log Out of Admin"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ADMIN CONTENT CONTAINER */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10 w-full">
        
        {/* Page Title & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-paper-300 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 border border-gold-300 text-gold-900 text-xs font-semibold uppercase tracking-widest mb-2 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
              <span>Dedicated Executive Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-ink-950">
              Client Inquiries & Royal Pipeline Governance
            </h1>
            <p className="text-xs text-ink-500 mt-1">
              Private database management, status classification, and VIP lead assignment (INR).
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <SpotlightCard className="p-6 bg-white border border-paper-300 shadow-lux-sm">
            <span className="text-[10px] uppercase tracking-wider text-ink-500 block font-semibold">Total Dossiers</span>
            <div className="font-serif text-3xl font-extrabold gold-text-gradient mt-1">
              {totalInquiries} Inquiries
            </div>
            <p className="text-[11px] text-ink-400 mt-1">Active client dossiers in database</p>
          </SpotlightCard>

          <SpotlightCard className="p-6 bg-white border border-paper-300 shadow-lux-sm">
            <span className="text-[10px] uppercase tracking-wider text-ink-500 block font-semibold">Requires Review</span>
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

        {/* Inquiries List */}
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

      </main>

    </div>
  );
}

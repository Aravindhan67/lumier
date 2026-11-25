import React, { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar.jsx';
import Footer from './components/common/Footer.jsx';
import BookingModal from './components/modals/BookingModal.jsx';
import CaseStudyModal from './components/modals/CaseStudyModal.jsx';

// Pages
import HomePage from './pages/HomePage.jsx';
import PortfolioPage from './pages/PortfolioPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import PackagesPage from './pages/PackagesPage.jsx';
import VenuesPage from './pages/VenuesPage.jsx';
import CalculatorPage from './pages/CalculatorPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import JournalPage from './pages/JournalPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import { getApiUrl } from './config/api.js';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [inquiryCount, setInquiryCount] = useState(2);

  // Data states loaded from Express API
  const [events, setEvents] = useState([]);
  const [services, setServices] = useState([]);
  const [packages, setPackages] = useState([]);
  const [venues, setVenues] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState([
    { value: '980+', label: 'Royal Celebrations & Conclaves', hint: 'Across Udaipur, Mumbai, Delhi, Goa & Dubai' },
    { value: '99.8%', label: 'Patron Delight Rating', hint: 'Verified Post-Celebration Audits' },
    { value: '45+', label: 'Design & AV Laurels', hint: 'National & Global Event Production Honors' },
    { value: '₹450 Cr+', label: 'Curated Event Budgets', hint: 'Managed With Transparent Governance' }
  ]);

  // Initial fetch from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [evtRes, srvRes, pkgRes, venRes, revRes, postRes, statsRes, inqRes] = await Promise.allSettled([
          fetch(getApiUrl('/api/events')).then(r => r.json()),
          fetch(getApiUrl('/api/services')).then(r => r.json()),
          fetch(getApiUrl('/api/packages')).then(r => r.json()),
          fetch(getApiUrl('/api/venues')).then(r => r.json()),
          fetch(getApiUrl('/api/reviews')).then(r => r.json()),
          fetch(getApiUrl('/api/posts')).then(r => r.json()),
          fetch(getApiUrl('/api/stats')).then(r => r.json()),
          fetch(getApiUrl('/api/inquiries')).then(r => r.json()),
        ]);

        if (evtRes.status === 'fulfilled' && evtRes.value.success) setEvents(evtRes.value.data);
        if (srvRes.status === 'fulfilled' && srvRes.value.success) setServices(srvRes.value.data);
        if (pkgRes.status === 'fulfilled' && pkgRes.value.success) setPackages(pkgRes.value.data);
        if (venRes.status === 'fulfilled' && venRes.value.success) setVenues(venRes.value.data);
        if (revRes.status === 'fulfilled' && revRes.value.success) setReviews(revRes.value.data);
        if (postRes.status === 'fulfilled' && postRes.value.success) setPosts(postRes.value.data);
        if (statsRes.status === 'fulfilled' && statsRes.value.success) setStats(statsRes.value.stats);
        if (inqRes.status === 'fulfilled' && inqRes.value.success) setInquiryCount(inqRes.value.count);
      } catch (err) {
        console.warn('API fetch warning, using seeded defaults:', err);
      }
    };

    fetchData();
  }, []);

  // Handle URL hash navigation (e.g. #admin, #packages, #calculator)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validPages = ['home', 'portfolio', 'services', 'packages', 'venues', 'calculator', 'about', 'journal', 'contact', 'admin'];
      if (hash && validPages.includes(hash)) {
        setActivePage(hash);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const changePage = (pageId) => {
    setActivePage(pageId);
    window.location.hash = pageId;
  };

  const handleBookingSuccess = () => {
    setInquiryCount(prev => prev + 1);
  };

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <HomePage
            events={events}
            services={services}
            reviews={reviews}
            stats={stats}
            setActivePage={setActivePage}
            onSelectEvent={setSelectedEvent}
            onOpenBooking={() => setBookingModalOpen(true)}
          />
        );
      case 'portfolio':
        return (
          <PortfolioPage
            events={events}
            onSelectEvent={setSelectedEvent}
            onOpenBooking={() => setBookingModalOpen(true)}
          />
        );
      case 'services':
        return (
          <ServicesPage
            services={services}
            onOpenBooking={() => setBookingModalOpen(true)}
            setActivePage={setActivePage}
          />
        );
      case 'packages':
        return (
          <PackagesPage
            packages={packages}
            onOpenBooking={() => setBookingModalOpen(true)}
            setActivePage={setActivePage}
          />
        );
      case 'venues':
        return (
          <VenuesPage
            venues={venues}
            onOpenBooking={() => setBookingModalOpen(true)}
          />
        );
      case 'calculator':
        return (
          <CalculatorPage
            onOpenBooking={() => setBookingModalOpen(true)}
          />
        );
      case 'about':
        return (
          <AboutPage
            stats={stats}
            onOpenBooking={() => setBookingModalOpen(true)}
          />
        );
      case 'journal':
        return (
          <JournalPage
            posts={posts}
            onOpenBooking={() => setBookingModalOpen(true)}
          />
        );
      case 'contact':
        return (
          <ContactPage
            onOpenBooking={() => setBookingModalOpen(true)}
          />
        );
      case 'admin':
        return <AdminDashboardPage />;
      default:
        return (
          <HomePage
            events={events}
            services={services}
            reviews={reviews}
            stats={stats}
            setActivePage={setActivePage}
            onSelectEvent={setSelectedEvent}
            onOpenBooking={() => setBookingModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper-50 text-ink-900 selection:bg-gold-200 selection:text-gold-900">
      
      {/* Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={changePage}
        onOpenBooking={() => setBookingModalOpen(true)}
        inquiryCount={inquiryCount}
      />

      {/* Main Page Content */}
      <main className="flex-1 pb-28 lg:pb-0">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer setActivePage={changePage} />

      {/* Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        onBookingSuccess={handleBookingSuccess}
      />

      <CaseStudyModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onBookEvent={() => setBookingModalOpen(true)}
      />

    </div>
  );
}

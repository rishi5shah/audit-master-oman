import React, { useState, useEffect } from 'react';
import { 
  MapPin, Camera, CheckCircle, Search, Wifi, WifiOff, ArrowLeft, 
  Save, Package, RefreshCw, Store, BarChart3, CalendarClock,
  FileText, TrendingUp, TrendingDown, Minus, Filter, Calendar,
  DollarSign, ShoppingBag, PieChart
} from 'lucide-react';

// --- CONFIGURATION & MOCK DATA ---

const MOCK_STORES = [
  { id: 101, name: 'Lulu Darseit', lat: 23.6143, lng: 58.5453, address: 'Darsait, Muscat' },
  { id: 102, name: 'Ramez Ghubra', lat: 23.5896, lng: 58.4137, address: 'Al Ghubra, Muscat' },
  { id: 103, name: 'Hypermax Seeb', lat: 23.6703, lng: 58.1894, address: 'Seeb, Muscat' },
];

const INITIAL_PRODUCTS = [
  // --- CANARY ---
  { 
    sku: 'CANARY-02KG', 
    name: 'Canary Rice (2kg)', 
    last_count: 205, // Variance: +5
    last_audit_date: '2023-10-24T10:00:00.000Z',
    last_store_id: 101,
    history: [190, 195, 205, 200, 198, 200], 
    category: 'Grains', 
    img: '🐤' 
  },
  { 
    sku: 'CANARY-05KG', 
    name: 'Canary Rice (5kg)', 
    last_count: 148, // Variance: -2
    last_audit_date: '2023-10-24T11:30:00.000Z',
    last_store_id: 101,
    history: [140, 145, 155, 150, 148, 150], 
    category: 'Grains', 
    img: '🐤' 
  },
  { 
    sku: 'CANARY-10KG', 
    name: 'Canary Rice (10kg)', 
    last_count: 80, 
    last_audit_date: '2023-10-25T09:15:00.000Z',
    last_store_id: 102,
    history: [75, 78, 85, 80, 82, 80],
    category: 'Grains', 
    img: '🐤' 
  },
  { 
    sku: 'CANARY-35KG', 
    name: 'Canary Rice (35kg)', 
    last_count: 28, // Variance: +3
    last_audit_date: '2023-10-25T14:20:00.000Z',
    last_store_id: 103,
    history: [20, 22, 28, 25, 24, 25],
    category: 'Grains', 
    img: '🐤' 
  },

  // --- TAEEBA ---
  { 
    sku: 'TAEEBA-05KG', 
    name: 'Taeeba Rice (5kg)', 
    last_count: 120, 
    last_audit_date: '2023-10-22T16:45:00.000Z',
    last_store_id: 102,
    history: [110, 115, 118, 120, 119, 120], 
    category: 'Grains', 
    img: '🌾' 
  },
  { 
    sku: 'TAEEBA-20KG', 
    name: 'Taeeba Rice (20kg)', 
    last_count: 42, // Variance: -3
    last_audit_date: '2023-10-23T08:30:00.000Z',
    last_store_id: 101,
    history: [40, 42, 48, 45, 44, 45], 
    category: 'Grains', 
    img: '🌾' 
  },
  { 
    sku: 'TAEEBA-35KG', 
    name: 'Taeeba Rice (35kg)', 
    last_count: 15, 
    last_audit_date: '2023-10-26T13:00:00.000Z',
    last_store_id: 103,
    history: [12, 14, 16, 15, 15, 15], 
    category: 'Grains', 
    img: '🌾' 
  },

  // --- AL KHAIR ---
  { 
    sku: 'ALKHAIR-05KG', 
    name: 'Al Khair Rice (5kg)', 
    last_count: 95, // Variance: +5
    last_audit_date: '2023-10-20T11:00:00.000Z',
    last_store_id: 102,
    history: [85, 88, 92, 90, 89, 90], 
    category: 'Grains', 
    img: '🍚' 
  },
  { 
    sku: 'ALKHAIR-20KG', 
    name: 'Al Khair Rice (20kg)', 
    last_count: 35, 
    last_audit_date: '2023-10-21T10:15:00.000Z',
    last_store_id: 101,
    history: [30, 32, 38, 35, 34, 35], 
    category: 'Grains', 
    img: '🍚' 
  },
  { 
    sku: 'ALKHAIR-35KG', 
    name: 'Al Khair Rice (35kg)', 
    last_count: 20, // Variance: +2
    last_audit_date: '2023-10-26T09:45:00.000Z',
    last_store_id: 103,
    history: [15, 16, 20, 18, 18, 18], 
    category: 'Grains', 
    img: '🍚' 
  },

  // --- PARBOILED ---
  { 
    sku: 'PARBOILED-10KG', 
    name: 'Parboiled Rice (10kg)', 
    last_count: 58, // Variance: -2
    last_audit_date: '2023-10-15T13:20:00.000Z',
    last_store_id: 101,
    history: [55, 58, 62, 60, 59, 60], 
    category: 'Grains', 
    img: '🥘' 
  },

  // --- BIN SOLAS ---
  { 
    sku: 'BINSOLAS-05KG', 
    name: 'Bin Solas Rice (5kg)', 
    last_count: 100, 
    last_audit_date: '2023-10-24T15:30:00.000Z',
    last_store_id: 102,
    history: [95, 98, 105, 100, 102, 100], 
    category: 'Grains', 
    img: '🥡' 
  },
  { 
    sku: 'BINSOLAS-20KG', 
    name: 'Bin Solas Rice (20kg)', 
    last_count: 40, 
    last_audit_date: '2023-10-25T12:00:00.000Z',
    last_store_id: 103,
    history: [35, 38, 42, 40, 39, 40], 
    category: 'Grains', 
    img: '🥡' 
  },
  { 
    sku: 'BINSOLAS-35KG', 
    name: 'Bin Solas Rice (35kg)', 
    last_count: 12, 
    last_audit_date: '2023-10-26T16:10:00.000Z',
    last_store_id: 101,
    history: [10, 11, 13, 12, 12, 12], 
    category: 'Grains', 
    img: '🥡' 
  },
];

// --- UTILITIES ---

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; 
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
};

const formatDate = (isoString) => {
  if (!isoString) return 'Never';
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// --- MAIN COMPONENT ---

export default function InventoryAuditApp() {
  // --- STATE ---
  const [view, setView] = useState('SPLASH'); // SPLASH, STORE_SELECT, PRODUCT_LIST, AUDIT_FORM, REPORTS, SUCCESS
  const [location, setLocation] = useState(null);
  const [gpsError, setGpsError] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [nearbyStores, setNearbyStores] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentProducts, setRecentProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  // Report Filters
  const [reportStoreFilter, setReportStoreFilter] = useState('ALL');
  const [reportProductFilter, setReportProductFilter] = useState('ALL');
  const [reportDateFilter, setReportDateFilter] = useState('ALL'); 
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  
  // New State for Report Type
  const [activeReportTab, setActiveReportTab] = useState('INVENTORY'); // 'INVENTORY' or 'SALES'

  // Products State (LocalStorage Persistence)
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('app_products_oman');
      let data = saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
      
      // AUTO-INJECT SALES DATA FOR POC (Price in OMR & Weekly Velocity)
      return data.map(p => ({
        ...p,
        price: p.price || (Math.random() * 5 + 1).toFixed(3), // Random OMR price 1.000 to 6.000
        sales_velocity: p.sales_velocity || Math.floor(Math.random() * 40) + 5 // Units sold per week
      }));
    } catch (e) {
      return INITIAL_PRODUCTS;
    }
  });

  // Audit Form State
  const [auditCount, setAuditCount] = useState('');
  const [auditImage, setAuditImage] = useState(null);
  
  // Sync Queue State (Simulating Offline Queue)
  const [offlineQueue, setOfflineQueue] = useState(() => {
    const saved = localStorage.getItem('audit_queue');
    return saved ? JSON.parse(saved) : [];
  });

  // --- EFFECTS ---

  useEffect(() => {
    localStorage.setItem('app_products_oman', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLocation();
      setView('STORE_SELECT');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const processQueue = () => {
      if (isOnline && offlineQueue.length > 0) {
        console.log("Syncing records to cloud...", offlineQueue.length);
        setTimeout(() => {
          setOfflineQueue([]);
          localStorage.removeItem('audit_queue');
        }, 2000);
      }
    };
    const interval = setInterval(processQueue, 5000);
    return () => clearInterval(interval);
  }, [isOnline, offlineQueue]);

  // --- ACTIONS ---

  const useFallbackLocation = () => {
     const defaultLat = 23.5880;
     const defaultLng = 58.3829;
     setLocation({ lat: defaultLat, lng: defaultLng });
     const storesWithDist = MOCK_STORES.map(store => ({
        ...store,
        distance: getDistance(defaultLat, defaultLng, store.lat, store.lng)
      })).sort((a, b) => a.distance - b.distance);
      setNearbyStores(storesWithDist);
  };

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      setGpsError("Geolocation is not supported. Using demo location.");
      useFallbackLocation();
      return;
    }
    const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        const storesWithDist = MOCK_STORES.map(store => ({
          ...store,
          distance: getDistance(latitude, longitude, store.lat, store.lng)
        })).sort((a, b) => a.distance - b.distance);
        setNearbyStores(storesWithDist);
        setGpsError(null);
      },
      (error) => {
        console.warn("Location retrieval failed, falling back to demo mode.", error);
        setGpsError("GPS Signal Failed. Using Demo Location.");
        useFallbackLocation();
      },
      options
    );
  };

  const handleStoreSelect = (store) => {
    setSelectedStore(store);
    setView('PRODUCT_LIST');
  };

  const handleProductSelect = (inputProduct) => {
    const product = products.find(p => p.sku === inputProduct.sku) || inputProduct;
    setRecentProducts(prev => {
      const filtered = prev.filter(p => p.sku !== product.sku);
      return [product, ...filtered].slice(0, 5); 
    });
    setSelectedProduct(product);
    setAuditCount('');
    setAuditImage(null);
    setView('AUDIT_FORM');
  };

  const handleCameraCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAuditImage({ file, url });
    }
  };

  const validateAndSubmit = () => {
    if (auditCount === '') return;

    const count = parseInt(auditCount, 10);
    const currentTimestamp = new Date().toISOString();

    setProducts(currentProducts => 
      currentProducts.map(p => {
        if (p.sku === selectedProduct.sku) {
          const newHistory = [...p.history.slice(1), p.last_count];
          return {
            ...p,
            last_count: count,
            last_audit_date: currentTimestamp,
            last_store_id: selectedStore.id, // Capture location
            history: newHistory
          };
        }
        return p;
      })
    );

    const record = {
      audit_id: crypto.randomUUID(),
      store_id: selectedStore.id,
      sku: selectedProduct.sku,
      new_stock: count,
      timestamp: currentTimestamp,
    };

    if (!isOnline) {
      const newQueue = [...offlineQueue, record];
      setOfflineQueue(newQueue);
      localStorage.setItem('audit_queue', JSON.stringify(newQueue));
    } else {
      const newQueue = [...offlineQueue, record];
      setOfflineQueue(newQueue); 
    }

    setView('SUCCESS');
    setTimeout(() => {
      setView('PRODUCT_LIST');
    }, 1500);
  };

  // Helper for Reports Filtering
  const getFilteredProducts = () => {
    return products.filter(p => {
      // Store Filter
      if (reportStoreFilter !== 'ALL' && p.last_store_id !== parseInt(reportStoreFilter)) {
        return false;
      }

      // Product Filter
      if (reportProductFilter !== 'ALL' && p.sku !== reportProductFilter) {
        return false;
      }
      
      // Date Filter
      if (reportDateFilter !== 'ALL') {
        const auditDate = new Date(p.last_audit_date);
        const now = new Date();
        const diffTime = Math.abs(now - auditDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (reportDateFilter === '7DAYS' && diffDays > 7) return false;
        if (reportDateFilter === '30DAYS' && diffDays > 30) return false;
        if (reportDateFilter === 'LAST_QUARTER' && diffDays > 90) return false;
        
        if (reportDateFilter === 'CUSTOM') {
          if (customStartDate && auditDate < new Date(customStartDate)) return false;
          if (customEndDate) {
             const end = new Date(customEndDate);
             end.setHours(23, 59, 59, 999);
             if (auditDate > end) return false;
          }
        }
      }
      
      return true;
    });
  };

  const filteredProducts = getFilteredProducts();
  const calculateTotalStock = () => filteredProducts.reduce((acc, p) => acc + p.last_count, 0);
  const calculateLastMonthStock = () => filteredProducts.reduce((acc, p) => {
    const lastMonthVal = p.history[p.history.length - 1] || 0;
    return acc + lastMonthVal;
  }, 0);

  // Sales Calculation Helper
  const calculateSalesMetrics = () => {
    let weeks = 4; // Default to ~1 month
    if (reportDateFilter === '7DAYS') weeks = 1;
    if (reportDateFilter === 'LAST_QUARTER') weeks = 12;
    
    const totalRevenue = filteredProducts.reduce((acc, p) => acc + (p.sales_velocity * weeks * parseFloat(p.price)), 0);
    const totalUnitsSold = filteredProducts.reduce((acc, p) => acc + (p.sales_velocity * weeks), 0);
    
    const topProducts = [...filteredProducts].sort((a, b) => b.sales_velocity - a.sales_velocity).slice(0, 3);
    
    return { totalRevenue, totalUnitsSold, topProducts };
  };

  const salesMetrics = calculateSalesMetrics();

  // --- VIEWS ---

  if (view === 'SPLASH') return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white p-6">
      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/50">
        <Package size={32} />
      </div>
      <h1 className="text-2xl font-bold mb-2">AuditMaster Pro</h1>
      <p className="text-slate-400 mb-8 text-center">Oman Field Inventory Verification</p>
      <div className="animate-spin text-blue-500">
        <RefreshCw />
      </div>
      <p className="text-xs text-slate-500 mt-4">Initializing Secure Environment...</p>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      
      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 shadow-sm z-10 flex justify-between items-center">
        {view === 'STORE_SELECT' ? (
          <div className="flex items-center gap-2">
             <div className="bg-blue-600 p-1.5 rounded-lg text-white">
               <Package size={18} />
             </div>
             <span className="font-bold text-slate-800">AuditMaster</span>
             <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold tracking-wider hidden sm:inline-block">POC</span>
          </div>
        ) : (
          <button 
            onClick={() => setView(view === 'REPORTS' ? 'STORE_SELECT' : view === 'AUDIT_FORM' ? 'PRODUCT_LIST' : 'STORE_SELECT')}
            className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-full active:bg-slate-200 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
        )}

        <div className="flex items-center gap-3">
          {/* Reports Button - Only on Store Select */}
          {view === 'STORE_SELECT' && (
            <button 
              onClick={() => setView('REPORTS')}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
            >
              <FileText size={14} />
              <span className="hidden sm:inline">Reports</span>
            </button>
          )}

          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            isOnline ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
          }`}>
            {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
            <span className="hidden sm:inline">{isOnline ? 'Online' : 'Offline'}</span>
            {offlineQueue.length > 0 && (
              <span className="ml-1 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] animate-pulse">
                {offlineQueue.length}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-slate-50">
        
        {/* VIEW: STORE SELECTOR */}
        {view === 'STORE_SELECT' && (
          <div className="p-4 space-y-4 max-w-5xl mx-auto w-full">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
              <MapPin className="text-blue-600 mt-1 shrink-0" size={20} />
              <div>
                <h2 className="font-semibold text-blue-900">Current Location</h2>
                <p className="text-sm text-blue-700">
                  {location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'Locating...'}
                </p>
                {gpsError && <p className="text-xs text-amber-600 font-medium mt-1 bg-amber-50 px-2 py-1 rounded inline-block">{gpsError}</p>}
                {!location && (
                  <button onClick={fetchLocation} className="mt-2 text-xs bg-blue-600 text-white px-3 py-1 rounded-md">
                    Retry GPS
                  </button>
                )}
              </div>
            </div>

            <h3 className="font-bold text-lg mt-6 mb-2 text-slate-800">Nearby Stores</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearbyStores.map(store => (
                <div 
                  key={store.id}
                  onClick={() => handleStoreSelect(store)}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md active:scale-[0.98] transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-slate-800">{store.name}</h4>
                      <p className="text-sm text-slate-500">{store.address}</p>
                    </div>
                    {store.distance !== null && (
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        store.distance < 100 ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {store.distance < 1000 ? `${Math.round(store.distance)}m` : `${(store.distance/1000).toFixed(1)}km`}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: REPORTS DASHBOARD */}
        {view === 'REPORTS' && (
          <div className="p-4 max-w-5xl mx-auto w-full space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                <BarChart3 className="text-blue-600" />
                Performance Report
              </h3>
              
              {/* FILTERS */}
              <div className="flex flex-wrap gap-2 items-center">
                {/* Store Filter */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-500">
                    <Store size={14} />
                  </div>
                  <select 
                    value={reportStoreFilter}
                    onChange={(e) => setReportStoreFilter(e.target.value)}
                    className="pl-8 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                  >
                    <option value="ALL">All Stores</option>
                    {MOCK_STORES.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                {/* Product Filter */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-500">
                    <Package size={14} />
                  </div>
                  <select 
                    value={reportProductFilter}
                    onChange={(e) => setReportProductFilter(e.target.value)}
                    className="pl-8 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer max-w-[200px]"
                  >
                    <option value="ALL">All Products</option>
                    {products.map(p => (
                      <option key={p.sku} value={p.sku}>{p.name}</option>
                    ))}
                  </select>
                </div>

                {/* Date Filter */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-500">
                    <Calendar size={14} />
                  </div>
                  <select 
                    value={reportDateFilter}
                    onChange={(e) => setReportDateFilter(e.target.value)}
                    className="pl-8 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                  >
                    <option value="ALL">All Time</option>
                    <option value="7DAYS">Last 7 Days</option>
                    <option value="30DAYS">Last 30 Days</option>
                    <option value="LAST_QUARTER">Last Quarter</option>
                    <option value="CUSTOM">Custom Range</option>
                  </select>
                </div>

                {/* Custom Date Inputs */}
                {reportDateFilter === 'CUSTOM' && (
                  <div className="flex gap-2 items-center animate-in fade-in zoom-in duration-200">
                    <input 
                      type="date" 
                      value={customStartDate}
                      onChange={(e) => setCustomStartDate(e.target.value)}
                      className="px-2 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-slate-400">-</span>
                    <input 
                      type="date" 
                      value={customEndDate}
                      onChange={(e) => setCustomEndDate(e.target.value)}
                      className="px-2 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* TAB SWITCHER */}
            <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-fit">
              <button 
                onClick={() => setActiveReportTab('INVENTORY')}
                className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeReportTab === 'INVENTORY' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Inventory Audit
              </button>
              <button 
                onClick={() => setActiveReportTab('SALES')}
                className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeReportTab === 'SALES' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Sales & Revenue
              </button>
            </div>
            
            {/* --- INVENTORY REPORT CONTENT --- */}
            {activeReportTab === 'INVENTORY' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <span className="text-slate-500 text-xs uppercase font-bold tracking-wider">Current Inventory</span>
                    <div className="text-3xl font-mono font-bold text-blue-600 mt-1">
                      {calculateTotalStock().toLocaleString()} <span className="text-sm font-sans font-normal text-slate-400">units</span>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <span className="text-slate-500 text-xs uppercase font-bold tracking-wider">Current Month vs Previous Month</span>
                    <div className="flex items-end gap-2 mt-1">
                      <div className="text-3xl font-mono font-bold text-slate-800">
                        {Math.abs(calculateTotalStock() - calculateLastMonthStock())}
                      </div>
                      <div className={`flex items-center text-sm font-medium mb-1.5 ${
                        calculateTotalStock() >= calculateLastMonthStock() ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {calculateTotalStock() >= calculateLastMonthStock() ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        <span>{Math.abs(calculateTotalStock() - calculateLastMonthStock()) > 0 ? (calculateTotalStock() > calculateLastMonthStock() ? 'Increase' : 'Decrease') : 'No Change'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed List */}
                {filteredProducts.length > 0 ? (
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                      <h4 className="font-semibold text-slate-700">Detailed Variance Analysis</h4>
                    </div>
                    <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                      <tr>
                        <th className="p-4">Product</th>
                        <th className="p-4 text-right">Current</th>
                        <th className="p-4 text-right">Previous</th>
                        <th className="p-4 text-right">Diff</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredProducts.map(p => {
                            const lastMonth = p.history[p.history.length - 1] || 0;
                            const diff = p.last_count - lastMonth;
                            return (
                              <tr key={p.sku} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4">
                                  <div className="flex items-center gap-3">
                                    <span className="text-xl">{p.img}</span>
                                    <div>
                                      <div className="font-semibold text-slate-800">{p.name}</div>
                                      <div className="text-xs text-slate-400 font-mono">{p.sku}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4 text-right font-mono text-base font-medium">{p.last_count}</td>
                                <td className="p-4 text-right font-mono text-slate-500">{lastMonth}</td>
                                <td className="p-4 text-right font-mono">
                                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                                    diff > 0 ? 'bg-green-100 text-green-700' : diff < 0 ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                                  }`}>
                                    {diff > 0 ? <TrendingUp size={12} /> : diff < 0 ? <TrendingDown size={12} /> : <Minus size={12} />}
                                    {Math.abs(diff)}
                                  </div>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <p className="text-slate-500">No audits found matching these filters.</p>
                  </div>
                )}
              </div>
            )}

            {/* --- SALES REPORT CONTENT --- */}
            {activeReportTab === 'SALES' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                
                {/* Sales Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-5 rounded-xl shadow-md text-white">
                    <div className="flex items-center gap-2 opacity-80 mb-1">
                      <DollarSign size={16} />
                      <span className="text-xs uppercase font-bold tracking-wider">Est. Revenue</span>
                    </div>
                    <div className="text-3xl font-mono font-bold">
                      {salesMetrics.totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 3})} <span className="text-sm font-sans font-normal opacity-70">OMR</span>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <ShoppingBag size={16} />
                      <span className="text-xs uppercase font-bold tracking-wider">Units Sold</span>
                    </div>
                    <div className="text-3xl font-mono font-bold text-slate-800">
                      {salesMetrics.totalUnitsSold.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <PieChart size={16} />
                      <span className="text-xs uppercase font-bold tracking-wider">Avg Price</span>
                    </div>
                    <div className="text-3xl font-mono font-bold text-slate-800">
                      {(salesMetrics.totalRevenue / (salesMetrics.totalUnitsSold || 1)).toFixed(3)} <span className="text-sm font-sans font-normal text-slate-400">OMR</span>
                    </div>
                  </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                  <h4 className="font-bold text-slate-800 mb-4">Top Performing Products</h4>
                  <div className="space-y-4">
                    {salesMetrics.topProducts.map((p, i) => (
                      <div key={p.sku} className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          i === 0 ? 'bg-yellow-100 text-yellow-700' : 
                          i === 1 ? 'bg-slate-100 text-slate-700' : 'bg-orange-50 text-orange-700'
                        }`}>
                          #{i+1}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium text-slate-800">{p.name}</span>
                            <span className="font-mono text-sm text-slate-600">{p.sales_velocity} sold/week</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${(p.sales_velocity / (salesMetrics.topProducts[0]?.sales_velocity || 1)) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-slate-800">{(p.sales_velocity * parseFloat(p.price)).toFixed(3)} OMR</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW: PRODUCT LIST */}
        {view === 'PRODUCT_LIST' && (
          <div className="flex flex-col h-full">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 sticky top-0 z-20">
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-1 max-w-5xl mx-auto w-full">
                <Store size={12} />
                <span>{selectedStore?.name}</span>
              </div>
              
              {recentProducts.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar mt-2 max-w-5xl mx-auto w-full">
                  {recentProducts.map(p => (
                    <button 
                      key={p.sku}
                      onClick={() => handleProductSelect(p)}
                      className="shrink-0 flex items-center gap-1 bg-white border border-slate-200 px-2 py-1 rounded-full text-xs shadow-sm hover:bg-slate-50"
                    >
                      <span>{p.img}</span>
                      <span className="max-w-[80px] truncate">{p.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 bg-white border-b border-slate-100 sticky top-[60px] z-10 shadow-sm">
              <div className="relative max-w-5xl mx-auto w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text"
                  placeholder="Search Rice, Oil, or SKU..."
                  className="w-full bg-slate-100 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                {products
                  .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(product => (
                  <div 
                    key={product.sku}
                    onClick={() => handleProductSelect(product)}
                    className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md active:bg-slate-50 cursor-pointer transition-all"
                  >
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-2xl shrink-0">
                      {product.img}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-800 truncate">{product.name}</h4>
                      <p className="text-xs text-slate-500 font-mono truncate">{product.sku}</p>
                      <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400">
                         <CalendarClock size={10} />
                         <span>{formatDate(product.last_audit_date)}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="block text-xs text-slate-400 uppercase">Last Audit</span>
                      <span className="font-mono font-medium text-slate-600">{product.last_count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW: AUDIT FORM */}
        {view === 'AUDIT_FORM' && selectedProduct && (
          <div className="p-4 h-full flex flex-col max-w-2xl mx-auto w-full">
            <div className="flex-1">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-white rounded-2xl mx-auto flex items-center justify-center text-4xl shadow-md mb-3 border border-slate-100">
                  {selectedProduct.img}
                </div>
                <h2 className="text-xl font-bold text-slate-900">{selectedProduct.name}</h2>
                <p className="text-slate-500 font-mono text-sm">{selectedProduct.sku}</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                
                {/* Last Audit & History Context */}
                <div className="mb-6">
                  <div className="flex justify-between items-end mb-4">
                     <div>
                       <span className="text-slate-400 text-xs uppercase font-semibold">Last Audit</span>
                       <div className="text-3xl font-mono text-slate-800 font-bold mt-1">{selectedProduct.last_count}</div>
                       <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                         <CalendarClock size={12} />
                         {formatDate(selectedProduct.last_audit_date)}
                       </div>
                     </div>
                     <div className="flex items-center gap-1 text-slate-400">
                        <BarChart3 size={14} />
                        <span className="text-xs">History</span>
                     </div>
                  </div>

                  {/* Historical Bar Chart (Weekly) */}
                  <div className="bg-slate-50 rounded-lg p-3 pt-6 relative h-32 flex items-end justify-between gap-1 border border-slate-100">
                    <div className="absolute top-2 left-2 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Last 6 Weeks</div>
                    {selectedProduct.history.map((val, idx) => {
                      const maxVal = Math.max(...selectedProduct.history, selectedProduct.last_count, 1);
                      // Use 75% of container height max to leave room for label
                      const heightPercent = (val / maxVal) * 75;
                      
                      // Calculate dynamic date label (Weekly intervals)
                      const date = new Date();
                      // Subtract weeks: (6 - idx) weeks ago. 7 days per week.
                      date.setDate(date.getDate() - (7 * (6 - idx)));
                      
                      // Format as "DD/MM" for weekly clarity
                      const dateLabel = `${date.getDate()}/${date.getMonth() + 1}`;
                      
                      return (
                        <div key={idx} className="h-full flex-1 flex flex-col justify-end items-center gap-1 group cursor-default">
                          <div 
                            className="w-full bg-blue-200 rounded-t-sm relative transition-all group-hover:bg-blue-300" 
                            style={{ height: `${heightPercent}%` }}
                          >
                             {/* Tooltip on hover */}
                             <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                               {val}
                             </div>
                          </div>
                          <span className="text-[9px] text-slate-400 font-mono tracking-tighter">{dateLabel}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Input */}
                <div className="mb-6 border-t border-slate-100 pt-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Current Count</label>
                  <input 
                    type="number" 
                    pattern="[0-9]*"
                    inputMode="numeric"
                    className="w-full text-center text-4xl font-mono py-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-100 transition-all"
                    placeholder="0"
                    value={auditCount}
                    onChange={(e) => setAuditCount(e.target.value)}
                  />
                </div>

                {/* Photo Evidence */}
                <div className="mb-4">
                  <label className={`flex items-center justify-center gap-2 w-full p-3 rounded-xl border-2 border-dashed transition-colors cursor-pointer active:bg-slate-100 ${
                    auditImage ? 'border-green-400 bg-green-50 text-green-700' : 'border-slate-300 text-slate-500 hover:border-blue-400 hover:text-blue-500'
                  }`}>
                    <input 
                      type="file" 
                      accept="image/*" 
                      capture="environment" 
                      className="hidden"
                      onChange={handleCameraCapture}
                    />
                    {auditImage ? (
                      <>
                        <CheckCircle size={20} />
                        <span className="font-medium">Photo Attached</span>
                      </>
                    ) : (
                      <>
                        <Camera size={20} />
                        <span className="font-medium">Take Photo Verification</span>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <button 
              onClick={validateAndSubmit}
              disabled={auditCount === '' || !auditImage}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                auditCount === '' || !auditImage
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'
              }`}
            >
              <Save size={20} />
              Save Record
            </button>
          </div>
        )}

        {/* VIEW: SUCCESS */}
        {view === 'SUCCESS' && (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Audit Recorded</h2>
            <p className="text-slate-500">
              {selectedProduct.name} updated to {auditCount} units.
            </p>
            {!isOnline && (
               <p className="text-orange-500 text-sm mt-4 bg-orange-50 px-4 py-2 rounded-lg">
                 Saved to Offline Queue
               </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
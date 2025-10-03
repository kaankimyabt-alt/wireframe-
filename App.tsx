import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
import { LocaleProvider } from './contexts/LocaleContext';
import { ToastProvider } from './contexts/ToastContext';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import WireframePage from './pages/WireframePage';
import LibraryPage from './pages/LibraryPage';
import SuggestionsPage from './pages/SuggestionsPage';
import GuidePage from './pages/GuidePage';
import StatsPage from './pages/StatsPage';
import SettingsPage from './pages/SettingsPage';
import InspirationPage from './pages/InspirationPage';
import ToastContainer from './components/ToastContainer';
import ExampleDetailPage from './pages/ExampleDetailPage';
import GeminiPage from './pages/GeminiPage';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <LocaleProvider>
          <ToastProvider>
            <HashRouter>
              <div className="flex h-screen w-full bg-theme-bg text-theme-text font-sans">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/wireframe" element={<WireframePage />} />
                    <Route path="/library" element={<LibraryPage />} />
                    <Route path="/suggestions" element={<SuggestionsPage />} />
                    <Route path="/suggestions/:appId" element={<ExampleDetailPage />} />
                    <Route path="/guide" element={<GuidePage />} />
                    <Route path="/stats" element={<StatsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/inspiration" element={<InspirationPage />} />
                    <Route path="/gemini-extension" element={<GeminiPage />} />
                  </Routes>
                </main>
                <ToastContainer />
              </div>
            </HashRouter>
          </ToastProvider>
        </LocaleProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
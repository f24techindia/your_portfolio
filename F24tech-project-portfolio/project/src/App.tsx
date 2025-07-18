import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { supabase } from './lib/supabase';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/admin/AdminPanel';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Test Supabase connection on app load
  React.useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error } = await supabase.from('personal_info').select('count').limit(1);
        if (error) {
          console.log('Supabase connection test:', error.message);
        } else {
          console.log('✅ Supabase connected successfully!');
        }
      } catch (error) {
        console.log('Supabase connection error:', error);
      }
    };
    testConnection();
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <PortfolioProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Header
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              showAdminPanel={showAdminPanel}
              setShowAdminPanel={setShowAdminPanel}
            />
            
            <Navigation
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
            />
            
            <main>
              <Hero />
              <About />
              <Projects />
              <Experience />
              <Contact />
            </main>
            
            <Footer />
            
            <AdminPanel
              isOpen={showAdminPanel}
              onClose={() => setShowAdminPanel(false)}
            />
          </div>
        </PortfolioProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
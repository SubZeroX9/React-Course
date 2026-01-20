import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import ProductList from '@pages/ProductList'
import ProductDetail from '@pages/ProductDetail'
import Registration from '@pages/Registration'
import { SidebarProvider } from '@react-app/context'
import { Header, FilterSidebar, Footer, ToastContainer } from '@react-app/ui'
import { useRTL } from '@react-app/i18n'
import { useThemeStore } from '@react-app/stores'
import { loadTheme, type ThemeName } from '@react-app/utils'
import './App.css'

function App() {
  // Apply RTL direction based on language
  useRTL();

  // Restore theme from localStorage on mount
  const { currentTheme } = useThemeStore();

  useEffect(() => {
    loadTheme(currentTheme as ThemeName);
  }, [currentTheme]);

  return (
    <Router>
      <SidebarProvider>
        <div className="min-h-screen bg-prime-surface-ground">
          <Header />
          <FilterSidebar />
          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/products" replace />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/register" element={<Registration />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer />
        </div>
      </SidebarProvider>
    </Router>
  )
}

export default App

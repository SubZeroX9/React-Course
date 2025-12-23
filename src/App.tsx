import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ProductList from '@pages/ProductList'
import ProductDetail from '@pages/ProductDetail'
import { SidebarProvider } from '@context/SidebarProvider'
import { Header, FilterSidebar, ToastContainer } from '@lib/components'
import { useRTL } from '@hooks/useRTL'
import './App.css'

function App() {
  // Apply RTL direction based on language
  useRTL();

  return (
    <Router>
      <SidebarProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <FilterSidebar />
          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/products" replace />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
            </Routes>
          </main>
          <ToastContainer />
        </div>
      </SidebarProvider>
    </Router>
  )
}

export default App

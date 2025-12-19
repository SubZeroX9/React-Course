import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ProductList from '@pages/ProductList'
import ProductDetail from '@pages/ProductDetail'
import { SidebarProvider } from '@context/SidebarProvider'
import { Header } from '@lib/components/Header'
import { FilterSidebar } from '@lib/components/FilterSidebar'
import { ToastContainer } from '@lib/components/ToastContainer'
import './App.css'

function App() {

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

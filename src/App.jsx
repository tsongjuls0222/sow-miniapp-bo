import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import InvoicesPage from "@/pages/InvoicesPage";
import MultipleInvoicesPage from "./pages/MultipleInvoicesPage";
import UnpaidInvoicesPage from "./pages/UnpaidInvoicesPage";
import OfferPage from "./pages/OfferPage";
import ImportExportPage from "./pages/ImportExportPage";
import InventoryPage from "./pages/InventoryPage";
import MemberInvoicingPage from "./pages/MemberInvoicingPage";
import DashboardPage from "@/pages/DashboardPage";
import CustomersPage from "./pages/CustomersPage";
import BusinessPage from "./pages/BusinessPage";
import ProtectedRoute from "@/routes/ProtectedRoute";
import PublicRoute from "@/routes/PublicRoute";
import { LanguageProvider } from "@/global/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/invoices"
          element={
            <ProtectedRoute>
              <InvoicesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <CustomersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/business"
          element={
            <ProtectedRoute>
              <BusinessPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/invoice-journal"
          element={
            <ProtectedRoute>
              <InvoicesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pricelist"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/multiple-invoicing"
          element={
            <ProtectedRoute>
              <MultipleInvoicesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/unpaid"
          element={
            <ProtectedRoute>
              <UnpaidInvoicesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/offer"
          element={
            <ProtectedRoute>
              <OfferPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <InventoryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/member-invoicing"
          element={
            <ProtectedRoute>
              <MemberInvoicingPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/import-export"
          element={
            <ProtectedRoute>
              <ImportExportPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </LanguageProvider>
  );
}

export default App;
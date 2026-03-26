import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import { menu } from './menu'
import AppRoutes from './routes/AppRoutes.jsx';
function RoutePage({ label }) {
  return (
    <div className="p-6 text-gray-700 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-4 capitalize">{label}</h1>
      <p>Welcome to the <b> Learning route</b> for {label} page. Use the sidebar to navigate through the app.</p>
    </div>
  );
}

function NotFound() {
  return (
    <div className="p-6 text-gray-700 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-4">404 - Page not found</h1>
      <p>The route you requested does not exist. Use the sidebar to continue.</p>
    </div>
  );
}

const routeList = menu.flatMap((item) => {
  if (item.children) {
    return item.children.map((child) => ({
      path: child.to.replace(/^\//, ""),
      label: child.label,
    }));
  }

  return item.to ? [{ path: item.to.replace(/^\//, ""), label: item.label }] : [];
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          {routeList.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<RoutePage label={route.label} />}
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes> */}
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>,
)

import { Navigate, Route, Routes } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import Search from "../pages/search";
import Media from "../pages/Media";
import UploadNewsPaper from "../pages/UploadNewsPaper";
import UploadNewsClip from "../pages/UploadNewsClip";
import Reports from "../pages/Reports";
import PerceptionReport from "../pages/PerceptionReport";
import MyMinistryPerception from "../pages/MyMinistryPerception";
import TopicWiseReport from "../pages/TopicWiseReport";
import EMMC from "../pages/EMMC";
import UserLogs from "../pages/UserLogs";
import PressRelease from "../pages/Settings/PressRelease";
import Keywords from "../pages/Settings/Keywords";
import MinistryAlert from "../pages/Settings/MinistryAlert";
import Users from "../pages/Settings/Users";
import Role from "../pages/Settings/Role";
import Publication from "../pages/Settings/Publication";
import Zone from "../pages/Settings/Zone";
import NewsPapers from "../pages/Settings/NewsPapers";
import WhatsAppContacts from "../pages/Settings/WhatsAppContacts";
import Preferences from "../pages/Settings/Preferences";
import WhatsAppWebhook from "../pages/Settings/WhatsAppWebhook";
import Login from "../pages/Login";
import Unauthorized from "../pages/Unauthorized";
import { RequireAuth, RequirePermission } from "../components/ProtectedRoute";
import { ROUTE_PERMISSIONS } from "../auth/rbac";

export default function AppRoutes() {
  const withPermission = (path, element) => (
    <RequirePermission permission={ROUTE_PERMISSIONS[path]}>{element}</RequirePermission>
  );

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route element={<RequireAuth />}>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={withPermission("/dashboard", <Dashboard />)} />
          <Route path="search" element={withPermission("/search", <Search />)} />
          <Route path="media" element={withPermission("/media", <Media />)} />
          <Route path="upload/upload-news-paper" element={withPermission("/upload/upload-news-paper", <UploadNewsPaper />)} />
          <Route path="upload/upload-news-clip" element={withPermission("/upload/upload-news-clip", <UploadNewsClip />)} />
          <Route path="reports" element={withPermission("/reports", <Reports />)} />
          <Route path="perception-report" element={withPermission("/perception-report", <PerceptionReport />)} />
          <Route path="my-ministry-perception" element={withPermission("/my-ministry-perception", <MyMinistryPerception />)} />
          <Route path="topic-wise-report" element={withPermission("/topic-wise-report", <TopicWiseReport />)} />
          <Route path="emmc" element={withPermission("/emmc", <EMMC />)} />
          <Route path="user-logs" element={withPermission("/user-logs", <UserLogs />)} />
          <Route path="settings/press-release" element={withPermission("/settings/press-release", <PressRelease />)} />
          <Route path="settings/keywords" element={withPermission("/settings/keywords", <Keywords />)} />
          <Route path="settings/ministry-alert" element={withPermission("/settings/ministry-alert", <MinistryAlert />)} />
          <Route path="settings/users" element={withPermission("/settings/users", <Users />)} />
          <Route path="settings/role" element={withPermission("/settings/role", <Role />)} />
          <Route path="settings/publication" element={withPermission("/settings/publication", <Publication />)} />
          <Route path="settings/zone" element={withPermission("/settings/zone", <Zone />)} />
          <Route path="settings/news-papers" element={withPermission("/settings/news-papers", <NewsPapers />)} />
          <Route path="settings/whatsapp-contacts" element={withPermission("/settings/whatsapp-contacts", <WhatsAppContacts />)} />
          <Route path="settings/preferences" element={withPermission("/settings/preferences", <Preferences />)} />
          <Route path="settings/whatsapp-webhook" element={withPermission("/settings/whatsapp-webhook", <WhatsAppWebhook />)} />
        </Route>
      </Route>

      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
}

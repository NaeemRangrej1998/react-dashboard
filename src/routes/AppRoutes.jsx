// AppRoutes.js
import { Routes, Route } from "react-router-dom";
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

export default function AppRoutes() {
  return (
    <Routes>

      {/* Routes with Layout */}
      <Route path="/" element={<App />}>
        {/* Main Routes */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="search" element={<Search/>} />
        <Route path="media" element={<Media/>} />
        
        {/* Upload Routes */}
        <Route path="upload/upload-news-paper" element={<UploadNewsPaper />} />
        <Route path="upload/upload-news-clip" element={<UploadNewsClip />} />
        
        {/* Report Routes */}
        <Route path="reports" element={<Reports />} />
        <Route path="perception-report" element={<PerceptionReport />} />
        <Route path="my-ministry-perception" element={<MyMinistryPerception />} />
        <Route path="topic-wise-report" element={<TopicWiseReport />} />
        
        {/* Other Routes */}
        <Route path="emmc" element={<EMMC />} />
        <Route path="user-logs" element={<UserLogs />} />
        
        {/* Settings Routes */}
        <Route path="settings/press-release" element={<PressRelease />} />
        <Route path="settings/keywords" element={<Keywords />} />
        <Route path="settings/ministry-alert" element={<MinistryAlert />} />
        <Route path="settings/users" element={<Users />} />
        <Route path="settings/role" element={<Role />} />
        <Route path="settings/publication" element={<Publication />} />
        <Route path="settings/zone" element={<Zone />} />
        <Route path="settings/news-papers" element={<NewsPapers />} />
        <Route path="settings/whatsapp-contacts" element={<WhatsAppContacts />} />
        <Route path="settings/preferences" element={<Preferences />} />
        <Route path="settings/whatsapp-webhook" element={<WhatsAppWebhook />} />
      </Route>

      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
}
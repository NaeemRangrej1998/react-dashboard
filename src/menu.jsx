import { MdHistory, MdOutlineDashboard, MdOutlinePermMedia, MdOutlineSearch, MdOutlineSettings } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { LuTvMinimalPlay } from "react-icons/lu";
import { PERMISSIONS } from "./auth/rbac";

export const menu = [
  { label: "dashboard", icon: <MdOutlineDashboard />, to: "/dashboard", permission: PERMISSIONS.DASHBOARD_VIEW },
  { label: "media", icon: <MdOutlinePermMedia />, to: "/media", permission: PERMISSIONS.MEDIA_VIEW },
  {
    label: "upload", icon: <IoCloudUploadOutline />,
    children: [
      { label: "uploadNewsPaper", to: "/upload/upload-news-paper", permission: PERMISSIONS.UPLOAD_NEWSPAPER },
      { label: "uploadNewsClips", to: "/upload/upload-news-clip", permission: PERMISSIONS.UPLOAD_NEWSCLIP }
    ],
  },
  { label: "search", icon: <MdOutlineSearch />, to: "/search", permission: PERMISSIONS.SEARCH_VIEW },
  {
    label: "report", icon: <TbReportAnalytics />,
    children: [
      { label: "reports", to: "/reports", permission: PERMISSIONS.REPORTS_VIEW },
      { label: "dpr", to: "/perception-report", permission: PERMISSIONS.PERCEPTION_REPORT_VIEW },
      { label: "myMinistryPerception", to: "/my-ministry-perception", permission: PERMISSIONS.MY_MINISTRY_PERCEPTION_VIEW },
      { label: "topicWiseReport", to: "/topic-wise-report", permission: PERMISSIONS.TOPIC_WISE_REPORT_VIEW }
    ],
  },
  { icon:<LuTvMinimalPlay/>, label: "emmc", to: "/emmc", permission: PERMISSIONS.EMMC_VIEW },
  {
    label: "setting",
    icon: <MdOutlineSettings />,
    children: [
      { label: "pressRelease", to: "/settings/press-release", permission: PERMISSIONS.SETTINGS_PRESS_RELEASE_VIEW },
      { label: "keywords", to: "/settings/keywords", permission: PERMISSIONS.SETTINGS_KEYWORDS_VIEW },
      { label: "ministryAlert", to: "/settings/ministry-alert", permission: PERMISSIONS.SETTINGS_MINISTRY_ALERT_VIEW },
      { label: "users", to: "/settings/users", permission: PERMISSIONS.SETTINGS_USERS_VIEW },
      { label: "role", to: "/settings/role", permission: PERMISSIONS.SETTINGS_ROLE_VIEW },
      { label: "publication", to: "/settings/publication", permission: PERMISSIONS.SETTINGS_PUBLICATION_VIEW },
      { label: "zone", to: "/settings/zone", permission: PERMISSIONS.SETTINGS_ZONE_VIEW },
      { label: "newsPapers", to: "/settings/news-papers", permission: PERMISSIONS.SETTINGS_NEWS_PAPERS_VIEW },
      { label: "whatsappContacts", to: "/settings/whatsapp-contacts", permission: PERMISSIONS.SETTINGS_WHATSAPP_CONTACTS_VIEW },
      { label: "preferences", to: "/settings/preferences", permission: PERMISSIONS.SETTINGS_PREFERENCES_VIEW },
      { label: "whatsappwebhook", to: "/settings/whatsapp-webhook", permission: PERMISSIONS.SETTINGS_WHATSAPP_WEBHOOK_VIEW },
    ],
  },
  { label: "userLogs", icon: <MdHistory />, to: "/user-logs", permission: PERMISSIONS.USER_LOGS_VIEW },
];

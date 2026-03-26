import { MdHistory, MdOutlineDashboard, MdOutlinePermMedia, MdOutlineSearch, MdOutlineSettings } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { LuTvMinimalPlay } from "react-icons/lu";
export const menu = [
  { label: "dashboard", icon: <MdOutlineDashboard />, to: "/dashboard"},
  { label: "media", icon: <MdOutlinePermMedia />, to: "/media"},
  {
    label: "upload", icon: <IoCloudUploadOutline />,
    children: [
      { label: "uploadNewsPaper", to: "/upload/upload-news-paper"},
      { label: "uploadNewsClips", to: "/upload/upload-news-clip"}
    ],
  },
  { label: "search", icon: <MdOutlineSearch />, to: "/search" },
  {
    label: "report", icon: <TbReportAnalytics />,
    children: [
      { label: "reports", to: "/reports" },
      { label: "dpr", to: "/perception-report" },
      { label: "myMinistryPerception", to: "/my-ministry-perception"},
      { label: "topicWiseReport", to: "/topic-wise-report" }
    ],
  },
  { icon:<LuTvMinimalPlay/>, label: "emmc", to: "/emmc" },
  {
    label: "setting",
    icon: <MdOutlineSettings />,
    children: [
      { label: "pressRelease", to: "/settings/press-release",  },
      { label: "keywords", to: "/settings/keywords"},
      { label: "ministryAlert", to: "/settings/ministry-alert" },
      { label: "users", to: "/settings/users" },
      { label: "role", to: "/settings/role"},
      { label: "publication", to: "/settings/publication"},
      { label: "zone", to: "/settings/zone" },
      { label: "newsPapers", to: "/settings/news-papers"},
      { label: "whatsappContacts", to: "/settings/whatsapp-contacts"},
      { label: "preferences", to: "/settings/preferences"},
      { label: "whatsappwebhook", to: "/settings/whatsapp-webhook"},
    ],
  },
  { label: "userLogs", icon: <MdHistory />, to: "/user-logs"},
];
import React from "react";
import CustomTable from "../../components/Customtable";
import Pagination from "../../components/Pagination";
import { useState } from "react";
import { useAuth } from "../../auth/AuthContext.jsx";
import { PERMISSIONS } from "../../auth/rbac";
const mediaData = [
    {
        id: 1,
        title: "BJP diluting rural job scheme: Chhattisgarh Cong. stages protest",
        keywords: ["Farmers", "Employment", "Rural"],
        date: "2024-08-12",
        email: "user1@example.com"
    },
    {
        id: 2,
        title: "State-level committee reviews agriculture investment plan",
        keywords: ["Agriculture", "Finance"],
        date: "2024-08-11",
        email: "user2@example.com"
    },
    {
        id: 3,
        title: "Council debates small-town infrastructure grant criteria",
        keywords: ["Infrastructure", "Urban", "Grants"],
        date: "2024-08-10",
        email: "user3@example.com"
    },
    {
        id: 4,
        title: "Education board considers new curriculum for rural schools",
        keywords: ["Education", "Curriculum", "Rural"],
        date: "2024-08-09",
        email: "user4@example.com "
    },
    {
        id: 5,
        title: "Health department launches mobile clinic initiative",
        keywords: ["Health", "Mobile Clinics"],
        date: "2024-08-08",
        email: "user5@example.com"
    },
    {
        id: 6,
        title: "Environment ministry introduces new conservation policy",
        keywords: ["Environment", "Conservation"],
        date: "2024-08-07",
        email: "user6@example.com"
    },
    {
        id: 7,
        title: "Transport authority plans expansion of public transit routes",
        keywords: ["Transport", "Public Transit"],
        date: "2024-08-06",
        email: "user7@example.com"
    },
    {
        id: 8,
        title: " Tourism board promotes eco-friendly travel destinations",
        keywords: ["Tourism", "Eco-Friendly"],
        date: "2024-08-05",
        email: "user8@example.com"
    },
    {
        id: 9,
        title: "Cultural department announces new arts funding program",
        keywords: ["Culture", "Arts", "Funding"],
        date: "2024-08-04",
        email: "user9@example.com"
    },
    {
        id: 10,
        title: "Sports authority unveils plan for new community sports centers",
        keywords: ["Sports", "Community"],
        date: "2024-08-03",
        email: "user10@example.com"
    }

];

const mediaColumns = [
     {
        key: "id",
        label: "ID",
        // minWidth: "80px",
        maxWidth: "120px",
    },
    {
        key: "title",
        label: "Title",
        minWidth: "px",
        maxWidth: "940px",
        render: (value, row = {}) => {
            const keywords = row.keywords ?? [];

            return (
                <div className="space-y-1">
                        {value}
                    <div className="text-xs text-slate-500 flex flex-wrap items-center gap-1">
                        <span className="text-slate-400 font-semibold">Keywords</span>
                        <span className="text-slate-300">:</span>
                        {keywords.slice(0, 2).map((keyword, index) => (
                            <span
                                key={`${keyword}-${index}`}
                                className="inline-flex items-center gap-1 border border-blue-100 bg-blue-50 text-blue-600 rounded px-2 py-0.5 text-[11px] font-semibold"
                            >
                                {keyword}
                            </span>
                        ))}
                        {keywords.length > 2 && (
                            <span className="text-xs text-blue-600 font-semibold bg-blue-50 border border-blue-100 px-1 rounded">
                                +{keywords.length - 2} more
                            </span>
                        )}
                    </div>
                </div>
            );
        },

    },
    {
        key: "date",
        label: "Published Date",
        minWidth: "150px",
        maxWidth: "200px",
        render: (value) => (value)
    },  

    {
        key: "email",
        label: "Email",
        minWidth: "200px",
        maxWidth: "300px",
    }
];

export default function Users() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageinfo, setPageinfo] = useState({
    totalPages: 1,
  });
  const { hasPermission } = useAuth();
  const canCreateUser = hasPermission(PERMISSIONS.SETTINGS_USERS_CREATE);
  const canEditUser = hasPermission(PERMISSIONS.SETTINGS_USERS_EDIT);
  const canDeleteUser = hasPermission(PERMISSIONS.SETTINGS_USERS_DELETE);

  const rowActions = (row) => (
    <div className="flex gap-2">
      {canEditUser ? (
        <button
          onClick={() => alert("Edit " + row.title)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </button>
      ) : null}
      {canDeleteUser ? (
        <button
          onClick={() => alert("Delete " + row.title)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      ) : null}
    </div>
  );

  return (
    <div className="bg-gray-50">
      {/* <div className="p-4  shadow-md rounded-md"> */}
         <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center border-b p-2 border-gray-200">
          <div className="flex flex-row sm:items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              User
            </h1>
          </div>
          <div className="flex gap-2 items-center">
            <input type="text" placeholder="Search..." className="border rounded px-3 py-2 text-sm w-full max-w-xs focus:outline-none focus:ring-1 focus:ring-primary-500 " />
            {canCreateUser ? (
              <button className="bg-green-600 text-white px-4 py-2 rounded font-semibold shadow hover:bg-green-700 transition flex items-center gap-1 whitespace-nowrap text-sm md:text-base">
                Add User
              </button>
            ) : (
              <span className="text-xs font-medium text-slate-500">Create permission required</span>
            )}
          </div>
        </div> 
        <div className="pb-2">
          <div className="rounded-lg">
            <CustomTable columns={mediaColumns} data={mediaData} rowActions={rowActions} />
          </div>
          <div className="bg-white sticky z-10 p-1 bottom-0">
            <Pagination
            currentPage={pageNumber}
            totalPages={pageinfo?.totalPages || 1}
            onPageSize={(size) => {
              setPageSize(size);
              setPageNumber(1); // Reset to first page when page size changes
            }}
            pageSize={pageSize}
            onPageChange={(e) => setPageNumber(e)}
            totalItems={mediaData.length}
          />
          </div>
          
        </div>
      {/* </div> */}
    </div>

  );
}

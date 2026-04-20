import React from "react";
import CustomTable from "../components/Customtable";
import Pagination from "../components/Pagination";
import { useState } from "react";
import CommonModal from "../components/CommonModal";
import Select from "../components/select";
const dictionary = {
    common: {
        Keywords: "Keywords",
    },
};

const getFieldLabel = (dictionary, namespace, value) =>
    dictionary?.[namespace]?.[value] ?? value;

const onClickViewMore = (namespace, label, payload) => {
    console.log("View more:", { namespace, label, payload });
    alert(`View more ${label}: ${payload.join(", ")}`);
};

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
                            <button
                                type="button"
                                className="text-xs text-blue-600 font-semibold bg-blue-50 border border-blue-100 px-1 rounded"
                                onClick={() =>
                                    onClickViewMore(
                                        "keyword",
                                        getFieldLabel(dictionary, "common", "Keywords"),
                                        keywords
                                    )
                                }
                            >
                                View More
                            </button>
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

const rowActions = (row) => (
    <div className="flex gap-2">
        <button
            onClick={() => alert("Edit " + row.title)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            Edit
        </button>
        <button
            onClick={() => alert("Delete " + row.title)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
            Delete
        </button>
    </div>
);

export default function Media() {
    const [selectedFilter, setSelectedFilter] = useState(null);

    const filterOptions = [
        { value: "all", label: "All" },
        { value: "farmers", label: "Farmers" },
        { value: "employment", label: "Employment" },
        { value: "agriculture", label: "Agriculture" },
        { value: "education", label: "Education" },
        { value: "health", label: "Health" },
    ];

    return (
        <>
            <h2 className="text-xl font-semibold">Media Title</h2>
            <div className="relative bg-white w-full p-4 rounded mb-4">
                <h1 className="mb-3 font-semibold">Filter</h1>
                <Select
                    options={filterOptions}
                    value={selectedFilter}
                    onChange={setSelectedFilter}
                    placeholder="Select a filter..."
                    isClearable
                />
            </div>
            <div className="flex flex-col gap-4 w-full">
                <div className="w-full">
                    <div className="w-full">
                        <CustomTable columns={mediaColumns} data={mediaData} rowActions={rowActions} />
                    </div>
                </div>
            </div>
        </>
    );
}

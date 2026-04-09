import React from "react";
import CustomTable from "../components/Customtable";

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
];

const mediaColumns = [
    {
        key: "title",
        label: "Title",
        minWidth: "px",
        maxWidth: "940px",
        render: (value, row = {}) => {
            const keywords = row.keywords ?? [];

            return (
                <div className="space-y-1">
                    <a
                        className="text-blue-600 hover:underline font-medium text-sm"
                        href="#!"
                    >
                        {value}
                    </a>
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
    },  
    {
        key: "id",
        label: "ID",
        minWidth: "80px",
        maxWidth: "120px",
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
    return (
        <>
            <h2 className="text-xl font-semibold">Media Title</h2>
            <div className="flex flex-col gap-4 w-full">
                <div className="w-full">
                    <div className="w-full mt-4">
                        <CustomTable columns={mediaColumns} data={mediaData} rowActions={rowActions} />
                    </div>
                </div>
            </div>
        </>
    );
}

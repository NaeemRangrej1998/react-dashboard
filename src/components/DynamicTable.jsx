import React, { useState, useMemo } from "react";


function DynamicTable({
    columns,
    data,
    rowActions,
    rowHeight = 80,
    checkboxWidth = 36,
    actionWidth = 15,
    maxHeight,
}) {
    const [selectedRows, setSelectedRows] = useState([]);

    const selectedMap = useMemo(
        () => new Map(selectedRows.map(r => [r.id, r])),
        [selectedRows]
    );

    const allSelected =
        data.length > 0 && data.every(r => selectedMap.has(r.id));

    const toggleSelectAll = () => {
        allSelected ? setSelectedRows([]) : setSelectedRows(data);
    };

    const toggleSelectOne = (row) => {
        const exists = selectedMap.has(row.id);

        if (exists) {
            setSelectedRows(prev =>
                prev.filter(r => r.id !== row.id)
            );
        } else {
            setSelectedRows(prev => [...prev, row]);
        }
    };

    return (
        <div
            className="overflow-x-auto custom-scrollbar"
            style={maxHeight ? { maxHeight, overflowY: "auto" } : {}}
        >
            <table className="min-w-full text-sm text-left border-collapse">

                {/* HEADER */}
                <thead className="bg-gray-100 select-none">
                    <tr>

                        {/* SELECT ALL */}
                        <th
                            style={{ width: checkboxWidth }}
                            className="border-b px-2 text-center bg-gray-100"
                        >
                            <input
                                type="checkbox"
                                checked={allSelected}
                                onChange={toggleSelectAll}
                                className="accent-primary-500"
                            />
                        </th>

                        {columns.map(col => (
                            <th
                                key={col.key}
                                className="border-b py-4 px-2 text-base font-semibold text-gray-600 whitespace-nowrap"
                            >
                                {col.label}
                            </th>
                        ))}

                        {rowActions && (
                            <th
                                style={{ width: actionWidth }}
                                className="border-b px-2 text-base text-gray-600 bg-gray-100"
                            >
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>

                {/* BODY */}
                <tbody>
                    {data.map((row, index) => {
                        const isSelected = selectedMap.has(row.id);

                        return (
                            <tr
                                key={row.id}
                                style={{ height: rowHeight }}
                                className={`group border-b ${isSelected
                                        ? "bg-slate-100"
                                        : "bg-white hover:bg-gray-50"
                                    }`}
                            >
                                {/* ROW CHECKBOX */}
                                <td
                                    style={{ width: checkboxWidth }}
                                    className="text-center bg-white group-hover:bg-gray-50"
                                >
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => toggleSelectOne(row)}
                                        className="accent-primary-500"
                                    />
                                </td>

                                {/* DATA CELLS WITH RENDER */}
                                {columns.map(col => (
                                    <td
                                        key={col.key}
                                        className="px-2 py-2 text-base text-muted"
                                    >
                                        {col.render
                                            ? col.render(row[col.key], row, index)
                                            : row[col.key] ?? "—"}
                                    </td>
                                ))}

                                {/* ACTION COLUMN */}
                                {rowActions && (
                                    <td
                                        style={{ width: actionWidth }}
                                        className="px-2 bg-white group-hover:bg-gray-50"
                                    >
                                        {rowActions(row, index)}
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {data.length === 0 && (
                <div className="flex h-44 items-center justify-center text-gray-500 text-2xl">
                    No data available
                </div>
            )}
        </div>
    );
}
export default DynamicTable;
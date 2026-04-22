import { useMemo, useState } from "react";

export default function CustomTable({
    columns,
    data = [],
    rowActions,
    // maxHeight = "400px",
}) {
    const [selectedRows, setSelectedRows] = useState([]);

    const selectedMap = useMemo(
        () => new Map(selectedRows.map(row => [row.id, row])),
        [selectedRows]
    );

    const allSelected = data.length > 0 && data.every(row => selectedMap.has(row.id));

    const toggleSelectAll = () =>
        allSelected ? setSelectedRows([]) : setSelectedRows(data);

    const toggleSelectOne = row => {
        if (selectedMap.has(row.id)) {
            setSelectedRows(prev => prev.filter(r => r.id !== row.id));
        } else {
            setSelectedRows(prev => [...prev, row]);
        }
    };

    return (
        <div
            className="w-full overflow-x-auto"

        >
            <table className="w-full min-w-full text-sm text-left border-collapse">
                <thead className="z-0 top-0 bg-gray-100 select-none">
                    <tr>
                        <th
                            className="border-b px-2 text-center bg-gray-100"
                            style={{
                                width: "48px", position: "sticky",
                                left: 0,
                                zIndex: 0,
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={allSelected}
                                onChange={toggleSelectAll}
                                className="accent-primary-500 flex mx-auto"
                            />
                        </th>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className="border-b py-4 text-base font-semibold text-gray-600 px-2 whitespace-nowrap"
                                style={{
                                    minWidth: col.minWidth,
                                    maxWidth: col.maxWidth,
                                }}
                            >
                                {col.renderLabel ? col.renderLabel(col.label) : col.label}
                            </th>
                        ))}
                        {rowActions && (
                            <th
                                className="border-b md:sticky px-2 text-base text-gray-600 bg-gray-100"
                                style={{
                                    width: "150px",
                                    // position: "sticky",
                                    right: -1,
                                    zIndex: 0,
                                }}
                            >
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => {
                        const isSelected = selectedMap.has(row.id);

                        return (
                            <tr
                                key={row.id}
                                className={`group border-b hover:bg-gray-50 ${isSelected ? "bg-slate-50" : "bg-white"}`}
                                style={{ height: "80px" }}
                            >
                                <td
                                    style={{
                                        width: "48px",
                                        position: "sticky",
                                        left: 0,
                                        zIndex: 10,
                                    }}
                                    className={"text-center  bg-white group-hover:bg-gray-50 "}
                                >
                                    <div className="flex justify-center items-center h-full">
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => toggleSelectOne(row)}
                                        className="accent-primary-500"
                                    />
                                    </div>
                                </td>

                                {columns.map((col) => (
                                    <td
                                        key={col.key}
                                        className={"px-2 text-base py-2 overflow-hidden dark:group-hover:bg-gray-700 text-muted"}

                                        style={{ minWidth: col.minWidth, maxWidth: col.maxWidth }}
                                    >
                                        {col.render
                                            ? col.render(row[col.key], row)
                                            : row[col.key]}
                                    </td>
                                ))}
                                {rowActions && (
                                    <td
                                        className="px-2 text-left md:sticky  bg-white group-hover:bg-gray-50"
                                        style={{
                                            // position: "sticky",
                                            right: 0,
                                            width: "150px",
                                            zIndex: 10,
                                        }}
                                    >
                                        {rowActions(row)}
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

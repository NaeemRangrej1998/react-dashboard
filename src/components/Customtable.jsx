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
                <thead className="bg-gray-100 select-none border-b">
                    <tr>
                        <th
                            className="border-b px-2 text-center bg-gray-100 sticky top-0 z-20"
                            style={{ width: "48px" }}
                        >
                            <input
                                type="checkbox"
                                checked={allSelected}
                                onChange={toggleSelectAll}
                                className="accent-primary-500"
                            />
                        </th>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className="text-base font-semibold text-gray-600 whitespace-nowrap px-2 py-4 bg-gray-100 sticky top-0 z-10"
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
                                className="px-2 text-base text-gray-600 bg-gray-100 sticky top-0 z-10"
                                style={{ width: "150px" }}
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
                                className={`border-b hover:bg-gray-50 ${isSelected ? "bg-slate-50" : "bg-white"}`}
                            >
                                <td className="px-2 py-2 text-center">
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => toggleSelectOne(row)}
                                        className="accent-primary-500"
                                    />
                                </td>

                                {columns.map((col) => (
                                    <td
                                        key={col.key}
                                        className="px-2 py-2 text-base text-muted"
                                        style={{ minWidth: col.minWidth, maxWidth: col.maxWidth }}
                                    >
                                        {col.render
                                            ? col.render(row[col.key], row)
                                            : row[col.key]}
                                    </td>
                                ))}
                                {rowActions && (
                                    <td className="px-2 py-2 " >
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

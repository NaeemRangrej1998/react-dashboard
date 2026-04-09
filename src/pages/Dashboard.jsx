import React from 'react';
import DynamicTable from '../components/DynamicTable';
export default function Dashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <DynamicTable
                columns={[
                    { key: "id", label: "ID" },
                    { key: "name", label: "Name" },
                    { key: "email", label: "Email" },
                ]}
                data={[
                    { id: 1, name: "John Doe", email: "john.doe@example.com" },
                    { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
                    { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com" },
                ]}
                rowActions={(row) => (
                    <div className="flex gap-2">
                        <button
                            onClick={() => alert("Edit " + row.name)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => alert("Delete " + row.name)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                )}
            />
        </div>
    );
}

interface DataTableProps {
  className?: string;
  data: Array<{ [key: string]: string | number | boolean | object }>;
}

export default function DataTable({ className, data }: DataTableProps) {
  if (!data.length) return null;

  const columnNames = Object.keys(data[0]).filter((key) => !key.toLowerCase().includes("id"));

  return (
    <div className={className}>
      <table className="min-w-full divide-y">
        <thead>
          <tr>
            {columnNames.map((columnName, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {columnName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columnNames.map((columnName, colIndex) => (
                <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {typeof row[columnName] === "object"
                    ? Object.values(row[columnName])
                        .filter((value) => typeof value !== "number")
                        .join(" ")
                    : row[columnName]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

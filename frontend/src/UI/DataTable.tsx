interface Column {
  header: string;
  key: string | ((row: Record<string, unknown>) => string);
}

interface DataTableProps {
  className?: string;
  data: Array<Record<string, unknown>>;
  columns: Array<Column>;
  onRowClick?: (row: Record<string, unknown>) => void;
}

export default function DataTable({
  className,
  data,
  columns,
  onRowClick,
}: DataTableProps) {
  if (!data.length) return null;

  const getValue = (
    row: Record<string, unknown>,
    key: string | ((row: Record<string, unknown>) => string)
  ) => {
    if (typeof key === "function") {
      return key(row);
    }
    return key.split(".").reduce<unknown>((acc, part) => {
      if (acc && typeof acc === "object" && part in acc) {
        return (acc as Record<string, unknown>)[part];
      }
      return undefined;
    }, row) as string | undefined;
  };

  const handleRowClick = (row: Record<string, unknown>) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  return (
    <div className={className}>
      <table className="min-w-full divide-y">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => handleRowClick(row)}
              className="cursor-pointer hover:bg-border rounded-lg"
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 whitespace-wrap text-sm text-black"
                >
                  {getValue(row, column.key) ?? ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
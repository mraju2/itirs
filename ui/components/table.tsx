export const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-slate-900">{children}</thead>
);

export const TableHead = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <th
      className={`px-4 py-2 border border-slate-300 w-1/6 text-left whitespace-normal break-words truncate ${className}`}
    >
      {children}
    </th>
  );
};

export const TableRow = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <tr
    className={`text-slate-800 odd:bg-slate-300 even:bg-white align-top${className}`}
  >
    {children}
  </tr>
);

interface TableCellProps {
  children: React.ReactNode;
  colSpan?: number;
  title?: string;
  className?: string;
}

export const TableCell = ({
  children,
  colSpan,
  title,
  className = "",
}: TableCellProps) => {
  return (
    <td
      className={`px-4 py-2 border border-slate-300 text-left truncate whitespace-nowrap ${className}`}
      colSpan={colSpan}
      title={title}
    >
      {children}
    </td>
  );
};

export const TableFooter = ({ children }: { children: React.ReactNode }) => {
  return <tfoot className="bg-slate-200 text-slate-900">{children}</tfoot>;
};

export const TableContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="overflow-x-auto w-full">{children}</div>;
};

export const TableBody = ({ children }: { children: React.ReactNode }) => {
  return <tbody>{children}</tbody>;
};

export const Table = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full border-collapse border border-slate-300">
        {children}
      </table>
    </div>
  );
};

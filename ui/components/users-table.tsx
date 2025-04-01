import { UserRegistrationData } from "@/types/user";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./table";

interface UsersTableProps {
  users: UserRegistrationData[];
  onSort: (field: keyof UserRegistrationData) => void;
  sortField: keyof UserRegistrationData | "";
  sortDirection: "asc" | "desc";
}

export const UsersTable = ({
  users,
  onSort,
  sortField,
  sortDirection,
}: UsersTableProps) => {
  const SortIcon = ({ field }: { field: keyof UserRegistrationData }) => {
    if (sortField !== field) return <span className="ml-1">↕</span>;
    return <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>;
  };

  const SortableHeader = ({
    field,
    children,
  }: {
    field: keyof UserRegistrationData;
    children: React.ReactNode;
  }) => (
    <TableHead>
      <button
        className="flex items-center w-full text-left hover:bg-gray-50"
        onClick={() => onSort(field)}
      >
        {children}
        <SortIcon field={field} />
      </button>
    </TableHead>
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <SortableHeader field="firstName">Name</SortableHeader>
          <SortableHeader field="email">Email</SortableHeader>
          <SortableHeader field="phoneNumber">Phone</SortableHeader>
          <SortableHeader field="trade">Trade</SortableHeader>
          <SortableHeader field="district">District</SortableHeader>
          <SortableHeader field="workLocation">Work Location</SortableHeader>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7}>No users found.</TableCell>
          </TableRow>
        ) : (
          users.map((user) => (
            <TableRow key={user.phoneNumber}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.trade}</TableCell>
              <TableCell>{user.district}</TableCell>
              <TableCell>{user.workLocation}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

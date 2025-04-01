import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PencilIcon,
  TrashIcon,
  MoreHorizontalIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "lucide-react";
import DeleteConfirmModal from "./delete-confirm-modal";
import UserEditModal from "./";
import { useToast } from "@/components/ui/use-toast";

const UserRegistrationTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [sortField, setSortField] = useState("email");
  const [sortDirection, setSortDirection] = useState("asc");
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    trades: [],
    districts: [],
    workLocations: [],
  });
  const { toast } = useToast();

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);

        // Extract unique values for filters
        setFilterOptions({
          trades: [...new Set(data.map((user) => user.trade))],
          districts: [...new Set(data.map((user) => user.district))],
          workLocations: [...new Set(data.map((user) => user.workLocation))],
        });
      } catch (error) {
        console.error("Error fetching users:", error);
        toast({
          title: "Error",
          description: "Failed to load user data",
          variant: "destructive",
        });
      }
    };

    fetchUsers();
  }, [toast]);

  // Apply filters and search
  useEffect(() => {
    let result = [...users];

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (user) =>
          user.email.toLowerCase().includes(term) ||
          user.phoneNumber.includes(term) ||
          (user.firstName && user.firstName.toLowerCase().includes(term)) ||
          (user.lastName && user.lastName.toLowerCase().includes(term))
      );
    }

    // Apply field filter
    if (filterField && filterValue) {
      result = result.filter(
        (user) =>
          user[filterField] && user[filterField].toString() === filterValue
      );
    }

    // Apply sort
    if (sortField) {
      result.sort((a, b) => {
        const aValue = a[sortField] || "";
        const bValue = b[sortField] || "";

        if (sortDirection === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });
    }

    setFilteredUsers(result);
  }, [users, searchTerm, filterField, filterValue, sortField, sortDirection]);

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Handle user edit
  const handleUserUpdate = async (updatedUser) => {
    try {
      const response = await fetch(`/api/users/${updatedUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) throw new Error("Failed to update user");

      // Update local state
      setUsers(
        users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );

      toast({
        title: "Success",
        description: "User updated successfully",
      });
    } catch (error) {
      console.error("Error updating user:", error);
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive",
      });
    }

    setEditingUser(null);
  };

  // Handle user delete
  const handleUserDelete = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete user");

      // Update local state
      setUsers(users.filter((user) => user.id !== userId));

      toast({
        title: "Success",
        description: "User deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      });
    }

    setDeletingUser(null);
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUpIcon className="w-4 h-4 ml-1" />
    ) : (
      <ChevronDownIcon className="w-4 h-4 ml-1" />
    );
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        {/* Search */}
        <div className="w-full md:w-1/3">
          <Input
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-2">
          <Select value={filterField} onValueChange={setFilterField}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">None</SelectItem>
              <SelectItem value="trade">Trade</SelectItem>
              <SelectItem value="district">District</SelectItem>
              <SelectItem value="workLocation">Work Location</SelectItem>
            </SelectContent>
          </Select>

          {filterField && (
            <Select value={filterValue} onValueChange={setFilterValue}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Select value" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any</SelectItem>
                {filterField === "trade" &&
                  filterOptions.trades.map((trade) => (
                    <SelectItem key={trade} value={trade}>
                      {trade}
                    </SelectItem>
                  ))}
                {filterField === "district" &&
                  filterOptions.districts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                {filterField === "workLocation" &&
                  filterOptions.workLocations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("email")}
              >
                <div className="flex items-center">
                  Email <SortIcon field="email" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("phoneNumber")}
              >
                <div className="flex items-center">
                  Phone <SortIcon field="phoneNumber" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("trade")}
              >
                <div className="flex items-center">
                  Trade <SortIcon field="trade" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("district")}
              >
                <div className="flex items-center">
                  District <SortIcon field="district" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("workLocation")}
              >
                <div className="flex items-center">
                  Work Location <SortIcon field="workLocation" />
                </div>
              </TableHead>
              <TableHead className="w-16">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-6 text-gray-500"
                >
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>{user.trade}</TableCell>
                  <TableCell>{user.district}</TableCell>
                  <TableCell>{user.workLocation}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingUser(user)}>
                          <PencilIcon className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setDeletingUser(user)}
                          className="text-red-600"
                        >
                          <TrashIcon className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination can be added here */}

      {/* Modals */}
      {editingUser && (
        <UserEditModal
          user={editingUser}
          onSave={handleUserUpdate}
          onCancel={() => setEditingUser(null)}
          filterOptions={filterOptions}
        />
      )}

      {deletingUser && (
        <DeleteConfirmModal
          user={deletingUser}
          onConfirm={() => handleUserDelete(deletingUser.id)}
          onCancel={() => setDeletingUser(null)}
        />
      )}
    </div>
  );
};

export default UserRegistrationTable;

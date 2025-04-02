"use client";

import { useState, useEffect } from "react";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { UsersTable } from "../../../components/users-table";
import { userService } from "../../../services/user-service";
import { UserRegistrationData } from "../../../types/user";
import { TRADE_OPTIONS } from "../../constants/trades"; // assuming you moved trade list here
import { SmartSearchInput } from "@/components/smart-search";

const USERS_PER_PAGE = 5;

const UserList = () => {
  const [users, setUsers] = useState<UserRegistrationData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTrade, setFilterTrade] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [sortField, setSortField] = useState<keyof UserRegistrationData | "">(
    ""
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getAllRegistrations();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  const parseAdvancedSearch = (search: string): Record<string, string> => {
    const result: Record<string, string> = {};
    const parts = search
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    for (const part of parts) {
      const [key, ...rest] = part.split(":");
      if (key && rest.length > 0) {
        result[key.trim().toLowerCase()] = rest.join(":").trim().toLowerCase();
      }
    }
    return result;
  };

  const matchesAdvancedSearch = (
    user: UserRegistrationData,
    filters: Record<string, string>
  ): boolean => {
    return Object.entries(filters).every(([key, value]) => {
      const normalizedKey = key.toLowerCase();
      const field = user[normalizedKey as keyof UserRegistrationData];
      if (!field) return false;
      const fieldValue = field.toString().toLowerCase();
      switch (normalizedKey) {
        case "name":
        case "firstname":
        case "lastname":
        case "phone":
        case "phonenumber":
          return fieldValue.startsWith(value);
        case "trade":
        case "district":
        case "passyear":
          return fieldValue === value;
        case "email":
        case "address":
        default:
          return fieldValue.includes(value);
      }
    });
  };

  const filteredAndSortedUsers = users
    .filter((user) => {
      const filters = parseAdvancedSearch(searchTerm.trim());
      const matchesSearch =
        Object.keys(filters).length > 0
          ? matchesAdvancedSearch(user, filters)
          : Object.values(user).some((value) =>
              value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
            );
      const matchesTrade =
        filterTrade === "" ||
        user.trade.toLowerCase() === filterTrade.toLowerCase();
      const matchesLocation =
        filterLocation === "" ||
        user.workLocation.toLowerCase() === filterLocation.toLowerCase();
      return matchesSearch && matchesTrade && matchesLocation;
    })
    .sort((a, b) => {
      if (!sortField) return 0;
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (aValue === bValue) return 0;
      if (!aValue) return 1;
      if (!bValue) return -1;
      const comparison = aValue < bValue ? -1 : 1;
      return sortDirection === "asc" ? comparison : -comparison;
    });

  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const currentUsers = filteredAndSortedUsers.slice(
    startIndex,
    startIndex + USERS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredAndSortedUsers.length / USERS_PER_PAGE);

  const locations = Array.from(new Set(users.map((user) => user.workLocation)));

  const handleSort = (field: keyof UserRegistrationData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-2">
        <Breadcrumbs
          items={[{ label: "Admin", href: "/admin" }, { label: "Users" }]}
        />

        <div className="bg-white rounded-lg shadow p-3 mb-3">
          <div className="flex flex-wrap gap-2 items-center">
            {/* Search Input with Floating UI help */}
            <SmartSearchInput
              value={searchTerm}
              onChange={(val) => setSearchTerm(val)}
              keys={[
                "name",
                "phone",
                "district",
                "trade",
                "email",
                "firstname",
                "lastname",
                "passyear",
              ]}
              examples={[
                "name:ravi, phone:9538",
                "district:nellore, trade:welder",
              ]}
            />

            <select
              value={filterTrade}
              onChange={(e) => setFilterTrade(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-md text-black"
            >
              <option value="">All Trades</option>
              {TRADE_OPTIONS.map((trade) => (
                <option key={trade.label} value={trade.value}>
                  {trade.value}
                </option>
              ))}
            </select>

            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-md text-black"
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setSearchTerm("");
                setFilterTrade("");
                setFilterLocation("");
                setSortField("");
                setSortDirection("asc");
              }}
              className="bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white text-sm px-4 py-2 rounded-md"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4">
            <UsersTable
              users={currentUsers}
              onSort={handleSort}
              sortField={sortField}
              sortDirection={sortDirection}
            />
          </div>

          <div className="bg-gray-50 px-4 py-3 border-t flex justify-between items-center text-sm">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-3 py-1 rounded bg-indigo-600 text-white disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-3 py-1 rounded bg-indigo-600 text-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;

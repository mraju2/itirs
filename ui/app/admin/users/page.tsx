"use client";
import { useState, useEffect } from "react";
import { UsersTable } from "../../../components/users-table";
import { userService } from "../../../services/user-service";
import { UserRegistrationData } from "../../../types/user";

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

  // Fetch users
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

  // Filter and sort users
  const filteredAndSortedUsers = users
    .filter((user) => {
      const matchesSearch =
        searchTerm === "" ||
        Object.values(user).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
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

  // Pagination logic
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const currentUsers = filteredAndSortedUsers.slice(
    startIndex,
    startIndex + USERS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredAndSortedUsers.length / USERS_PER_PAGE);

  // Get unique trades and locations for filters
  const trades = Array.from(new Set(users.map((user) => user.trade)));
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-white text-center">
            User Management Dashboard
            <span className="block text-sm font-medium mt-1 text-indigo-100">
              వినియోగదారు నిర్వహణ డాష్‌బోర్డ్
            </span>
          </h2>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users..."
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Trade Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Trade
              </label>
              <select
                value={filterTrade}
                onChange={(e) => setFilterTrade(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Trades</option>
                {trades.map((trade) => (
                  <option key={trade} value={trade}>
                    {trade}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Location
              </label>
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterTrade("");
                  setFilterLocation("");
                  setSortField("");
                  setSortDirection("asc");
                }}
                className="px-4 py-2 text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Users Table */}
          <div className="p-6">
            <UsersTable
              users={currentUsers}
              onSort={handleSort}
              sortField={sortField}
              sortDirection={sortDirection}
            />
          </div>

          {/* Pagination Controls */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-4 py-2 text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Previous
              </button>
              <span className="text-sm text-gray-700 font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-4 py-2 text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;

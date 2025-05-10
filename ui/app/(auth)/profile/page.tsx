"use client";
import { UserRegistration } from "../../../components/user-registration";

const CreateUserPage = () => {
  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-white p-6 rounded-lg shadow mt-4">
          <h1 className="text-xl font-semibold mb-4">Register a New user</h1>
          <UserRegistration />
        </div>
      </div>
    </div>
  );
};

export default CreateUserPage;

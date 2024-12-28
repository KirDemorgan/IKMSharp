import React from "react";
import { RoleManager } from "./RoleManager";
import { UserManager } from "./UserManager";

export const AdminPage: React.FC = () => {
    return (
        <div className="admin-page">
            <h1>Admin Page</h1>
            <RoleManager />
            <UserManager />
        </div>
    );
};
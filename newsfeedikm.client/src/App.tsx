import React, { useEffect, useState } from "react";
import Feed from "./components/Feed";
// @ts-ignore
import './styles/App.css';
import EditForm from "./components/EditForm";
// @ts-ignore
import { usePostStore } from "./store/postStore";
import { useUserStore } from "./store/userStore";
import PostForm from "./components/PostForm";

const App: React.FC = () => {
    const { fetchAllPosts, createPost } = usePostStore();
    const { users, fetchAllUsers, addUser } = useUserStore();

    useEffect(() => {
        fetchAllPosts();
        fetchAllUsers();
    }, [fetchAllPosts, fetchAllUsers]);

    const [showAddPostForm, setShowAddPostForm] = useState(false);
    const [showAddUserForm, setShowAddUserForm] = useState(false);

    const handleAddPost = (data: any) => {
        createPost(data).then(() => setShowAddPostForm(false));
    };

    const handleAddUser = (data: any) => {
        addUser(data).then(() => setShowAddUserForm(false));
    };

    return (
        <div>
            <h1>Social App</h1>
            <div>
                <button onClick={() => { setShowAddPostForm(true); fetchAllUsers(); }}>
                    Add New Post
                </button>
                <button onClick={() => setShowAddUserForm(true)}>
                    Add New User
                </button>
            </div>

            {showAddPostForm && (
                <PostForm
                    initialData={{ content: "", userId: users[0]?.id || 0 }}
                    dropdownData={users.map((user) => ({ value: user.id, label: user.username }))}
                    onSave={handleAddPost}
                    onClose={() => setShowAddPostForm(false)}
                />
            )}

            {showAddUserForm && (
                <EditForm
                    title="Add New User"
                    initialData={{ username: "", surname: "", email: "", password: "", roleId: 1 }}
                    onSave={handleAddUser}
                />
            )}

            <Feed />
        </div>
    );
};

export default App;
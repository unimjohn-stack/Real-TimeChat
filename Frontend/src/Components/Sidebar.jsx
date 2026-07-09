import FriendCard from "./FriendCard";
import { users } from "../Dummy/Data";
import './Sidebar.css';

export default function Sidebar({ selectedUser, setSelectedUser }) {
    return (
    <aside className="sidebar">
        {/* <h1>SideBar Working</h1> */}
        <div className="sidebar-header"><h2>Amebo</h2></div>
        <div className="search"><input type="text" placeholder="Search friends" /></div>
        <div className="friends-list">
            {users.map((user) => (
                <FriendCard key={user.id} user={user} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            ))}
        </div>
    </aside>
    );
}
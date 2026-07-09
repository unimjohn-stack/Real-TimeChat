import "./FriendCard.css";

export default function FriendCard({ user, selectedUser, setSelectedUser }) {
    return (
        <div className={`friend-card ${selectedUser?.id === user.id ? "active" : ""}`} onClick={() => setSelectedUser(user)}>
            <img src={user.avatar} alt={user.name} />
            <div className="friend-info">
                <h4>{user.name}</h4>
                <p>{user.lastMessage}</p>
            </div>
            <span className={`status ${user.online ? "online" : "offline"}`}></span>
        </div>
    )
}
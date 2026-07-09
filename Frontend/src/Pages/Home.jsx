import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import "./Home.css";

export default function Home() {
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <div className="Home">
            <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        </div>
    )
}
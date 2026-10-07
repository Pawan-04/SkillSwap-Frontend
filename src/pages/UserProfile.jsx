import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function UserProfile() {
    const { userId } = useParams();
    const {user} = useAuth()
    

    const [users, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const response = await api.get(
                    `/users/${userId}`
                );

                setUser(response.data.user);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load profile"
                );
            } finally {
                setLoading(false);
            }
        };

        getUserProfile();
    }, [userId]);

    const [chats,setChats] = useState([])
    const[rName,setRname]= useState('')
    const [sendMessage,setSendMessage] = useState('')
    const [reloading,setReloading] = useState(false)
    
     useEffect(()=>{
        const loadChats = async()=>{
            const chatList = await api.get(`/message/${userId}`)
            setRname(chatList.data.receiverName);
            setChats(chatList.data.messages)
            console.log(chatList.data.messages)
            console.log(rName)
        }
        loadChats()
    },[reloading])

    const handleMessage = async()=>{
        try{
            const response = await api.post(`/message/${userId}`,{
                message:sendMessage
            })
            console.log(response)
            setReloading(true)
        }
        catch(err){
            console.log(err)
        }
    }

    if (loading) {
        return (
            <main>
                <div className="loading">Loading profile...</div>
            </main>
        );
    }

    if (error) {
        return (
            <main>
                <div className="error-message">{error}</div>
            </main>
        );
    }

    

    return (<>
    <main className="profile-container">
            <div className="card profile-card">
                <div className="profile-header">
                    <div className="user-avatar-large">
                        {users.name ? users.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                        <h1>{users.name}</h1>
                        <p className="user-email">{users.email}</p>
                    </div>
                </div>

                <div className="profile-bio-box">
                    <h3>About</h3>
                    <p>{users.bio || "No bio added yet."}</p>
                </div>

                <div className="skills-grid">
                    <div className="skill-list">
                        <h2>Skills to Teach</h2>
                        {users.skillsToTeach && users.skillsToTeach.length > 0 ? (
                            <div className="skill-tags">
                                {users.skillsToTeach.map((skill) => (
                                    <span key={skill} className="skill">{skill}</span>
                                ))}
                            </div>
                        ) : (
                            <p className="empty-state">No skills listed.</p>
                        )}
                    </div>

                    <div className="skill-list">
                        <h2>Skills to Learn</h2>
                        {users.skillsToLearn && users.skillsToLearn.length > 0 ? (
                            <div className="skill-tags">
                                {users.skillsToLearn.map((skill) => (
                                    <span key={skill} className="skill">{skill}</span>
                                ))}
                            </div>
                        ) : (
                            <p className="empty-state">No skills listed.</p>
                        )}
                    </div>
                </div>
            </div>
        </main>
        {/* <div className="message-main">
            <h1 className="message-h">{rName.name}</h1>
            {chats.map((elem)=><div key={elem._id}>
                 {elem.sender === user._id ?<div className="message-sender">{elem.message}</div> :<div className="message-receiver">{elem.message}</div> }
            </div>)}

            <input type="text" value={sendMessage} placeholder="Send message" onChange={(e)=>setSendMessage(e.target.value)}/>
            <button onClick={handleMessage}>Send</button>
        </div> */}

        
<div className="message-main">
    <div className="message-header">
        <h1>{rName.name}</h1>
        <span>Online</span>
    </div>

    <div className="messages-container">
        {chats.map((elem) => (
            <div
                key={elem._id}
                className={ elem.sender === user._id ? "message-row sender-row" : "message-row receiver-row"}
                >
                <div
                    className={
                        elem.sender === user._id
                            ? "message-sender"
                            : "message-receiver"
                    }
                >
                    {elem.message}
                </div>
            </div>
        ))}
    </div>

    <div className="message-input-area">
        <input
            type="text"
            value={sendMessage}
            placeholder="Type a message..."
            onChange={(e) => setSendMessage(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    handleMessage();
                }
            }}
        />

        <button onClick={handleMessage}>
            Send
        </button>
    </div>
</div>

        </>
        
    );
}

export default UserProfile;
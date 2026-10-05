import Card from "./Card";

function DiscoverUserCard({
    user,
    onConnect,
    connectingId,
    connectionStatus,
}) {
    const isConnecting = connectingId === user._id;
    const status = connectionStatus[user._id];

    return (
        <Card className="discover-user-card">
            <div className="user-card-header">
                <div className="user-avatar">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="user-info">
                    <h3>{user.name}</h3>
                    {user.email && <p className="user-email">{user.email}</p>}
                </div>
            </div>

            <p className="user-bio">
                {user.bio || "No bio added yet."}
            </p>

            <div className="card-skills">
                <span className="skills-label">Skills to teach:</span>
                {user.skillsToTeach && user.skillsToTeach.length > 0 ? (
                    <div className="skill-tags">
                        {user.skillsToTeach.map((skill) => (
                            <span className="skill" key={skill}>{skill}</span>
                        ))}
                    </div>
                ) : (
                    <p className="empty-state">No skills specified yet.</p>
                )}
            </div>

            <button
                type="button"
                className="btn-connect"
                onClick={() => onConnect(user._id)}
                disabled={isConnecting || status === "pending"}
            >
                {isConnecting
                    ? "Connecting..."
                    : status === "pending"
                    ? "Pending Request"
                    : "Connect"}
            </button>
        </Card>
    );
}

export default DiscoverUserCard;
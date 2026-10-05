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
        <Card variant="profile">
            <h2>{user.name}</h2>

            <p>
                {user.bio || "No bio added yet."}
            </p>

            <p>Skills to teach:</p>

            {user.skillsToTeach.length > 0 ? (
                <ul>
                    {user.skillsToTeach.map((skill) => (
                        <li key={skill}>{skill}</li>
                    ))}
                </ul>
            ) : (
                <p>No skills added yet.</p>
            )}

            <button
                type="button"
                onClick={() => onConnect(user._id)}
                disabled={isConnecting || status === "pending"}
            >
                {isConnecting
                    ? "Connecting..."
                    : status === "pending"
                    ? "Pending"
                    : "Connect"}
            </button>
        </Card>
    );
}
export default DiscoverUserCard
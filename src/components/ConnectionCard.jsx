function ConnectionCard({
    request,
    onUpdate,
    updatingId
}) {
    const isUpdating = updatingId === request._id;

    return (
        <article className="connection-card">
            <div className="user-card-header">
                <div className="user-avatar">
                    {request.sender?.name ? request.sender.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="user-info">
                    <h3>{request.sender?.name}</h3>
                    <p className="user-email">{request.sender?.email}</p>
                </div>
            </div>

            <div className="action-buttons">
                <button
                    type="button"
                    className="btn-primary"
                    disabled={isUpdating}
                    onClick={() => onUpdate(request._id, "accepted")}
                >
                    {isUpdating ? "Updating..." : "Accept"}
                </button>

                <button
                    type="button"
                    className="btn-danger"
                    disabled={isUpdating}
                    onClick={() => onUpdate(request._id, "rejected")}
                >
                    {isUpdating ? "Updating..." : "Reject"}
                </button>
            </div>
        </article>
    );
}

export default ConnectionCard;
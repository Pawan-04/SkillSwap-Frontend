function ConnectionCard({
    request,
    onUpdate,
    updatingId
}) {
    const isUpdating =
        updatingId === request._id;

    return (
        <article className="connection-card">
            <h2>{request.sender.name}</h2>

            <p>{request.sender.email}</p>

            <button
                type="button"
                disabled={isUpdating}
                onClick={() =>
                    onUpdate(
                        request._id,
                        "accepted"
                    )
                }
            >
                {isUpdating ? "Updating..." : "Accept"}
            </button>

            <button
                type="button"
                disabled={isUpdating}
                onClick={() =>
                    onUpdate(
                        request._id,
                        "rejected"
                    )
                }
            >
                {isUpdating ? "Updating..." : "Reject"}
            </button>
        </article>
    );
}

export default ConnectionCard;
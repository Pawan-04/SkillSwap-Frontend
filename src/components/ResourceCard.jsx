function ResourceCard({
    resource,
    onDelete,
    deletingId,
}) {
    const isDeleting = deletingId === resource._id;

    return (
        <article className="resource-card">
            <div className="resource-header">
                <h3>{resource.title}</h3>
                {resource.category && (
                    <span className="category-badge">{resource.category}</span>
                )}
            </div>

            <p className="resource-description">{resource.description}</p>

            <div className="resource-actions">
                <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-link"
                >
                    Open Resource ↗
                </a>

                <button
                    type="button"
                    className="btn-danger"
                    onClick={() => onDelete(resource._id)}
                    disabled={isDeleting}
                >
                    {isDeleting ? "Deleting..." : "Delete"}
                </button>
            </div>
        </article>
    );
}

export default ResourceCard;
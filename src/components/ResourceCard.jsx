function ResourceCard({
    resource,
    onDelete,
    deletingId,
}) {
    const isDeleting = deletingId === resource._id;

    return (
        <article className="resource-card">
            <h2>{resource.title}</h2>

            <p>{resource.description}</p>

            <p>
                Category: {resource.category}
            </p>

            <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
            >
                Open Resource
            </a>

            <button
                type="button"
                onClick={() => onDelete(resource._id)}
                disabled={isDeleting}
            >
                {isDeleting
                    ? "Deleting..."
                    : "Delete"}
            </button>
        </article>
    );
}

export default ResourceCard;
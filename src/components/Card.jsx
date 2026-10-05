function Card({ variant, children, className = "" }) {
    const variantClass = variant ? `card-${variant}` : "";
    return (
        <div className={`card ${variantClass} ${className}`.trim()}>
            {children}
        </div>
    );
}

export default Card;
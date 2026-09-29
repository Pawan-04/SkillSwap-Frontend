function Card({ variant, children }) {
    return (
        <div>
            <p>Card type: {variant}</p>

            {children}
        </div>
    );
}

export default Card;
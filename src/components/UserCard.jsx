import Card from "./Card";

function UserCard({ user, onEdit }) {
    return (<>
        <Card variant="profile">
            <h2>{user.name}</h2>

            <p>{user.bio}</p>

            <p>Skills to teach:</p>

            <ul>
                {user.skillsToTeach.map((skill) => (
                    <li key={skill}>{skill}</li>
                ))}
            </ul>

            <button onClick={onEdit}>
                Edit Profile
            </button>
        </Card>

        <Card variant="resource">
                <h2>React Tutorial</h2>
                <p>Learn React fundamentals</p>
            </Card>
    </>);
}

export default UserCard;
import { useAuth } from "../context/AuthContext";
import SkillList from "../components/SkillList";

function Dashboard() {
    const { user } = useAuth();

    return (
        <main className="dashboard">

            <section className="user-summary">
                <h1>Welcome, {user.name} 👋</h1>

                <p>{user.email}</p>

                <div>
                    <h2>Bio</h2>
                    <p>{user.bio || "No bio added yet."}</p>
                </div>
            </section>

            <section className="skills-grid">

                <SkillList
                    title="Skills I Teach"
                    skills={user.skillsToTeach}
                />

                <SkillList
                    title="Skills I Want to Learn"
                    skills={user.skillsToLearn}
                />

            </section>

        </main>
    );
}

export default Dashboard;
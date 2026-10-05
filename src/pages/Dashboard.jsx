import { useAuth } from "../context/AuthContext";
import SkillList from "../components/SkillList";

function Dashboard() {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <main className="dashboard">
            <section className="user-summary card">
                <div className="user-summary-header">
                    <div className="user-avatar-large">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                        <h1>Welcome back, {user.name} 👋</h1>
                        <p className="user-email">{user.email}</p>
                    </div>
                </div>

                <div className="user-bio-section">
                    <h3>Bio</h3>
                    <p>{user.bio || "No bio added yet. Edit your profile to add a bio!"}</p>
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
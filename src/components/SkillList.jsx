function SkillList({ title, skills }) {
    return (
        <div className="skill-list card">
            <h2>{title}</h2>

            {skills && skills.length > 0 ? (
                <div className="skill-tags">
                    {skills.map((skill) => (
                        <span className="skill" key={skill}>
                            {skill}
                        </span>
                    ))}
                </div>
            ) : (
                <p className="empty-state">
                    No skills added yet.
                </p>
            )}
        </div>
    );
}

export default SkillList;
function SkillList({ title, skills }) {
    return (
        <div className="skill-list">
            <h2>{title}</h2>

            {skills.length > 0 ? (
                skills.map((skill) => (
                    <span className="skill" key={skill}>
                        {skill}
                    </span>
                ))
            ) : (
                <p className="empty-state">
                    No skills added yet.
                </p>
            )}
        </div>
    );
}

export default SkillList;
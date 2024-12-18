import React, { useEffect, useState } from "react";
import {
  getSkillsProfessional,
  type Skills,
} from "../../../data/professional-data";

const Skills = ({ itemId }: { itemId: string }) => {
  const [skills, setSkills] = useState<Skills[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const skills = await getSkillsProfessional(itemId as string);
      setSkills(skills);
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [itemId]);

  const displayedSkills = skills.slice(0, 8);
  const extraSkillsCount = skills.length - 8;

  return (
    <ul className="style-none skill-tags d-flex flex-wrap pb-25">
      {displayedSkills.map((skill) => (
        <li key={skill.id} className="skill-tag">
          {skill.name}
        </li>
      ))}
      {extraSkillsCount > 0 && (
        <li key={1} className="more">{`+${extraSkillsCount}`}</li>
      )}
    </ul>
  );
};

export default Skills;

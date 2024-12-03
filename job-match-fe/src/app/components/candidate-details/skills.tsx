import React, { useEffect, useState } from "react";
import { getSkills, type Skills } from "../../../data/professional-data";

const Skills = ({ itemId }: { itemId: string }) => {
  const [skills, setSkills] = useState<Skills[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const skills = await getSkills(itemId as string);
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

  return (
    <ul className="style-none skill-tags d-flex flex-wrap pb-25">
      {skills?.map((skill) => (
        <li>{skill.name}</li>
      ))}

      {/* <li className="more">3+</li> */}
    </ul>
  );
};

export default Skills;

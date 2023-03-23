import { IonItem, IonLabel } from "@ionic/react";
import { useEffect, useState } from "react";
import { Skill, SkillLevel } from "../../app/models";
import skills, { getSkillById, getSkillByLevel } from "../../data/skills";

type Props = {
  id: string;
  level: number;
  onClick?: Function;
};

const SkillItem: React.FC<Props> = (props) => {
  const [skill, setSkill] = useState<SkillLevel | null>(null);

  // load skill
  useEffect(() => {
    const found = getSkillByLevel(props.id, props.level);
    if (!found) {
      return;
    }

    setSkill(found);
  }, [props.id, props.level]);

  if (!skill) {
    return null;
  }

  return (
    <IonItem itemID={skill.id} onClick={() => props.onClick && props.onClick()}>
      <IonLabel>
        <span>{skill.name}</span>
        <p>{skill.description}</p>
      </IonLabel>
      {props.level && <IonLabel slot="end">Level {props.level}</IonLabel>}
    </IonItem>
  );
};

export default SkillItem;

import { IonItem, IonLabel } from "@ionic/react";
import { useEffect, useState } from "react";
import { Skill } from "../../app/models";
import skills, { getSkillById } from "../../data/skills";

type Props = {
  id: string;
  level?: number;
  onClick?: Function;
};

const SkillItem: React.FC<Props> = (props) => {
  const [skill, setSkill] = useState<Skill | null>(null);

  // load skill
  useEffect(() => {
    const found = getSkillById(props.id);
    setSkill(found);
  }, [props.id]);

  if (!skill) {
    return null;
  }

  return (
    <IonItem itemID={skill.id} onClick={() => props.onClick && props.onClick()}>
      <IonLabel>
        <span>{skill.name}</span>
        <p>{skill.name}</p>
      </IonLabel>
      {props.level && <IonLabel slot="end">Level {props.level}</IonLabel>}
    </IonItem>
  );
};

export default SkillItem;

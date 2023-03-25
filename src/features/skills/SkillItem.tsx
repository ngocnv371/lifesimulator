import { IonItem, IonLabel } from "@ionic/react";
import { useEffect, useState } from "react";
import { SkillLevel } from "../../app/models";
import { getSkillByLevel } from "../../data/skills";

type Props = {
  id: string;
  level: number;
  onClick?: Function;
};

const SkillItem: React.FC<Props> = (props) => {
  const [skill, setSkill] = useState<SkillLevel | null>(null);

  // load skill
  useEffect(() => {
    if (!props.id || !props.level) {
      return;
    }

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
    <>
      <IonItem
        itemID={skill.id}
        onClick={() => props.onClick && props.onClick()}
        lines="none"
      >
        <IonLabel>{skill.name}</IonLabel>
        {Boolean(props.level) && <IonLabel slot="end">Level {props.level}</IonLabel>}
      </IonItem>
      <IonItem onClick={() => props.onClick && props.onClick()}>
        <IonLabel style={{ whiteSpace: "pre-wrap" }}>
          <p>{skill.description}</p>
        </IonLabel>
      </IonItem>
    </>
  );
};

export default SkillItem;

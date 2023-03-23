import { IonItem, IonLabel, useIonAlert } from "@ionic/react";
import { useEffect, useState } from "react";
import { SkillLevel } from "../../app/models";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { getSkillByLevel } from "../../data/skills";
import { levelUp } from "./SkillsSlice";

type Props = {
  id: string;
};

const UnlockSkillItem: React.FC<Props> = (props) => {
  const money = useAppSelector((state) => state.inventory.money);
  const level = useAppSelector((state) => state.skills[props.id]);
  const [skill, setSkill] = useState<SkillLevel | null>(null);
  const [present] = useIonAlert();
  const dispatch = useAppDispatch();
  const canUnlock = skill && skill.cost <= money && !level;

  // load skill
  useEffect(() => {
    const found = getSkillByLevel(props.id, 0);
    if (!found) {
      return;
    }

    setSkill(found);
  }, [props.id]);

  function confirmUnlock() {
    if (!skill || !canUnlock) {
      return;
    }

    present({
      message: `Do you really want to unlock ${skill.name} for $${skill.cost}?`,
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Yes",
          role: "confirm",
          handler: () => {
            dispatch(levelUp(skill.id));
          },
        },
      ],
    });
  }

  if (!skill) {
    return null;
  }

  return (
    <IonItem
      disabled={!canUnlock}
      itemID={skill.id}
      onClick={() => confirmUnlock()}
    >
      <IonLabel>
        <span>{skill.name}</span>
        <p>{skill.description}</p>
      </IonLabel>
      <IonLabel slot="end" color="warning">
        ${skill.cost}
      </IonLabel>
    </IonItem>
  );
};

export default UnlockSkillItem;

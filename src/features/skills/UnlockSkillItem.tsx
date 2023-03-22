import { IonItem, IonLabel, useIonAlert } from "@ionic/react";
import { useEffect, useState } from "react";
import { Skill } from "../../app/models";
import { useAppDispatch } from "../../app/store";
import skills, {
  getDescription,
  getSkillById,
  getUnlockCost,
} from "../../data/skills";
import { levelUp } from "./SkillsSlice";

type Props = {
  id: string;
  onClick?: Function;
};

const UnlockSkillItem: React.FC<Props> = (props) => {
  const [skill, setSkill] = useState<Skill | null>(null);
  const [cost, setCost] = useState(0);
  const [description, setDescription] = useState("");
  const [present] = useIonAlert();
  const dispatch = useAppDispatch();

  // load skill
  useEffect(() => {
    const found = getSkillById(props.id);
    if (!found) {
      return;
    }

    setSkill(found);
    setCost(getUnlockCost(found));
    setDescription(getDescription(found, 0));
  }, [props.id]);

  function confirmUnlock() {
    if (!skill) {
      return;
    }

    present({
      message: `Do you really want to unlock ${skill.name} for $${cost}?`,
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
    <IonItem itemID={skill.id} onClick={() => confirmUnlock()}>
      <IonLabel>
        <span>{skill.name}</span>
        <p>{description}</p>
      </IonLabel>
      <IonLabel slot="end" color="warning">
        ${cost}
      </IonLabel>
    </IonItem>
  );
};

export default UnlockSkillItem;

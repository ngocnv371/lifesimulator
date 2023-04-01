import { IonChip, IonLabel, IonList, IonListHeader } from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import {
  selectSkillById,
  selectSkillsByTier,
  tierChanged,
} from "./SkillTreeSlice";
import SkillChip from "./SkillChip";
import { DragEventHandler, EventHandler, SyntheticEvent } from "react";
import { Skill } from "../../../app/models";

type SkillChipProps = {
  tier: number;
  selectedSkill: string;
  onSelect: (id: string) => void;
};

const SkillTierGroup: React.FC<SkillChipProps> = (props) => {
  const dispatch = useAppDispatch();
  const skills = useAppSelector(selectSkillsByTier(props.tier));
  const selectedSkill = useAppSelector(selectSkillById(props.selectedSkill));

  if (!skills) {
    return null;
  }

  const handleDrop: DragEventHandler<HTMLIonListElement> = (e) => {
    if (!e.dataTransfer) {
      return;
    }

    const id = e.dataTransfer.getData("id");
    dispatch(tierChanged({ id, tier: props.tier }));
  };

  function handleClick(item: typeof skills[0]) {
    if (!props.onSelect) {
      return;
    }

    if (item.id === props.selectedSkill) {
      props.onSelect("");
    } else {
      props.onSelect(item.id);
    }
  }

  return (
    <IonList onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      <IonListHeader>Tier {props.tier}</IonListHeader>
      {skills.map((item) => (
        <SkillChip
          key={item.id}
          id={item.id}
          name={item.name}
          selected={item.id === props.selectedSkill}
          isRequirement={
            selectedSkill &&
            selectedSkill.requiredSkills.some(
              (r) => r.toLocaleLowerCase() === item.id
            )
          }
          onClick={() => handleClick(item)}
        />
      ))}
    </IonList>
  );
};

export default SkillTierGroup;

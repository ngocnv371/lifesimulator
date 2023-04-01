import {
  IonChip,
  IonLabel,
  IonList,
  IonListHeader,
  useIonToast,
} from "@ionic/react";
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
  editMode: boolean;
  onSelect: (id: string, selected: boolean, required: boolean) => void;
};

const SkillTierGroup: React.FC<SkillChipProps> = (props) => {
  const dispatch = useAppDispatch();
  const [toast] = useIonToast();
  const skills = useAppSelector(selectSkillsByTier(props.tier));
  const selectedSkill = useAppSelector(selectSkillById(props.selectedSkill));

  if (!skills) {
    return null;
  }

  const handleDrop: DragEventHandler<HTMLIonListElement> = (e) => {
    // no dnd on Jobs
    if (props.tier > 5) {
      return;
    }

    if (!e.dataTransfer) {
      return;
    }

    const id = e.dataTransfer.getData("id");
    dispatch(tierChanged({ id, tier: props.tier }));
    toast({
      message: `'${id}' skill moved to tier ${props.tier}`,
      color: "primary",
      duration: 2000,
    });
  };

  return (
    <IonList onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      {props.tier < 6 && <IonListHeader>Tier {props.tier}</IonListHeader>}
      {props.tier === 6 && <IonListHeader>Jobs</IonListHeader>}
      {skills.map((item) => {
        const isRequired =
          selectedSkill &&
          selectedSkill.requiredSkills.some(
            (r) => r.toLocaleLowerCase() === item.id
          );
        return (
          <SkillChip
            key={item.id}
            id={item.id}
            name={item.name}
            selected={item.id === props.selectedSkill}
            isRequirement={isRequired}
            editMode={props.editMode}
            draggable={item.tier < 6}
            onClick={() =>
              props.onSelect &&
              props.onSelect(
                item.id,
                item.id === props.selectedSkill,
                Boolean(isRequired)
              )
            }
          />
        );
      })}
    </IonList>
  );
};

export default SkillTierGroup;

import { IonChip, IonLabel, IonList, IonListHeader } from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { selectSkillsByTier, tierChanged } from "./SkillTreeSlice";
import SkillChip from "./SkillChip";
import { DragEventHandler } from "react";

type SkillChipProps = {
  tier: number;
};

const SkillTierGroup: React.FC<SkillChipProps> = (props) => {
  const dispatch = useAppDispatch();
  const skills = useAppSelector(selectSkillsByTier(props.tier));
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

  return (
    <IonList onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      <IonListHeader>Tier {props.tier}</IonListHeader>
      {skills.map((item) => (
        <SkillChip key={item.id} id={item.id} name={item.name} />
      ))}
    </IonList>
  );
};

export default SkillTierGroup;

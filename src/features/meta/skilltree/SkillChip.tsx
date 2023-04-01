import { IonChip, IonLabel } from "@ionic/react";

type SkillChipProps = {
  id: string;
  name: string;
  selected?: boolean;
};

const SkillChip: React.FC<SkillChipProps> = (props) => {
  return (
    <IonChip
      draggable="true"
      onDragStart={(e) => e.dataTransfer.setData("id", props.id)}
    >
      <IonLabel>{props.name}</IonLabel>
    </IonChip>
  );
};

export default SkillChip;

import { IonChip, IonLabel } from "@ionic/react";
import { EventHandler, MouseEventHandler } from "react";

type SkillChipProps = {
  id: string;
  name: string;
  selected?: boolean;
  isRequirement?: boolean;
  onClick?: MouseEventHandler<HTMLIonChipElement>;
};

const SkillChip: React.FC<SkillChipProps> = (props) => {
  return (
    <IonChip
      draggable="true"
      color={
        props.selected ? "success" : props.isRequirement ? "secondary" : ""
      }
      onDragStart={(e) => e.dataTransfer.setData("id", props.id)}
      onClick={props.onClick}
    >
      <IonLabel>{props.name}</IonLabel>
    </IonChip>
  );
};

export default SkillChip;

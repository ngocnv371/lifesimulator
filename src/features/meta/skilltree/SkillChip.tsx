import { IonChip, IonIcon, IonLabel } from "@ionic/react";
import { close } from "ionicons/icons";
import { EventHandler, MouseEventHandler } from "react";

type SkillChipProps = {
  id: string;
  name: string;
  selected?: boolean;
  isRequirement?: boolean;
  editMode: boolean;
  draggable?: boolean;
  onClick?: MouseEventHandler<HTMLIonChipElement>;
};

const SkillChip: React.FC<SkillChipProps> = (props) => {
  return (
    <IonChip
      draggable={props.draggable}
      color={
        props.selected ? "primary" : props.isRequirement ? "secondary" : ""
      }
      onDragStart={(e) => e.dataTransfer.setData("id", props.id)}
      onClick={props.onClick}
    >
      <IonLabel>{props.name}</IonLabel>
      {props.editMode && props.isRequirement && (
        <IonIcon icon={close}></IonIcon>
      )}
    </IonChip>
  );
};

export default SkillChip;

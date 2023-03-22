import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, school } from "ionicons/icons";
import { useMemo, useState } from "react";
import { useAppSelector } from "../../app/store";
import SkillItem from "./SkillItem";
import SkillModal from "./SkillModal";

const SkillsPage: React.FC = () => {
  const levels = useAppSelector((state) => state.skills);
  const [open, setOpen] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton autoHide />
          </IonButtons>
          <IonTitle>Skills</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/skills/browse">
              <IonIcon icon={add}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {Object.keys(levels).map((id) => (
          <SkillItem
            key={id}
            id={id}
            level={levels[id]}
            onClick={() => setOpen(true)}
          />
        ))}

        <SkillModal open={open} onClosed={() => setOpen(false)} />
      </IonContent>
    </IonPage>
  );
};

export default SkillsPage;

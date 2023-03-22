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
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { school } from "ionicons/icons";
import { useState } from "react";
import SkillModal from "./SkillModal";

const SkillsPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Skills</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem onClick={() => setOpen(true)}>
          <IonLabel>
            <span>Cans Collecting</span>
            <p>You can sometimes find cans laying around</p>
          </IonLabel>
          <IonLabel slot="end">Level 1</IonLabel>
        </IonItem>
        <IonItem onClick={() => setOpen(true)}>
          <IonLabel>
            <span>Cooking</span>
            <p>You can reliably boil an egg every dozen tries</p>
          </IonLabel>
          <IonLabel slot="end">Level 1</IonLabel>
        </IonItem>
        <SkillModal open={open} onClosed={() => setOpen(false)} />
      </IonContent>
    </IonPage>
  );
};

export default SkillsPage;

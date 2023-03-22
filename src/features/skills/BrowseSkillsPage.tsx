import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import SkillModal from "./SkillModal";
import UnlockSkillModal from "./UnlockSkillModal";

const BrowseSkillsPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Browse Skills</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem onClick={() => setOpen(true)}>
          <IonLabel>
            <span>Pickpocket</span>
            <p>You can steal a key without loosing a finger</p>
          </IonLabel>
          <IonLabel slot="end">Level 1</IonLabel>
        </IonItem>
        <IonItem onClick={() => setOpen(true)}>
          <IonLabel>
            <span>Street Fight</span>
            <p>You can throw a punch without slipping</p>
          </IonLabel>
          <IonLabel slot="end">Level 1</IonLabel>
        </IonItem>
        <IonItem onClick={() => setOpen(true)}>
          <IonLabel>
            <span>Sucking</span>
            <p>You can suck without grating bloody</p>
          </IonLabel>
          <IonLabel slot="end">Level 1</IonLabel>
        </IonItem>
        <UnlockSkillModal open={open} onClosed={() => setOpen(false)} />
      </IonContent>
    </IonPage>
  );
};

export default BrowseSkillsPage;

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
import skills from "../../data/skills";
import UnlockSkillItem from "./UnlockSkillItem";
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
        {skills.map((s) => (
          <UnlockSkillItem key={s.id} id={s.id} onClick={() => setOpen(true)} />
        ))}

        <UnlockSkillModal open={open} onClosed={() => setOpen(false)} />
      </IonContent>
    </IonPage>
  );
};

export default BrowseSkillsPage;

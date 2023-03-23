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
import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../app/store";
import skills from "../../data/skills";
import UnlockSkillItem from "./UnlockSkillItem";

const BrowseSkillsPage: React.FC = () => {
  const levels = useAppSelector((state) => state.skills);
  // filter not learned skills
  const notLearnedSkils = useMemo(
    () => skills.filter((s) => !levels[s.id]),
    [levels]
  );

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
        {notLearnedSkils.map((s) => (
          <UnlockSkillItem key={s.id} id={s.id} />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default BrowseSkillsPage;

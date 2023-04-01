import {
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState, DragEventHandler, DragEvent } from "react";
import { skills as originalSkills } from "../../data/skills";
import { Skill } from "../../app/models";
import { closeCircle, download } from "ionicons/icons";
import SkillTierGroup from "./skilltree/SkillTierGroup";
import { useAppDispatch } from "../../app/store";
import { exportJSON, tier1RequirementsCleared } from "./skilltree/SkillTreeSlice";

const SkillTreePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const [skills, setSkills] = useState<Skill[]>(originalSkills);
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    if (selected) {
      console.log(selected);
    }
  }, [selected]);

  function handleExportJSON() {
    dispatch(exportJSON())
  }

  function clearTier1Requirements() {
    dispatch(tier1RequirementsCleared())
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Skill Tree</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => handleExportJSON()}>
              <IonIcon icon={download}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={() => clearTier1Requirements()}>
          Clear Tier 1 Requirements
        </IonButton>
        {[1, 2, 3, 4, 5].map((tier) => (
          <SkillTierGroup
            key={tier}
            tier={tier}
            selectedSkill={selected}
            onSelect={(id) => setSelected(id)}
          />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default SkillTreePage;

import {
  IonButton,
  IonButtons,
  IonCheckbox,
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
  useIonToast,
} from "@ionic/react";
import { useEffect, useState, DragEventHandler, DragEvent } from "react";
import { skills as originalSkills } from "../../data/skills";
import { Skill } from "../../app/models";
import { closeCircle, download, pencil } from "ionicons/icons";
import SkillTierGroup from "./skilltree/SkillTierGroup";
import { useAppDispatch } from "../../app/store";
import {
  exportJSON,
  requirementToggled,
  tier1RequirementsCleared,
} from "./skilltree/SkillTreeSlice";
import useStackedToast from "../jobs/useStackedToast";

const SkillTreePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<string>("");
  const [editMode, setEditMode] = useState(false);
  const toast = useStackedToast();

  useEffect(() => {
    if (selected) {
      console.log("skill selected", selected);
    }
  }, [selected]);

  useEffect(() => {
    console.log("edit mode", editMode);
  }, [editMode]);

  function handleExportJSON() {
    dispatch(exportJSON());
  }

  function clearTier1Requirements() {
    dispatch(tier1RequirementsCleared());
  }

  function handleSelect(id: string, isSelected: boolean, required: boolean) {
    if (!editMode) {
      setSelected(id);
      return;
    }

    if (isSelected) {
      setSelected("");
      return;
    }

    dispatch(requirementToggled({ id: selected, requirement: id }));
    if (required) {
      toast({
        message: `'${selected}' now no longer requires ${id}`,
        color: "danger",
        duration: 2000,
      });
    } else {
      toast({
        message: `'${selected}' now requires ${id}`,
        color: "primary",
        duration: 2000,
      });
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Skill Tree</IonTitle>
          <IonButtons slot="end">
            <IonItem>
              <IonCheckbox
                value={editMode}
                slot="start"
                onIonChange={(e) => setEditMode(e.detail.checked)}
              ></IonCheckbox>
              <IonLabel>Edit Mode</IonLabel>
            </IonItem>
            <IonButton onClick={() => handleExportJSON()}>
              <IonIcon slot="start" icon={download}></IonIcon>
              <IonLabel>Export</IonLabel>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={() => clearTier1Requirements()}>
          Clear Tier 1 Requirements
        </IonButton>
        <p>
          To change a skill's tier, drag and drop them to appropriate section
        </p>
        {editMode && (
          <p>In Edit Mode, select a skill, then toggle its requirements</p>
        )}
        {[1, 2, 3, 4, 5, 6].map((tier) => (
          <SkillTierGroup
            key={tier}
            tier={tier}
            editMode={editMode}
            selectedSkill={selected}
            onSelect={handleSelect}
          />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default SkillTreePage;

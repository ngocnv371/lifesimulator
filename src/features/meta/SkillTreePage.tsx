import {
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { skills as originalSkills } from "../../data/skills";
import { Skill } from "../../app/models";
import { closeCircle, download } from "ionicons/icons";

const SkillTreePage: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>(originalSkills);
  const [selected, setSelected] = useState<Skill | null>(null);

  useEffect(() => {
    if (selected) {
      console.log(selected);
    }
  }, [selected]);

  function handleExportJSON() {
    const jsonData = JSON.stringify(
      skills.sort((a, b) => a.name.localeCompare(b.name)),
      null,
      2
    );
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "skills.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function clearTier1Requirements() {
    const updated = skills.map((s) => {
      if (s.tier === 1) {
        return { ...s, requiredSkills: [] };
      }
      return s;
    });
    console.log(updated);
    setSkills(updated);
  }

  function renderTier(tier: number) {
    return skills
      .filter((s) => s.tier === tier)
      .map((s) => {
        const isActive = selected && selected.id === s.id;
        const isRequired =
          selected &&
          selected.requiredSkills.some((r) => r.toLocaleLowerCase() === s.id);
        const onClick = () => {
          if (!selected) {
            setSelected(s);
            return;
          }

          if (selected.id === s.id) {
            setSelected(null);
            return;
          }

          if (isRequired) {
            // remove this skill from `selected.requiredSkills`
            const updated = {
              ...selected,
              requiredSkills: selected.requiredSkills.filter(
                (r) => r.toLocaleLowerCase() !== s.id
              ),
            }
            setSelected(updated);
            setSkills(skills.map((t) => (t.id === selected.id ? updated : t)));
          } else {
            const updated = {
              ...selected,
              requiredSkills: selected.requiredSkills.concat(s.name),
            }
            setSelected(updated);
            setSkills(skills.map((t) => (t.id === selected.id ? updated : t)));
          }
        };
        return (
          <IonChip
            color={isActive ? "success" : isRequired ? "secondary" : ""}
            key={s.id}
            onClick={onClick}
          >
            <IonLabel>{s.name}</IonLabel>
            {isRequired && <IonIcon icon={closeCircle}></IonIcon>}
          </IonChip>
        );
      });
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
        <h1>Tier 1</h1>
        {renderTier(1)}
        <h1>Tier 2</h1>
        {renderTier(2)}
        <h1>Tier 3</h1>
        {renderTier(3)}
        <h1>Tier 4</h1>
        {renderTier(4)}
        <h1>Tier 5</h1>
        {renderTier(5)}
      </IonContent>
    </IonPage>
  );
};

export default SkillTreePage;

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonModal,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { SkillLevel } from "../../app/models";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { formatCurrency } from "../../app/utils";
import { getSkillByLevel } from "../../data/skills";
import SkillItem from "./SkillItem";
import { levelUp } from "./SkillsSlice";

type Props = {
  id: string;
  onClosed?: Function;
};

const UpgradeSkillModal: React.FC<Props> = (props) => {
  const money = useAppSelector((state) => state.inventory.money);
  const modal = useRef<HTMLIonModalElement>(null);
  const level = useAppSelector((state) => state.skills[props.id]);
  const [skill, setSkill] = useState<SkillLevel | null>(null);
  const [nextLevel, setNextLevel] = useState<SkillLevel | null>(null);
  const dispatch = useAppDispatch();
  const canLevelUp = skill && skill.canLevelUp && skill.cost <= money;

  // load skill
  useEffect(() => {
    if (!props.id || !level) {
      return;
    }

    console.log("[UpgradeSkillModal] loading skill level", {
      id: props.id,
      level,
    });
    const found = getSkillByLevel(props.id, level);
    if (!found) {
      return;
    }

    setSkill(found);
    setNextLevel(getSkillByLevel(props.id, level + 1));
  }, [props.id, level]);

  // open/close
  useEffect(() => {
    if (props.id) {
      console.log("[UpgradeSkillModal] present");
      modal.current?.present();
    } else if (modal.current?.isOpen) {
      console.log("[UpgradeSkillModal] dismiss");
      modal.current?.dismiss();
    }
  }, [props.id]);

  function handleUpgrade() {
    if (!skill) {
      return;
    }

    console.log("[UpgradeSkillModal] level up", skill.id);
    dispatch(levelUp(skill.id));
  }

  return (
    <IonModal
      ref={modal}
      onWillDismiss={() => props.onClosed && props.onClosed()}
      initialBreakpoint={0.5}
      breakpoints={[0, 0.5, 0.75]}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>{(skill && skill.name) || <IonSkeletonText />}</IonTitle>
          <IonButtons slot="end">
            <IonButton
              disabled={!canLevelUp}
              onClick={() => handleUpgrade()}
              color="warning"
            >
              Upgrade
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {skill && (
        <IonContent>
          <IonItem lines="none">
            <IonLabel>Current Level</IonLabel>
            <IonLabel slot="end">Level {skill.level}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel style={{ whiteSpace: "pre-wrap" }}>
              <p>{skill.description}</p>
            </IonLabel>
          </IonItem>
          {skill.canLevelUp && nextLevel && (
            <>
              <IonItem lines="none">
                <IonLabel>Next Level</IonLabel>
                <IonLabel slot="end">Level {nextLevel.level}</IonLabel>
              </IonItem>
              {skill.description !== nextLevel.description && (
                <IonItem>
                  <IonLabel style={{ whiteSpace: "pre-wrap" }}>
                    <p>{nextLevel.description}</p>
                  </IonLabel>
                </IonItem>
              )}
              <IonItem>
                <IonLabel>Upgrade cost</IonLabel>
                <IonLabel slot="end" color="warning">
                  {formatCurrency(skill.cost)}
                </IonLabel>
              </IonItem>
            </>
          )}
        </IonContent>
      )}
    </IonModal>
  );
};

export default UpgradeSkillModal;

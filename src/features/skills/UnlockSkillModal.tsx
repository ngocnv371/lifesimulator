import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useRef } from "react";

type Props = {
  open?: Boolean;
  onClosed?: Function;
};

const UnlockSkillModal: React.FC<Props> = (props) => {
  const modal = useRef<HTMLIonModalElement>(null);

  // handle open/close
  useEffect(() => {
    if (props.open) {
      modal.current?.present();
    } else {
      modal.current?.dismiss();
    }
  }, [props.open]);

  return (
    <IonModal
      ref={modal}
      onWillDismiss={() => props.onClosed && props.onClosed()}
      initialBreakpoint={0.5}
      breakpoints={[0, 0.5, 0.75]}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Skill 1</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => modal.current?.dismiss()} color="warning">
              Unlock
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel>
            <p>You may able to boil an egg without breaking it, twice</p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Unlock cost</IonLabel>
          <IonLabel slot="end" color="warning">
            $200
          </IonLabel>
        </IonItem>
      </IonContent>
    </IonModal>
  );
};

export default UnlockSkillModal;

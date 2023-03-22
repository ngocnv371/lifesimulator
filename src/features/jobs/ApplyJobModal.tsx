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

const ApplyJobModal: React.FC<Props> = (props) => {
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
          <IonTitle>Job 1</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => modal.current?.dismiss()} color="warning">
              Apply
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel>
            Delivery
            <p>Go deliver this package to that location</p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Pay</IonLabel>
          <IonLabel slot="end" color="warning">
            $20
          </IonLabel>
        </IonItem>
      </IonContent>
    </IonModal>
  );
};

export default ApplyJobModal;

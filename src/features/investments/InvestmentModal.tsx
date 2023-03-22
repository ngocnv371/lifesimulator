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

const InvestmentModal: React.FC<Props> = (props) => {
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
          <IonTitle>Big Company 1 Stock</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => modal.current?.dismiss()} color="warning">
              Invest
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel>Current Level</IonLabel>
          <IonLabel slot="end">Level 1</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <p>$5000 deposits</p>
          </IonLabel>
          <IonLabel slot="end" color="warning">
            $234
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Next Level</IonLabel>
          <IonLabel slot="end">Level 2</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <p>$8000 deposits</p>
          </IonLabel>
          <IonLabel slot="end" color="warning">
            $234
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Invest cost</IonLabel>
          <IonLabel slot="end" color="warning">
            $1000
          </IonLabel>
        </IonItem>
      </IonContent>
    </IonModal>
  );
};

export default InvestmentModal;

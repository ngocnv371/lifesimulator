import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, school } from "ionicons/icons";
import { useState } from "react";
import InvestmentModal from "./InvestmentModal";

const InvestmentsPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Investments</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/investments/browse">
              <IonIcon icon={add}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem onClick={() => setOpen(true)}>
          <IonLabel>
            <span>Big Company 1 Stock</span>
            <p>Making big stuff to sells</p>
          </IonLabel>
          <IonLabel slot="end" color="warning">
            $300
          </IonLabel>
        </IonItem>
        <IonItem onClick={() => setOpen(true)}>
          <IonLabel>
            <span>Savings</span>
            <p>Put this away for a rainy day</p>
          </IonLabel>
          <IonLabel slot="end" color="warning">
            $234
          </IonLabel>
        </IonItem>
        <InvestmentModal open={open} onClosed={() => setOpen(false)} />
      </IonContent>
      <IonFooter>
        <IonItem>
          <IonLabel>
            <span>Total Returns</span>
            <p>From all investments</p>
          </IonLabel>
          <IonLabel slot="end" color="warning">
            $23,233
          </IonLabel>
        </IonItem>
      </IonFooter>
    </IonPage>
  );
};

export default InvestmentsPage;

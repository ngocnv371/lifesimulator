import {
  IonBackButton,
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

const BrowseInvestmentsPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Browse Investments</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem onClick={() => setOpen(true)}>
          <IonLabel>
            <span>Big Company 2 Stock</span>
            <p>Making big stuff to sells</p>
          </IonLabel>
          <IonLabel slot="end" color="warning">
            $300
          </IonLabel>
        </IonItem>
        <IonItem onClick={() => setOpen(true)}>
          <IonLabel>
            <span>Bitcoins</span>
            <p>Hot stuff right now</p>
          </IonLabel>
          <IonLabel slot="end" color="warning">
            $100
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
        <IonItem onClick={() => setOpen(true)}>
          <IonLabel>
            <span>Real Estate</span>
            <p>We need something solid</p>
          </IonLabel>
          <IonLabel slot="end" color="warning">
            $1234
          </IonLabel>
        </IonItem>
        <IonItem onClick={() => setOpen(true)}>
          <IonLabel>
            <span>Index Fund</span>
            <p>Can't go wrong with this</p>
          </IonLabel>
          <IonLabel slot="end" color="warning">
            $334
          </IonLabel>
        </IonItem>
        <InvestmentModal open={open} onClosed={() => setOpen(false)} />
      </IonContent>
      <IonFooter>
        <IonItem>
          <IonLabel>
            <span>Your Capital</span>
            <p>From liquid assets</p>
          </IonLabel>
          <IonLabel slot="end" color="warning">
            $566
          </IonLabel>
        </IonItem>
      </IonFooter>
    </IonPage>
  );
};

export default BrowseInvestmentsPage;

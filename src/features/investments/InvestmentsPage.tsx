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
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, school } from "ionicons/icons";
import { useState } from "react";
import { useAppSelector } from "../../app/store";
import InvestmentItem from "./InvestmentItem";
import InvestmentModal from "./InvestmentModal";

const InvestmentsPage: React.FC = () => {
  const investments = useAppSelector((state) => state.investments);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const keys = Object.keys(investments);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton autoHide />
          </IonButtons>
          <IonTitle>Investments</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/investments/browse">
              <IonIcon icon={add}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {keys.map((k) => (
          <InvestmentItem id={k} key={k} onClick={() => setSelectedId(k)} />
        ))}
        {!keys.length && (
          <IonItem>
            <IonLabel>You haven't invested in anything yet</IonLabel>
          </IonItem>
        )}

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

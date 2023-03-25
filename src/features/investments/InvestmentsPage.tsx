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
import { formatCurrency } from "../../app/utils";
import CurrentMoneyItem from "../inventory/CurrentMoneyItem";
import InvestmentItem from "./InvestmentItem";
import InvestmentModal from "./InvestmentModal";

const InvestmentsPage: React.FC = () => {
  const investments = useAppSelector((state) => state.investments);
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
            <IonButton routerLink="/investments/browse/all">
              <IonIcon icon={add}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {keys.map((k) => (
          <InvestmentItem
            id={k}
            key={k}
            routerLink={`/investments/${k}`}
          />
        ))}
        {!keys.length && (
          <IonItem>
            <IonLabel>You haven't invested in anything yet</IonLabel>
          </IonItem>
        )}
      </IonContent>
      <IonFooter>
        <CurrentMoneyItem />
      </IonFooter>
    </IonPage>
  );
};

export default InvestmentsPage;

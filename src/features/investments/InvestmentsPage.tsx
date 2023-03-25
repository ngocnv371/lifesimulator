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

const InvestmentsPage: React.FC = () => {
  const investments = useAppSelector((state) => state.investments);
  const mine = investments.filter(i => i.invested > 0);

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
        {mine.map((k) => (
          <InvestmentItem
            id={k.id}
            key={k.id}
            routerLink={`/investments/${k.id}`}
          />
        ))}
        {!mine.length && (
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

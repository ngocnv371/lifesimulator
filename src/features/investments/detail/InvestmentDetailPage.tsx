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
  IonSegment,
  IonSegmentButton,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import { useAppSelector } from "../../../app/store";
import CurrentMoneyItem from "../../inventory/CurrentMoneyItem";
import { selectInvestmentById } from "../InvestmentsSlice";
import InvestmentDetail from "./InvestmentDetail";

const InvestmentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const item = useAppSelector(selectInvestmentById(id));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{item ? item.name : <IonSkeletonText />}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>{item && <InvestmentDetail id={id} />}</IonContent>
      <IonFooter>
        <CurrentMoneyItem />
      </IonFooter>
    </IonPage>
  );
};

export default InvestmentDetailPage;

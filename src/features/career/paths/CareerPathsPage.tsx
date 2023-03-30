import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { formatCurrency } from "../../../app/utils";
import { jobs } from "../../../data/jobs";

const CareerPathsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Career Paths</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {jobs.map((s) => (
          <IonItem key={s.id} id={s.id} routerLink={`/career/paths/${s.id}`} detail={true}>
            <IonLabel>{s.name}</IonLabel>
            <IonLabel color="warning" slot="end">
              {formatCurrency(s.salary)}
            </IonLabel>
          </IonItem>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default CareerPathsPage;

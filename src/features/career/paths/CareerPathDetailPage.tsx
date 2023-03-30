import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import { formatCurrency } from "../../../app/utils";
import { jobs } from "../../../data/jobs";
import useJobLoader from "../../jobs/useJobLoader";

const CareerPathDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const job = useJobLoader(id);
  if (!job) {
    return null;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Career Path Detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonLabel>{job.name}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Average Salary</IonLabel>
          <IonLabel color="warning" slot="end">
            {formatCurrency(job.salary)}
          </IonLabel>
        </IonItem>
        <IonListHeader>
            Required Skills
        </IonListHeader>
        {Object.keys(job.requiredSkills).map((name) => (
          <IonItem key={name} detail={true}>
            <IonLabel>{name}</IonLabel>
          </IonItem>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default CareerPathDetailPage;

import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, school, search } from "ionicons/icons";
import { useState } from "react";
import ApplyJobModal from "./ApplyJobModal";

const JobPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Your Job</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/job/browse">
              <IonIcon icon={search}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonLabel>
            <span>Cans Collector</span>
            <p>Go find some cans</p>
          </IonLabel>
          <IonLabel slot="end">Level 1</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <span>Pay</span>
          </IonLabel>
          <IonLabel slot="end" color="warning">
            $20
          </IonLabel>
        </IonItem>
        <IonItem color="danger">
          <IonLabel>Quit</IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default JobPage;

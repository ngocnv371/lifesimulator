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
  useIonToast,
} from "@ionic/react";
import { add, cash, school, search } from "ionicons/icons";
import { useState } from "react";
import ApplyJobModal from "./ApplyJobModal";

const JobPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [present, dismiss] = useIonToast();

  function work() {
    dismiss();
    present({
      message: "+$20",
      color: "success",
      duration: 1500,
      animated: true,
      icon: cash,
      position: "bottom",
    });
  }

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
        <IonButton
          className="ion-margin"
          size="large"
          expand="block"
          onClick={() => work()}
        >
          Work
        </IonButton>
      </IonContent>
      <IonFooter>
        <IonItem>
          <IonLabel color="danger">Quit</IonLabel>
        </IonItem>
      </IonFooter>
    </IonPage>
  );
};

export default JobPage;

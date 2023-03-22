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
  useIonRouter,
} from "@ionic/react";
import { add, school } from "ionicons/icons";
import { useState } from "react";
import ApplyJobModal from "./ApplyJobModal";

const BrowseJobsPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const router = useIonRouter();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Browse Jobs</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/skills/browse">
              <IonIcon icon={add}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem onClick={() => setOpen(true)}>
          <IonLabel>
            <span>Cans Collector</span>
            <p>Go find some cans</p>
          </IonLabel>
          <IonLabel slot="end">Level 1</IonLabel>
        </IonItem>
        <IonItem onClick={() => setOpen(true)}>
          <IonLabel>
            <span>Delivery</span>
            <p>Delivery not suspicious packages to not suspicious locations</p>
          </IonLabel>
          <IonLabel slot="end">Level 1</IonLabel>
        </IonItem>
        <ApplyJobModal
          open={open}
          onClosed={() => {
            setOpen(false);
            router.goBack();
          }}
        />
      </IonContent>
    </IonPage>
  );
};

export default BrowseJobsPage;

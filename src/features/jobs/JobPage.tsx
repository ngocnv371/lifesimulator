import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonChip,
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
  useIonToast,
} from "@ionic/react";
import { add, cash, school, search, time } from "ionicons/icons";
import { useState } from "react";
import { useAppSelector } from "../../app/store";
import ApplyJobModal from "./ApplyJobModal";
import { selectJob } from "./JobSlice";
import UnemployedItem from "./UnemployedItem";

const JobPage: React.FC = () => {
  const job = useAppSelector(selectJob);
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
          <IonButtons slot="start">
            <IonMenuButton autoHide />
          </IonButtons>
          <IonTitle>Your Job</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/job/browse">
              <IonIcon icon={search}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {!job && <UnemployedItem />}
        {job && (
          <>
            <IonItem lines="none">
              <IonLabel>
                <span>Cans Collector</span>
              </IonLabel>
            </IonItem>
            <IonItem>
              <p>Go find some cans</p>
            </IonItem>
            <IonItem>
              <IonLabel>Shift length</IonLabel>
              <IonLabel slot="end">
                <IonChip>
                  <IonIcon icon={time} />
                  <IonLabel>{job.shiftLength} hours</IonLabel>
                </IonChip>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Pay</IonLabel>
              <IonLabel slot="end" color="warning">
                ${job.salary}
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
          </>
        )}
      </IonContent>
      {job && (
        <IonFooter>
          <IonItem>
            <IonLabel color="danger">Quit</IonLabel>
          </IonItem>
        </IonFooter>
      )}
    </IonPage>
  );
};

export default JobPage;

import {
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { cash, help, search, time } from "ionicons/icons";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { formatCurrency } from "../../app/utils";
import { quit, selectJob } from "./JobSlice";
import UnemployedItem from "./UnemployedItem";
import useStackedToast from "./useStackedToast";

const JobPage: React.FC = () => {
  const job = useAppSelector(selectJob);
  const present = useStackedToast();
  const dispatch = useAppDispatch();
  const [alert] = useIonAlert();

  function handleWork() {
    present({
      message: `+$20`,
      color: "success",
      duration: 1000,
      animated: true,
      icon: cash,
      position: "bottom",
    });
  }

  function handleQuit() {
    alert({
      message: "Do you really want to quit your job?",
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Yes",
          role: "destructive",
          handler: () => {
            dispatch(quit());
          },
        },
      ],
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
            <IonButton routerLink="/career/paths">
              <IonIcon icon={help}></IonIcon>
            </IonButton>
            <IonButton routerLink="/career/jobs">
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
                {formatCurrency(job.salary)}
              </IonLabel>
            </IonItem>
            <IonButton
              className="ion-margin"
              size="large"
              expand="block"
              onClick={() => handleWork()}
            >
              Work
            </IonButton>
          </>
        )}
      </IonContent>
      {job && (
        <IonFooter>
          <IonItem onClick={() => handleQuit()}>
            <IonLabel color="danger">Quit</IonLabel>
          </IonItem>
        </IonFooter>
      )}
    </IonPage>
  );
};

export default JobPage;

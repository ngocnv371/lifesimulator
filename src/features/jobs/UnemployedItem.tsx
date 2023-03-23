import { IonIcon, IonItem, IonItemOption, IonLabel } from "@ionic/react";
import { search } from "ionicons/icons";

const UnemployedItem: React.FC = () => {
  return (
    <>
      <IonItem>
        <IonLabel color="warning">
          <span>You're unemployed</span>
          <p>Do something about it</p>
        </IonLabel>
      </IonItem>
      <IonItem routerLink="/job/browse">
        <IonLabel>Find a job</IonLabel>
        <IonIcon color="primary" slot="end" icon={search}></IonIcon>
      </IonItem>
    </>
  );
};

export default UnemployedItem;

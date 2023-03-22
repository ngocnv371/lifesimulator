import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { checkmark } from "ionicons/icons";

const CharacterCreationPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Character Creation</IonTitle>
          <IonButtons slot="primary">
            <IonButton>
              <IonIcon icon={checkmark}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonLabel>???</IonLabel>
          </IonCardHeader>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CharacterCreationPage;

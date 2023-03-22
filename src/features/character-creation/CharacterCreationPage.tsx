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
import { checkmark } from "ionicons/icons";
import { useState } from "react";

const CharacterCreationPage: React.FC = () => {
  const [name, setName] = useState("");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Character Creation</IonTitle>
          <IonButtons slot="primary">
            <IonButton routerLink="/skills">
              <IonIcon icon={checkmark}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonLabel position="stacked">What's your name?</IonLabel>
          <IonInput
            value={name}
            type="text"
            onIonChange={(e) => setName(e.detail.value!)}
            placeholder="Your name"
          />
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default CharacterCreationPage;

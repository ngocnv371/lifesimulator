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
import { school } from "ionicons/icons";

const SkillsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Skills</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonLabel>
            <span>Cans Collecting</span>
            <p>You can sometimes find cans laying around</p>
          </IonLabel>
          <IonLabel slot="end">Level 1</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <span>Cooking</span>
            <p>You can reliably boil an egg every dozen tries</p>
          </IonLabel>
          <IonLabel slot="end">Level 1</IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default SkillsPage;

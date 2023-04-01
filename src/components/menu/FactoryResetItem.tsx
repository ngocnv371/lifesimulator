import {
  IonIcon,
  IonItem,
  IonLabel,
  IonMenuToggle,
  useIonToast,
} from "@ionic/react";
import { refresh } from "ionicons/icons";
import { persistor } from "../../app/store";

const FactoryResetItem: React.FC = () => {
  const [toast] = useIonToast();

  async function handleClick() {
    await persistor.purge();
    await toast({
      message: "Data reseted",
      duration: 2000,
      color: "warning",
    });
    window.location.reload();
  }

  return (
    <IonMenuToggle autoHide={false}>
      <IonItem onClick={() => handleClick()}>
        <IonIcon slot="start" icon={refresh} color="danger"></IonIcon>
        <IonLabel color="danger">Factory Reset</IonLabel>
      </IonItem>
    </IonMenuToggle>
  );
};

export default FactoryResetItem;

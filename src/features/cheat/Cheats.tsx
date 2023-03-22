import {
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuToggle,
} from "@ionic/react";
import { bugOutline } from "ionicons/icons";
import { useAppDispatch } from "../../app/store";
import { addMoney } from "../inventory/InventorySlice";

const Cheats: React.FC = () => {
  const dispatch = useAppDispatch();
  function cheatMoney(amount: number) {
    dispatch(addMoney(amount));
  }

  return (
    <IonList id="cheats-list">
      <IonListHeader>Cheats</IonListHeader>
      <IonMenuToggle autoHide={false}>
        <IonItem lines="none" onClick={() => cheatMoney(100)}>
          <IonIcon aria-hidden="true" slot="start" icon={bugOutline} />
          <IonLabel>+$100</IonLabel>
        </IonItem>
      </IonMenuToggle>
      <IonMenuToggle autoHide={false}>
        <IonItem lines="none" onClick={() => cheatMoney(1000)}>
          <IonIcon aria-hidden="true" slot="start" icon={bugOutline} />
          <IonLabel>+$1000</IonLabel>
        </IonItem>
      </IonMenuToggle>
      <IonMenuToggle autoHide={false}>
        <IonItem lines="none" onClick={() => cheatMoney(10000)}>
          <IonIcon aria-hidden="true" slot="start" icon={bugOutline} />
          <IonLabel>+$10000</IonLabel>
        </IonItem>
      </IonMenuToggle>
    </IonList>
  );
};

export default Cheats;

import { IonItem, IonLabel } from "@ionic/react";
import { useAppSelector } from "../../app/store";
import { formatCurrency } from "../../app/utils";

const CurrentMoneyItem: React.FC = () => {
  const money = useAppSelector((state) => state.inventory.money);

  return (
    <IonItem>
      <IonLabel>
        <span>Your Capital</span>
        <p>From liquid assets</p>
      </IonLabel>
      <IonLabel slot="end" color="warning">
        {formatCurrency(money)}
      </IonLabel>
    </IonItem>
  );
};

export default CurrentMoneyItem;

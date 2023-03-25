import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useId, useRef, useState } from "react";
import config from "../../../app/config";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { formatCurrency } from "../../../app/utils";
import { selectInvestmentById, withdraw } from "../InvestmentsSlice";

type Props = {
  id: string;
  onClosed?: Function;
};

const WithdrawButton: React.FC<Props> = (props) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const item = useAppSelector(selectInvestmentById(props.id));
  const money = useAppSelector((state) => state.inventory.money);
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(0);
  const elementId = useId();

  function handleConfirm() {
    if (!item || !amount) {
      return;
    }

    dispatch(withdraw({ id: item.id, amount }));
    modal.current?.dismiss();
  }

  if (!item) {
    return null;
  }

  const fee = Math.ceil((amount * config.investment.agencyCutPercentage) / 100);
  const total = fee + amount;

  return (
    <>
      <IonButton
        disabled={!item || !amount || item.invested - fee - amount < item.minAmount}
        id={elementId}
        className="ion-margin"
        size="large"
        expand="block"
      >
        Withdraw
      </IonButton>
      <IonModal
        ref={modal}
        onWillDismiss={() => props.onClosed && props.onClosed()}
        trigger={elementId}
        initialBreakpoint={0.5}
        breakpoints={[0, 0.5, 0.75]}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Withdraw</IonTitle>
            <IonButtons slot="end">
              <IonButton
                disabled={item.invested - total < item.minAmount}
                onClick={() => handleConfirm()}
                color="warning"
              >
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        {item && (
          <IonContent>
            <IonItem>
              <IonLabel position="stacked">Amount</IonLabel>
              <IonInput
                type="number"
                placeholder="Enter withdraw amount"
                min={item.minAmount}
                max={money}
                value={amount}
                onIonChange={(e) =>
                  setAmount(+(e.detail.value || item.minAmount))
                }
              />
            </IonItem>
            <IonItem>
              <IonLabel>Transaction Fee</IonLabel>
              <IonLabel slot="end" color="warning">
                {formatCurrency(fee)}
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Total</IonLabel>
              <IonLabel slot="end" color="warning">
                {formatCurrency(total)}
              </IonLabel>
            </IonItem>
          </IonContent>
        )}
      </IonModal>
    </>
  );
};

export default WithdrawButton;

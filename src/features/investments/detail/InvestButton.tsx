import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useId, useRef, useState } from "react";
import config from "../../../app/config";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { formatCurrency } from "../../../app/utils";
import LongTextItem from "../../../components/LongTextItem";
import { invest, selectInvestmentById } from "../InvestmentsSlice";

type Props = {
  id: string;
  onClosed?: Function;
};

const InvestButton: React.FC<Props> = (props) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const item = useAppSelector(selectInvestmentById(props.id));
  const money = useAppSelector((state) => state.inventory.money);
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(0);
  const elementId = useId();

  // set default amount
  useEffect(() => {
    if (item) {
      setAmount(item.minAmount);
    }
  }, [item?.minAmount]);

  function handleConfirm() {
    if (!item || !amount) {
      return;
    }

    dispatch(invest({ id: item.id, amount }));
    modal.current?.dismiss();
  }

  if (!item) {
    return null;
  }

  const fee = Math.ceil(
    (amount * config.investment.agencyCutPercentage) / 100
  );
  const total = fee + amount;

  return (
    <>
      <IonButton
        disabled={!item || money < item.minAmount}
        id={elementId}
        className="ion-margin"
        size="large"
        expand="block"
      >
        Invest
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
            <IonTitle>Invest</IonTitle>
            <IonButtons slot="end">
              <IonButton
                disabled={amount < item.minAmount || money < total}
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
                placeholder="Enter invest amount"
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

export default InvestButton;

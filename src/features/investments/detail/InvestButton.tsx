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
import { useAppDispatch, useAppSelector } from "../../../app/store";
import LongTextItem from "../../../components/LongTextItem";
import { invest } from "../InvestmentsSlice";
import useInvestment from "../useInvestment";

type Props = {
  id: string;
  onClosed?: Function;
};

const InvestButton: React.FC<Props> = (props) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const item = useInvestment(props.id);
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

  return (
    <>
      <IonButton
        disabled={!item}
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
                disabled={amount < item.minAmount}
                onClick={() => handleConfirm()}
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
          </IonContent>
        )}
      </IonModal>
    </>
  );
};

export default InvestButton;

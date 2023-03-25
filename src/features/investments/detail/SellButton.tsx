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
  const elementId = useId();

  function handleConfirm() {
    if (!item || !amount) {
      return;
    }

    dispatch(withdraw({ id: item.id, amount }));
    modal.current?.dismiss();
  }

  if (!item || item.type !== "estate") {
    return null;
  }

  const amount = item.invested;

  const fee = Math.ceil((amount * config.investment.agencyCutPercentage) / 100);
  const tax = Math.ceil((amount * config.investment.salesTaxPercentage) / 100);
  const total = amount - fee - tax;

  return (
    <>
      <IonButton
        disabled={!item || !item.invested}
        id={elementId}
        className="ion-margin"
        size="large"
        expand="block"
      >
        Sell
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
            <IonTitle>Sell</IonTitle>
            <IonButtons slot="end">
              <IonButton
                disabled={!item.invested}
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
              <IonLabel>Sell Price</IonLabel>
              <IonLabel slot="end" color="warning"> {formatCurrency(item.invested)}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Transaction Fee ({config.investment.agencyCutPercentage}%)</IonLabel>
              <IonLabel slot="end" color="warning">
                {formatCurrency(fee)}
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Sales Tax ({config.investment.salesTaxPercentage}%)</IonLabel>
              <IonLabel slot="end" color="warning">
                {formatCurrency(tax)}
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

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

const BuyButton: React.FC<Props> = (props) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const item = useAppSelector(selectInvestmentById(props.id));
  const money = useAppSelector((state) => state.inventory.money);
  const dispatch = useAppDispatch();
  const elementId = useId();

  function handleConfirm() {
    if (!item || !amount) {
      return;
    }

    dispatch(invest({ id: item.id, amount }));
    modal.current?.dismiss();
  }

  if (!item || item.type !== "estate") {
    return null;
  }

  const amount = item.minAmount;

  const fee = Math.ceil((amount * config.investment.estateAgencyCutPercentage) / 100);
  const tax = Math.ceil((amount * config.investment.salesTaxPercentage) / 100);
  const total = fee + amount + tax;

  return (
    <>
      <IonButton
        disabled={!item || money < item.minAmount}
        id={elementId}
        className="ion-margin"
        size="large"
        expand="block"
      >
        Buy
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
            <IonTitle>Buy</IonTitle>
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
              <IonLabel>Listed Price</IonLabel>
              <IonLabel slot="end" color="warning">
                {formatCurrency(amount)}
              </IonLabel>
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

export default BuyButton;

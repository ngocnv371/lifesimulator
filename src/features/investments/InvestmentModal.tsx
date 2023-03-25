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
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../app/store";
import { formatCurrency } from "../../app/utils";
import useInvestment from "./useInvestment";

type Props = {
  id?: string;
  onClosed?: Function;
};

const InvestmentModal: React.FC<Props> = (props) => {
  const item = useInvestment(props.id || "");
  const amount = useAppSelector((state) => state.investments[props.id || ""]);
  const modal = useRef<HTMLIonModalElement>(null);
  const [deposit, setDeposit] = useState(item?.minAmount);

  // handle open/close
  useEffect(() => {
    if (props.id) {
      modal.current?.present();
    } else {
      modal.current?.dismiss();
    }
  }, [props.id]);

  return (
    <IonModal
      ref={modal}
      onWillDismiss={() => props.onClosed && props.onClosed()}
      initialBreakpoint={0.5}
      breakpoints={[0, 0.5, 0.75]}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Big Company 1 Stock</IonTitle>
        </IonToolbar>
      </IonHeader>
      {item && (
        <IonContent>
          <IonItem>
            <IonLabel>{item.name}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Minimum Amount</IonLabel>
            <IonLabel slot="end" color="warning">
              {formatCurrency(item.minAmount)}
            </IonLabel>
          </IonItem>
          {amount && (
            <IonItem>
              <IonLabel>Invested</IonLabel>
              <IonLabel slot="end">{formatCurrency(amount)}</IonLabel>
            </IonItem>
          )}
          {!amount && (
            <IonItem>
              <IonText color="warning">
                You haven't invested in this business yet
              </IonText>
            </IonItem>
          )}
          <IonItem>
            <IonLabel>Deposit</IonLabel>
            <IonInput
              type="number"
              placeholder="Enter your deposit"
              value={deposit}
              onIonChange={(e) => setDeposit(+(e.detail.value || 0))}
            />
          </IonItem>
          <IonItem>
            <IonButton
              className="ion-margin"
              onClick={() => modal.current?.dismiss()}
              color="warning"
            >
              Invest
            </IonButton>
          </IonItem>
        </IonContent>
      )}
    </IonModal>
  );
};

export default InvestmentModal;

import { IonItem, IonLabel, IonText } from "@ionic/react";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/store";
import { formatCurrency } from "../../../app/utils";
import LongTextItem from "../../../components/LongTextItem";
import useInvestment from "../useInvestment";
import InvestButton from "./InvestButton";

type Props = {
  id: string;
  onClick?: Function;
};

const InvestmentDetail: React.FC<Props> = (props) => {
  const amount = useAppSelector((state) => state.investments[props.id]);
  const item = useInvestment(props.id);

  if (!item) {
    return null;
  }

  return (
    <>
      <IonItem>
        <IonLabel>
          <span>{item.name}</span>
        </IonLabel>
      </IonItem>
      <LongTextItem>
        <p>{item.description}</p>
      </LongTextItem>
      {amount && (
        <IonItem>
          <IonLabel>Invested</IonLabel>
          <IonLabel slot="end" color="warning">
            {formatCurrency(amount)}
          </IonLabel>
        </IonItem>
      )}
      <IonItem>
        <IonLabel>Minimum Amount</IonLabel>
        <IonLabel slot="end" color="warning">
          {formatCurrency(item.minAmount)}
        </IonLabel>
      </IonItem>
      <InvestButton id={item.id} />
    </>
  );
};

export default InvestmentDetail;

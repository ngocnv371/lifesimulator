import { IonItem, IonLabel, IonText } from "@ionic/react";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/store";
import { formatCurrency } from "../../app/utils";
import LongTextItem from "../../components/LongTextItem";
import useInvestment from "./useInvestment";

type Props = {
  id: string;
} & {
  [key: string]: any;
};

const InvestmentItem: React.FC<Props> = (props) => {
  const amount = useAppSelector((state) => state.investments[props.id]);
  const item = useInvestment(props.id);

  if (!item) {
    return null;
  }

  return (
    <>
      <IonItem {...props}>
        <IonLabel>
          <span>{item.name}</span>
        </IonLabel>
        <IonLabel slot="end" color="warning">
          {formatCurrency(amount)}
        </IonLabel>
      </IonItem>
      <LongTextItem {...props}>
        <p>{item.description}</p>
      </LongTextItem>
    </>
  );
};

export default InvestmentItem;

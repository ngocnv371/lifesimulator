import { IonItem, IonLabel, IonText } from "@ionic/react";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/store";
import { formatCurrency } from "../../app/utils";
import LongTextItem from "../../components/LongTextItem";
import { selectInvestmentById } from "./InvestmentsSlice";

type Props = {
  id: string;
} & {
  [key: string]: any;
};

const InvestmentItem: React.FC<Props> = (props) => {
  const item = useAppSelector(selectInvestmentById(props.id));

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
          {formatCurrency(item.invested)}
        </IonLabel>
      </IonItem>
      <LongTextItem {...props}>
        <p>{item.description}</p>
      </LongTextItem>
    </>
  );
};

export default InvestmentItem;

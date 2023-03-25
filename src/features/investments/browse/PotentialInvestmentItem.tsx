import { IonItem, IonLabel } from "@ionic/react";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../../app/utils";
import LongTextItem from "../../../components/LongTextItem";
import useInvestment from "../useInvestment";

type Props = {
  id: string;
} & {
  [key: string]: any;
};

const PotentialInvestmentItem: React.FC<Props> = (props) => {
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
          {formatCurrency(item.minAmount)}
        </IonLabel>
      </IonItem>
      <LongTextItem {...props}>
        <p>{item.description}</p>
      </LongTextItem>
    </>
  );
};

export default PotentialInvestmentItem;

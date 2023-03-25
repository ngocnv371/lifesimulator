import { IonItem, IonLabel, IonText } from "@ionic/react";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/store";
import { formatCurrency } from "../../../app/utils";
import LongTextItem from "../../../components/LongTextItem";
import { selectInvestmentById } from "../InvestmentsSlice";
import ProfitChart from "../ProfitChart";
import InvestButton from "./InvestButton";
import WithdrawButton from "./WithdrawButton";

type Props = {
  id: string;
  onClick?: Function;
};

const InvestmentDetail: React.FC<Props> = (props) => {
  const item = useAppSelector(selectInvestmentById(props.id));

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
      {Boolean(item.invested) && (
        <IonItem>
          <IonLabel>Invested</IonLabel>
          <IonLabel slot="end" color="warning">
            {formatCurrency(item.invested)}
          </IonLabel>
        </IonItem>
      )}
      <IonItem>
        <IonLabel>Minimum Amount</IonLabel>
        <IonLabel slot="end" color="warning">
          {formatCurrency(item.minAmount)}
        </IonLabel>
      </IonItem>
      <ProfitChart id={item.id} />
      <InvestButton id={item.id} />
      <WithdrawButton id={item.id} />
    </>
  );
};

export default InvestmentDetail;

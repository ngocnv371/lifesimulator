import { IonItem, IonLabel } from "@ionic/react";
import { useEffect, useState } from "react";
import { Investment } from "../../app/models";
import { useAppSelector } from "../../app/store";
import { getInvestmentById } from "../../data/investments";
import useInvestment from "./useInvestment";

type Props = {
  id: string;
  onClick?: Function;
};

const InvestmentItem: React.FC<Props> = (props) => {
  const amount = useAppSelector((state) => state.investments[props.id]);
  const item = useInvestment(props.id);

  if (!item) {
    return null;
  }

  return (
    <>
      <IonItem onClick={() => props.onClick && props.onClick()}>
        <IonLabel>
          <span>{item.name}</span>
        </IonLabel>
        <IonLabel slot="end" color="warning">
          ${amount}
        </IonLabel>
      </IonItem>
      <IonItem onClick={() => props.onClick && props.onClick()}>
        <IonLabel style={{ whiteSpace: "pre-wrap" }}>
          <p>{item.description}</p>
        </IonLabel>
      </IonItem>
    </>
  );
};

export default InvestmentItem;

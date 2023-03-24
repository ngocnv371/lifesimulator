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

const PotentialInvestmentItem: React.FC<Props> = (props) => {
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
          ${item.minAmount}
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

export default PotentialInvestmentItem;

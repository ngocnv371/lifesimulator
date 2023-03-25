import React, { MouseEventHandler } from 'react';
import { IonItem, IonLabel, IonButton } from '@ionic/react';
type Props = {
    id: string;
    name: string;
    description: string;
    amount: number;
    onClick?: MouseEventHandler<HTMLIonButtonElement>;
  };
const BusinessItem: React.FC<Props> = ({ name, description, amount, onClick }) => {
  return (
    <IonItem>
      <IonLabel>
        <h2>{name}</h2>
        <p>{description}</p>
        <p>Amount: {amount}</p>
      </IonLabel>
      <IonButton onClick={onClick}>Invest</IonButton>
      {/* Here you can add the graph or list of recent profitability */}
    </IonItem>
  );
};

export default BusinessItem;

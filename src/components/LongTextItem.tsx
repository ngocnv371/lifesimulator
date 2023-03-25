import { IonItem, IonLabel } from "@ionic/react";

interface Props {
  [key: string]: any;
}

const LongTextItem: React.FC<React.PropsWithChildren<Props>> = (props) => {
  return (
    <IonItem {...props}>
      <IonLabel style={{ whiteSpace: "pre-wrap" }}>{props.children}</IonLabel>
    </IonItem>
  );
};

export default LongTextItem;

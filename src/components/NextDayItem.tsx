import { IonItem, IonLabel } from "@ionic/react";
import { dayPassed } from "../app/actions";
import { useAppDispatch } from "../app/store";

const NextDayItem: React.FC = () => {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(dayPassed());
  }
  return (
    <IonItem onClick={() => handleClick()}>
      <IonLabel>Next Day</IonLabel>
    </IonItem>
  );
};

export default NextDayItem;

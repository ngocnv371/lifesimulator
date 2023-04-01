import {
  IonIcon,
  IonItem,
  IonLabel,
  IonMenuToggle,
  useIonToast,
} from "@ionic/react";
import { dayPassed } from "../../app/actions";
import { useAppDispatch } from "../../app/store";
import { playForward } from "ionicons/icons";

const NextDayItem: React.FC = () => {
  const dispatch = useAppDispatch();
  const [toast] = useIonToast();

  function handleClick() {
    dispatch(dayPassed());
    toast({
      message: "A new day has arrived",
      duration: 1500,
      color: "primary",
    });
  }

  return (
    <IonMenuToggle autoHide={false}>
      <IonItem onClick={() => handleClick()}>
        <IonIcon slot="start" icon={playForward}></IonIcon>
        <IonLabel>Next Day</IonLabel>
      </IonItem>
    </IonMenuToggle>
  );
};

export default NextDayItem;

import {
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { time } from "ionicons/icons";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "../../app/store";
import { formatCurrency } from "../../app/utils";
import { getJobById } from "../../data/jobs";
import { apply } from "./JobSlice";

type Props = {
  id?: string;
  onClosed?: Function;
  onApplied?: Function;
};

const ApplyJobModal: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const job = props.id ? getJobById(props.id) : null;
  const modal = useRef<HTMLIonModalElement>(null);

  // handle open/close
  useEffect(() => {
    if (props.id) {
      console.log("[ApplyJobModal] present");
      modal.current?.present();
    } else if (modal.current?.isOpen) {
      console.log("[ApplyJobModal] dismiss");
      modal.current?.dismiss();
    }
  }, [props.id]);

  function handleApply() {
    if (!job) {
      return;
    }

    dispatch(apply(job.id));
    modal.current?.dismiss();
    props.onApplied && props.onApplied();
  }

  return (
    <IonModal
      ref={modal}
      onWillDismiss={() => props.onClosed && props.onClosed()}
      initialBreakpoint={0.5}
      breakpoints={[0, 0.5, 0.75]}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>{(job && job.name) || <IonSkeletonText />}</IonTitle>
          <IonButtons slot="end">
            <IonButton
              disabled={!job}
              onClick={() => handleApply()}
              color="primary"
            >
              Apply
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {job && (
        <IonContent>
          <IonItem>
            <p>{job.description}</p>
          </IonItem>
          <IonItem>
            <IonLabel>Shift length</IonLabel>
            <IonLabel slot="end">
              <IonChip>
                <IonIcon icon={time} />
                <IonLabel>{job.shiftLength} hours</IonLabel>
              </IonChip>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Pay</IonLabel>
            <IonLabel slot="end" color="warning">
            {formatCurrency(job.salary)}
            </IonLabel>
          </IonItem>
        </IonContent>
      )}
    </IonModal>
  );
};

export default ApplyJobModal;

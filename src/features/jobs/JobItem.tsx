import { IonItem, IonLabel } from "@ionic/react";
import { MouseEventHandler } from "react";
import { formatCurrency } from "../../app/utils";
import useJobLoader from "./useJobLoader";

type Props = {
  id: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLIonItemElement>;
};

const JobItem: React.FC<Props> = (props) => {
  const job = useJobLoader(props.id);

  if (!job) {
    return null;
  }

  return (
    <IonItem
      itemID={job.id}
      key={job.id}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <IonLabel>
        <span>{job.name}</span>
        <p>{job.description} hours</p>
      </IonLabel>
      <IonLabel slot="end" color="warning">
        {formatCurrency(job.salary)}
      </IonLabel>
    </IonItem>
  );
};

export default JobItem;

import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import { useAppSelector } from "../../app/store";
import { formatCurrency } from "../../app/utils";
import ApplyJobModal from "./ApplyJobModal";
import { selectAvailableJobs } from "./JobSlice";

const BrowseJobsPage: React.FC = () => {
  const currentJob = useAppSelector((state) => state.job.id);
  const jobs = useAppSelector(selectAvailableJobs);
  const [selectedJob, setSelectedJob] = useState("");
  const router = useIonRouter();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Browse Jobs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {jobs.map((j) => (
          <IonItem
            itemID={j.id}
            key={j.id}
            disabled={j.id === currentJob}
            onClick={() => setSelectedJob(j.id)}
          >
            <IonLabel>
              <span>{j.name}</span>
              <p>{j.shiftLength} hours</p>
            </IonLabel>
            <IonLabel slot="end">{formatCurrency(j.salary)}</IonLabel>
          </IonItem>
        ))}
        {!jobs.length && (
          <IonItem>
            <IonLabel>
              <span>No jobs available for your skillset</span>
              <p>Try harder, young man!</p>
            </IonLabel>
          </IonItem>
        )}

        <ApplyJobModal
          id={selectedJob}
          onClosed={() => setSelectedJob("")}
          onApplied={() => router.goBack()}
        />
      </IonContent>
    </IonPage>
  );
};

export default BrowseJobsPage;

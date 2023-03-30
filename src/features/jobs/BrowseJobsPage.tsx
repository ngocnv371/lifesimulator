import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useMemo, useState } from "react";
import { useAppSelector } from "../../app/store";
import { formatCurrency } from "../../app/utils";
import ApplyJobModal from "./ApplyJobModal";
import JobItem from "./JobItem";
import { selectAvailableJobs } from "./JobSlice";

const BrowseJobsPage: React.FC = () => {
  const currentJob = useAppSelector((state) => state.job.id);
  const jobs = useAppSelector(selectAvailableJobs);
  const [selectedJob, setSelectedJob] = useState("");
  const [mode, setMode] = useState("qualified");
  const router = useIonRouter();

  const filtered = useMemo(
    () => jobs.filter((j) => (mode === "qualified" ? j.qualified : true)),
    [jobs, mode]
  );

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
        <IonSegment value={mode} onIonChange={(e) => setMode(e.detail.value || '')}>
          <IonSegmentButton value="qualified">Qualified Only</IonSegmentButton>
          <IonSegmentButton value="all">All</IonSegmentButton>
        </IonSegment>

        {filtered.map((j) => (
          <JobItem
            key={j.id}
            id={j.id}
            disabled={j.id === currentJob}
            onClick={() => setSelectedJob(j.id)} />
        ))}
        {!filtered.length && (
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

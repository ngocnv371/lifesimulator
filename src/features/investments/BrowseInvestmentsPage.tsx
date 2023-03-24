import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, school } from "ionicons/icons";
import { useMemo, useState } from "react";
import investments from "../../data/investments";
import PotentialInvestmentItem from "./PotentialInvestmentItem";
import InvestmentModal from "./InvestmentModal";

const BrowseInvestmentsPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("stock");

  const filtered = useMemo(() => {
    return investments.filter((i) => i.type === type);
  }, [type]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Browse Investments</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSegment
          value={type}
          onIonChange={(v) => setType(v.detail.value || "")}
        >
          <IonSegmentButton value="stock">
            <IonLabel>Stocks</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="estate">
            <IonLabel>Real Estates</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="fund">
            <IonLabel>Index Funds</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {filtered.map((i) => (
          <PotentialInvestmentItem
            id={i.id}
            key={i.name}
            onClick={() => setOpen(true)}
          />
        ))}

        <InvestmentModal open={open} onClosed={() => setOpen(false)} />
      </IonContent>
      <IonFooter>
        <IonItem>
          <IonLabel>
            <span>Your Capital</span>
            <p>From liquid assets</p>
          </IonLabel>
          <IonLabel slot="end" color="warning">
            $566
          </IonLabel>
        </IonItem>
      </IonFooter>
    </IonPage>
  );
};

export default BrowseInvestmentsPage;

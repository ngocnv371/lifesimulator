import {
  IonChip,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { getSkillById } from "../../data/skills";

const t1 =
  "Safety protocols, Communication, Attention to detail, Teamwork, Analytical thinking, Legal knowledge, Research methods, Logistics, Supply Chain Management, Inventory Management, Transportation, Classroom Management, Creativity, Patience, Empathy, Social and Community Services, Writing, Public Speaking, Navigation, Time Management, Debt management, Critical Thinking, Nail care, Sanitation, Sales, Landscaping, Groundskeeping, Plant Care, Driving, Wiring, Patient care, Healthcare regulations and policies, Budgeting, Employment Law, Blueprints, Assessment";
const t2 =
  "Programming languages, Version control, Data structures and algorithms, HTML, CSS, JavaScript, Web development frameworks, Responsive design, User experience design, Marketing, Media Relations, Solar panel installation, Culinary arts, Cooking techniques, Food safety, Pharmaceuticals, Research, Negotiation, Lesson Planning, Mathematics, Curriculum design, Fire safety, Medical Imaging, Healthcare administration, Management, Leadership, Accounting, Human Resources, Financial counseling, Technical writing";
const t3 =
  "Software testing, Debugging, Networking, Software development, Animal health and behavior, Aviation, Wind Turbine Technology, Network Design, Network Protocols, Teaching, Network Administration, System Security, Community Health, Credit Analysis, Nutrition, Financial planning, Electrical Systems, Massage techniques, Audiology, Fitness programs, Laboratory testing, Engineering, Sustainability";
const t4 =
  "Clinical knowledge, Software design, Cryptography, Security policies, Database Management, Database Design, Public Health, Statistics, Mathematical Modeling, Financial analysis, Investment Strategies, Machine Learning, Surgical Skills, Anesthesia Administration, Patient Monitoring, Public safety, Emergency response, Physical Fitness, Cardiovascular Anatomy and Physiology, Medical Technology, Medication management, Anatomy, Exercise science";
const t5 =
  "Diagnosis, Treatment, Network security, Cybersecurity, Vulnerability assessments, Risk management, Physiology, Rehabilitation, Project management, Strategic planning, Surgery, Data analysis, Statistical analysis, Biomedical Engineering, Petroleum Engineering, Counseling, Psychology, Biochemistry, Hearing technology, Genetics, Environmental science, Political Science";
const t6 = "";

function map(t: string, tier: number) {
  return t.split(", ").map((k) => ({ ...getSkillById(k), tier }));
}

const skills = [
  map(t1, 1),
  map(t2, 2),
  map(t3, 3),
  map(t4, 4),
  map(t5, 5),
].flatMap((t) => t);

type Item = typeof skills[0];

const SkillTreePage: React.FC = () => {
  const [selected, setSelected] = useState<Item | null>(null);

  useEffect(() => {
    if (selected) {
      console.log(selected);
    }
  }, [selected]);

  function renderTier(tier: number) {
    return skills
      .filter((s) => s.tier === tier)
      .map((s) => {
        const isActive = selected && selected.id === s.id;
        const isRequired =
          selected &&
          selected.requiredSkills.some((r) => r.toLocaleLowerCase() === s.id);
        return (
          <IonChip
            color={isActive ? "primary" : isRequired ? "secondary" : ""}
            key={s.id}
            onClick={() => setSelected(s)}
          >
            {s.name}
          </IonChip>
        );
      });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Skill Tree</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <h1>Tier 1</h1>
        {renderTier(1)}
        <h1>Tier 2</h1>
        {renderTier(2)}
        <h1>Tier 3</h1>
        {renderTier(3)}
        <h1>Tier 4</h1>
        {renderTier(4)}
        <h1>Tier 5</h1>
        {renderTier(5)}
      </IonContent>
    </IonPage>
  );
};

export default SkillTreePage;

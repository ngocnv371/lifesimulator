import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Page from "./pages/Page";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import CharacterCreationPage from "./features/character-creation/CharacterCreationPage";
import SkillsPage from "./features/skills/SkillsPage";
import BrowseSkillsPage from "./features/skills/BrowseSkillsPage";
import BrowseJobsPage from "./features/jobs/BrowseJobsPage";
import JobPage from "./features/jobs/JobPage";
import InvestmentsPage from "./features/investments/InvestmentsPage";
import BrowseInvestmentsPage from "./features/investments/browse/BrowseInvestmentsPage";
import InvestmentDetailPage from "./features/investments/detail/InvestmentDetailPage";
import CareerPathsPage from "./features/career/paths/CareerPathsPage";
import CareerPathDetailPage from "./features/career/paths/CareerPathDetailPage";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/page/Inbox" />
            </Route>
            <Route path="/page/:name" exact={true}>
              <Page />
            </Route>
            <Route path="/character-creation" exact={true}>
              <CharacterCreationPage />
            </Route>
            <Route path="/skills/browse" exact={true}>
              <BrowseSkillsPage />
            </Route>
            <Route path="/skills" exact={true}>
              <SkillsPage />
            </Route>
            <Route path="/investments/browse/all" exact={true}>
              <BrowseInvestmentsPage />
            </Route>
            <Route path="/investments/:id" exact={true}>
              <InvestmentDetailPage />
            </Route>
            <Route path="/investments" exact={true}>
              <InvestmentsPage />
            </Route>
            <Route path="/career" exact={true}>
              <JobPage />
            </Route>
            <Route path="/career/jobs" exact={true}>
              <BrowseJobsPage />
            </Route>
            <Route path="/career/paths/:id" exact={true}>
              <CareerPathDetailPage />
            </Route>
            <Route path="/career/paths" exact={true}>
              <CareerPathsPage />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

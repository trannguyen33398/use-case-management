import "./App.css";
import { UseCasesCreate } from "./pages/use-cases/UseCasesCreate";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { BenefitCreate } from "./pages/benefits/BenefitCreate";
import { SprintCreate } from "./pages/sprints/SprintCreate";
import { BundleCreate } from "./pages/bundles/BundleCreate";

import { RiskEdit } from "./pages/risks/RiskEdit";

import { MainMenu } from "./pages/main-menu/MainMenu";
import { MachineEdit } from "./pages/machines/MachineEdit";
import { MachineList } from "./pages/machines/MachineList";
import { QueryClient, QueryClientProvider } from "react-query";
import { MachineCreate } from "./pages/machines/MachineCreate";
import { ProcessList } from "./pages/processes/ProcessList";
import { ProcessCreate } from "./pages/processes/ProcessCreate";
import { ProcessEdit } from "./pages/processes/ProcessEdit";
import { ServiceLineList } from "./pages/service-lines/ServiceLineList";
import { ServiceLineCreate } from "./pages/service-lines/ServiceLineCreate";
import { PlantList } from "./pages/plants/PlantList";
import { PlantCreate } from "./pages/plants/PlantCreate";
import { PlantEdit } from "./pages/plants/PlantEdit";
import { ServiceLineEdit } from "./pages/service-lines/ServiceLineEdit";
import { UseCaseClusterList } from "./pages/use-case-cluster/UseCaseClusterList";
import { UseCaseClusterCreate } from "./pages/use-case-cluster/UseCaseClusterCreate";
import { UseCaseClusterEdit } from "./pages/use-case-cluster/UseCaseClusterEdit";
import { RiskList } from "./pages/risks/RiskList";
import { RiskCreate } from "./pages/risks/RiskCreate";
import { SystemList } from "./pages/systems/SystemsList";
import { SystemCreate } from "./pages/systems/SystemsCreate";
import { SystemEdit } from "./pages/systems/SystemsEdit";
import { CommunicationStreamList } from "./pages/communication-streams/CommunicationStreamList";
import { CommunicationStreamEdit } from "./pages/communication-streams/CommunicationStreamEdit";
import { CommunicationStreamCreate } from "./pages/communication-streams/CommunicationStreamCreate";
import { UseCasesEdit } from "./pages/use-cases/UseCaseEdit";
import { UseCaseList } from "./pages/use-cases/UseCaseList";
import { BenefitCategoryList } from "./pages/benefit-categories/BenefitCategoryList";
import { BenefitCategoryEdit } from "./pages/benefit-categories/BenefitCategoryEdit";
import { BenefitCategoryCreate } from "./pages/benefit-categories/BenefitCategoryCreate";
import { BenefitList } from "./pages/benefits/BenefitList";
import { BenefitEdit } from "./pages/benefits/BenefitEdit";
import { BundleList } from "./pages/bundles/BundleList";
import { BundleEdit } from "./pages/bundles/BundleEdit";
import { SprintList } from "./pages/sprints/SprintList";
import { SprintEdit } from "./pages/sprints/SprintEdit";
function App() {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/use-cases/all" element={<UseCaseList />} />
            <Route path="/use-cases/create" element={<UseCasesCreate />} />
            <Route path="/use-cases/:useCaseId" element={<UseCasesEdit />} />
            <Route path="/benefits/create" element={<BenefitCreate />} />
            <Route path="/benefits/all" element={<BenefitList />} />
            <Route path="/benefits/edit/:benefitId" element={<BenefitEdit />} />
            <Route path="/sprints/all" element={<SprintList />} />
            <Route path="/sprints/create" element={<SprintCreate />} />
            <Route path="/sprints/edit/:sprintId" element={<SprintEdit />} />
            <Route path="/bundles/create" element={<BundleCreate />} />
            <Route path="/bundles/all" element={<BundleList/>} />
            <Route path="/bundles/edit/:bundleId" element={<BundleEdit/>} />
            <Route path="/benefit-categories/all" element={<BenefitCategoryList />} />
            <Route path="/benefit-categories/create" element={<BenefitCategoryCreate />} />
            <Route path="/benefit-categories/:benefitCategoryId" element={<BenefitCategoryEdit />} />
            <Route path="/processes/all" element={<ProcessList />} />
            <Route path="/processes/create" element={<ProcessCreate />} />
            <Route
              path="/processes/:processId"
              element={<ProcessEdit />}
            />
            <Route path="/risks" element={<RiskList />} />
            <Route path="/plants/all" element={<PlantList />} />
            <Route path="/plants/create" element={<PlantCreate />} />
            <Route path="/plants/:plantId" element={<PlantEdit />} />
            <Route path="/risks/all" element={<RiskList />} />
            <Route path="/risks/create" element={<RiskCreate />} />
            <Route path="/risks/:riskId" element={<RiskEdit />} />
            <Route path="/systems/all" element={<SystemList />} />
            <Route path="/systems/create" element={<SystemCreate />} />
            <Route path="/systems/:systemId" element={<SystemEdit />} />
            <Route path="/machines/all" element={<MachineList />} />
            <Route path="/machines/create" element={<MachineCreate />} />
            <Route path="/machines/:machineId" element={<MachineEdit />} />
            <Route path="/service-lines/all" element={<ServiceLineList />} />
            <Route
              path="/service-lines/create"
              element={<ServiceLineCreate />}
            />
              <Route
              path="/service-lines/:serviceLineId"
              element={<ServiceLineEdit />}
            />
            <Route
              path="/communication-streams/all"
              element={<CommunicationStreamList />}
            />
             <Route
              path="/communication-streams/:communicationStreamId"
              element={<CommunicationStreamEdit />}
            />
             <Route
              path="/communication-streams/create"
              element={<CommunicationStreamCreate />}
            />
            <Route path="/use-case-cluster/all" element={<UseCaseClusterList />} />
            <Route path="/use-case-cluster/create" element={<UseCaseClusterCreate />} />
            <Route path="/use-case-cluster/:useCaseClusterId" element={<UseCaseClusterEdit />} />
          </Routes>
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;

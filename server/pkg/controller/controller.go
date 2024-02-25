package controller

import (
	"github.com/jakobgabriel/use-case-management-app/server/pkg/config"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/controller/benefit"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/controller/benefit-category"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/controller/bundle"
	communicationStream "github.com/jakobgabriel/use-case-management-app/server/pkg/controller/communication-stream"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/controller/machine"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/controller/plant"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/controller/process"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/controller/risk"
	serviceLine "github.com/jakobgabriel/use-case-management-app/server/pkg/controller/service-line"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/controller/sprint"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/controller/system"
	useCaseCluster "github.com/jakobgabriel/use-case-management-app/server/pkg/controller/use-case-cluster"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/controller/use-cases"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/logger"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/store"
)

type Controller struct {
	Machine             machine.IController
	Plant               plant.IController
	Process             process.IController
	ServiceLine         serviceLine.IController
	UseCaseCluster      useCaseCluster.IController
	Risk                risk.IController
	System              system.IController
	CommunicationStream communicationStream.IController
	UseCase				useCase.IController
	BenefitCategory 	benefitCategory.IController
	Benefit 	benefit.IController
	Bundle bundle.IController
	Sprint sprint.IController
}

func New(store *store.Store, repo store.DBRepo, logger logger.Logger, cfg *config.Config) *Controller {
	return &Controller{
		Machine:             machine.New(store, repo, logger, cfg),
		Plant:               plant.New(store, repo, logger, cfg),
		Process:             process.New(store, repo, logger, cfg),
		ServiceLine:         serviceLine.New(store, repo, logger, cfg),
		UseCaseCluster:      useCaseCluster.New(store, repo, logger, cfg),
		Risk:                risk.New(store, repo, logger, cfg),
		System:              system.New(store, repo, logger, cfg),
		CommunicationStream: communicationStream.New(store, repo, logger, cfg),
		UseCase: useCase.New(store, repo, logger, cfg),
		BenefitCategory: benefitCategory.New(store, repo, logger, cfg),
		Benefit: benefit.New(store, repo, logger, cfg),
		Bundle: bundle.New(store, repo, logger, cfg),
		Sprint: sprint.New(store, repo, logger, cfg),
	}
}

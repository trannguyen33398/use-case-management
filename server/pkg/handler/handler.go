package handler

import (
	"github.com/jakobgabriel/use-case-management-app/server/pkg/config"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/controller"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/handler/benefit"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/handler/benefit-category"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/handler/communication-stream"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/handler/machine"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/handler/plant"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/handler/process"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/handler/risk"
	serviceLine "github.com/jakobgabriel/use-case-management-app/server/pkg/handler/service-line"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/handler/system"
	useCaseCluster "github.com/jakobgabriel/use-case-management-app/server/pkg/handler/use-case-cluster"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/handler/use-cases"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/logger"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/store"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/handler/bundle"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/handler/sprint"
)

type Handler struct {
	Plant               plant.IHandler
	Process             process.IHandler
	ServiceLine         serviceLine.IHandler
	UseCaseCLuster      useCaseCluster.IHandler
	Machine             machine.IHandler
	Risk                risk.IHandler
	System              system.IHandler
	CommunicationStream communicationStream.IHandler
	UseCase             useCase.IHandler
	BenefitCategory     benefitCategory.IHandler
	Benefit             benefit.IHandler
	Bundle             bundle.IHandler
	Sprint sprint.IHandler
}

func New(store *store.Store, repo store.DBRepo, ctrl *controller.Controller, logger logger.Logger, cfg *config.Config) *Handler {
	return &Handler{
		Machine:             machine.New(ctrl, store, repo, logger, cfg),
		Plant:               plant.New(ctrl, store, repo, logger, cfg),
		Process:             process.New(ctrl, store, repo, logger, cfg),
		ServiceLine:         serviceLine.New(ctrl, store, repo, logger, cfg),
		UseCaseCLuster:      useCaseCluster.New(ctrl, store, repo, logger, cfg),
		Risk:                risk.New(ctrl, store, repo, logger, cfg),
		System:              system.New(ctrl, store, repo, logger, cfg),
		CommunicationStream: communicationStream.New(ctrl, store, repo, logger, cfg),
		UseCase:             useCase.New(ctrl, store, repo, logger, cfg),
		BenefitCategory:     benefitCategory.New(ctrl, store, repo, logger, cfg),
		Benefit:             benefit.New(ctrl, store, repo, logger, cfg),
		Bundle:             bundle.New(ctrl, store, repo, logger, cfg),
		Sprint:             sprint.New(ctrl, store, repo, logger, cfg),
	}
}

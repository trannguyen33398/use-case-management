package store

import (
	"github.com/jakobgabriel/use-case-management-app/server/pkg/store/benefit"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/store/benefit-category"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/store/bundle"
	communicationStream "github.com/jakobgabriel/use-case-management-app/server/pkg/store/communication-stream"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/store/machine"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/store/plant"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/store/process"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/store/risk"
	serviceLine "github.com/jakobgabriel/use-case-management-app/server/pkg/store/service-line"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/store/system"
	useCaseCluster "github.com/jakobgabriel/use-case-management-app/server/pkg/store/use-case-cluster"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/store/use-cases"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/store/sprint"
)

type Store struct {
	Machine             machine.IStore
	Plant               plant.IStore
	Process             process.IStore
	ServiceLine         serviceLine.IStore
	UseCaseCluster      useCaseCluster.IStore
	Risk                risk.IStore
	System              system.IStore
	CommunicationStream communicationStream.IStore
	UseCase             useCases.IStore
	BenefitCategory     benefitCategory.IStore
	Benefit             benefit.IStore
	Bundle              bundle.IStore
	Sprint 				sprint.IStore
}

func New() *Store {
	return &Store{
		Machine:             machine.New(),
		Plant:               plant.New(),
		Process:             process.New(),
		ServiceLine:         serviceLine.New(),
		UseCaseCluster:      useCaseCluster.New(),
		Risk:                risk.New(),
		System:              system.New(),
		CommunicationStream: communicationStream.New(),
		UseCase:             useCases.New(),
		BenefitCategory:     benefitCategory.New(),
		Benefit:             benefit.New(),
		Bundle:              bundle.New(),
		Sprint:				sprint.New(),
	}
}

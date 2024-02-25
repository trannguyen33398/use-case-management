package useCase

import (
	"github.com/gin-gonic/gin"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/handler/use-cases/request"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

func (r *controller) Create(c *gin.Context, input request.CreateUseCasesRequest) error {
	tx, done := r.repo.NewTransaction()
	risks := make([]model.UseCasesToRisks, 0)
	machines := make([]model.UseCasesToMachines, 0)
	communicationStreams := make([]model.UseCasesToCommunicationStreams, 0)
	serviceLines := make([]model.UseCasesToServiceLines, 0)
	blockingPointsToServiceLines := make([]model.UseCasesBlockingPointsToServiceLines, 0)
	systems := make([]model.UseCasesToSystems, 0)
	useCaseClusters := make([]model.UseCasesToUseCaseClusters, 0)

	for _, v := range input.Risks {
		temp := model.UseCasesToRisks{
			RiskId: v,
		}
		risks = append(risks, temp)

	}

	for _, v := range input.Machines {
		temp := model.UseCasesToMachines{
			MachineId: v,
		}

		machines = append(machines, temp)
	}

	for _, v := range input.CommunicationStreams {
		temp := model.UseCasesToCommunicationStreams{
			CommunicationStreamId: v,
		}

		communicationStreams = append(communicationStreams, temp)
	}

	for _, v := range input.ServiceLines {
		temp := model.UseCasesToServiceLines{
			ServiceLineId: v,
		}

		serviceLines = append(serviceLines, temp)
	}

	for _, v := range input.BlockingPointsToServiceLines {
		temp := model.UseCasesBlockingPointsToServiceLines{
			ServiceLineId: v,
		}

		blockingPointsToServiceLines = append(blockingPointsToServiceLines, temp)
	}

	for _, v := range input.Systems {
		temp := model.UseCasesToSystems{
			SystemId: v,
		}

		systems = append(systems, temp)
	}

	for _, v := range input.UseCaseClusters {
		temp := model.UseCasesToUseCaseClusters{
			UseCaseClusterId: v,
		}

		useCaseClusters = append(useCaseClusters, temp)
	}

	// Create client
	err := r.store.UseCase.Create(tx.DB(), &model.UseCases{
		Name:                         input.Name,
		StandardParentId:             input.ParentId,
		ProcessParentId:              input.ProcessParentId,
		ProcessId:                    input.ProcessId,
		PlantId:                      input.PlantId,
		Priority:                     input.Priority,
		Type:                         input.Type,
		Category:                     input.Category,
		DescriptionRating:            input.DescriptionRating,
		ResponsiblePerson:            input.ResponsiblePerson,
		CollectedAt:                  input.CollectedAt,
		TargetDefinition:             input.TargetDefinition,
		MajorIssueDefinition:         input.MajorIssueDefinition,
		RelevantTags:                 input.RelevantTags,
		BlockingPoints:               input.BlockingPoints,
		Comments:                     input.Comments,
		ProjectName:                  input.ProjectName,
		Risks:                        risks,
		Machines:                     machines,
		CommunicationStreams:         communicationStreams,
		ServiceLines:                 serviceLines,
		BlockingPointsToServiceLines: blockingPointsToServiceLines,
		Systems:                      systems,
		UseCaseClusters:               useCaseClusters,
		Active:                       input.Active,
	})

	if err != nil {
		return done(err)
	}
	return done(nil)
}

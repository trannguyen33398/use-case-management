package request

import (
	"time"

	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

type CreateUseCasesRequest struct {
	Name        string      `json:"name" validate:"required"`
	ParentId    *model.UUID `json:"parentId"`
	ProcessParentId    *model.UUID `json:"processParentId"`
	ProcessId    *model.UUID `json:"processId" validate:"required"`
	PlantId    *model.UUID `json:"plantId" validate:"required"`
	Priority int8 `json:"priority"`
	Type string `json:"type" validate:"required"`
	Category string `json:"category" validate:"required"`
	DescriptionRating string `json:"descriptionRating" validate:"required"`
	ResponsiblePerson string `json:"responsiblePerson" validate:"required"`
	CollectedAt *time.Time `json:"collectedAt"`
	TargetDefinition string `json:"targetDefinition" validate:"required"`
	MajorIssueDefinition string `json:"majorIssueDefinition" validate:"required"`
	RelevantTags string `json:"relevantTags"`
	BlockingPoints string `json:"blockingPoints"`
	Comments string `json:"comments"`
	ProjectName string `json:"projectName"`
	Risks []model.UUID `json:"risks"`
	Machines []model.UUID `json:"machines" validate:"required"`
	CommunicationStreams []model.UUID `json:"communicationStreams"`
	ServiceLines []model.UUID `json:"serviceLines" validate:"required"`
	BlockingPointsToServiceLines []model.UUID `json:"blockingPointsToServiceLines"`
	Systems []model.UUID `json:"systems" validate:"required"`
	UseCaseClusters []model.UUID `json:"useCaseClusters"`
	Active      *bool       `json:"active" validate:"required"`
}

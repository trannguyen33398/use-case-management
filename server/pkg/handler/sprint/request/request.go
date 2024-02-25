package request

import (
	"time"

	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

type CreateSprintRequest struct {
	Name                 string       `json:"name" validate:"required"`
	PlannedFrom          *time.Time    `json:"plannedFrom" validate:"required"`
	PlannedTo            *time.Time    `json:"plannedTo" validate:"required"`
	Step                 int32        `json:"step" validate:"required"`
	Description          string       `json:"description"`
	Status               string       `json:"status" validate:"required"`
	DevelopmentStatus    string       `json:"developmentStatus"`
	IterationStatus      string       `json:"iterationStatus"`
	ImplementationStatus string       `json:"implementationStatus"`
	HandoverStatus       string       `json:"handoverStatus"`
	ImplementedAt        *time.Time       `json:"implementedAt"`
	Documents            string       `json:"documents"`
	BundleId             *model.UUID   `json:"bundleId" validate:"required"`
	UseCases             []model.UUID `json:"useCases" validate:"required"`
}

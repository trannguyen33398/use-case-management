package request

import (
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

type CreateBenefitRequest struct {
	Name        string      `json:"name" validate:"required"`
	ParentId    *model.UUID `json:"parentId"`
	ParentName  string      `json:"parentName"`
	Comments string `json:"comments"`
	Type     string `json:"type" validate:"required"`
	SprintId string `json:"sprintId"`
	SprintStatus string `json:"sprintStatus"`
	CalculationInput string `json:"calculationInput" validate:"required"`
	Savings float64 `json:"savings" validate:"required"`
	Reliability []string `json:"reliability" validate:"required"`
	BenefitCategories []model.UUID `json:"benefitCategories"`
	UseCases  []model.UUID `json:"useCases" validate:"required"`
}

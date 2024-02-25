package request

import (
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

type CreatePlantRequest struct {
	Name              string      `json:"name" validate:"required"`
	ParentId          *model.UUID `json:"parentId"`
	OperationsCluster string      `json:"operationsCluster" validate:"required"`
	Type              string      `json:"type" validate:"required"`
	NameAbbreviation  string      `json:"nameAbbreviation" validate:"required"`
	Segment           []string    `json:"segment"`
	Zebra             *bool       `json:"zebra" validate:"required"`
	Active            *bool       `json:"active" validate:"required"`
}

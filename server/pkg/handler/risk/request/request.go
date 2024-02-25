package request

import (
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

type CreateRiskRequest struct {
	Name        string      `json:"name" validate:"required"`
	ParentId    *model.UUID `json:"parentId"`
	Priority    int         `json:"priority" validate:"required"`
	Description string      `json:"description" validate:"required"`
	Active      *bool       `json:"active" validate:"required"`
}

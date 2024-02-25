package request

import (
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

type CreateMachineRequest struct {
	Name        string      `json:"name" validate:"required"`
	ParentId    *model.UUID `json:"parentId"`
	Priority    int         `json:"priority"`
	Description string      `json:"description"`
	Active      *bool       `json:"active" validate:"required"`
	Status      string      `json:"status"`
}

package request

import (
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

type CreateCommunicationStreamRequest struct {
	Name              string     `json:"name" validate:"required"`
	ParentId          *model.UUID `json:"parentId"`
	ResponsiblePerson string     `json:"responsiblePerson" validate:"required"`
	Description       string     `json:"description"`
	Active            *bool      `json:"active" validate:"required"`
}

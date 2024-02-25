package request

import (
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

type CreateBundleRequest struct {
	Name        string      `json:"name" validate:"required"`
	Description  string      `json:"description" validate:"required"`
	UseCases  []model.UUID `json:"useCases" validate:"required"`
}

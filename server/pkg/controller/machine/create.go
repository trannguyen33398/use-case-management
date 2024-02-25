package machine

import (
	"github.com/gin-gonic/gin"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/handler/machine/request"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

func (r *controller) Create(c *gin.Context, input request.CreateMachineRequest) error {
	tx, done := r.repo.NewTransaction()

	// Create client
	err := r.store.Machine.Create(tx.DB(), &model.Machines{
		Name:        input.Name,
		Description: input.Description,
		ParentId:    input.ParentId,
		Priority:    input.Priority,
		Status:      input.Status,
		Active:      input.Active,
	})

	if err != nil {
		return done(err)
	}
	return done(nil)
}

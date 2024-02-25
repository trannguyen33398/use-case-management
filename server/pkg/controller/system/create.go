package system

import (
	"github.com/gin-gonic/gin"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/handler/system/request"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

func (r *controller) Create(c *gin.Context, input request.CreateSystemRequest) error {
	tx, done := r.repo.NewTransaction()

	// Create client
	err := r.store.System.Create(tx.DB(), &model.Systems{
		Name:        input.Name,
		Description: input.Description,
		ParentId:    input.ParentId,
		Category:    input.Category,
		ToolName:    input.ToolName,
		Active:      input.Active,
	})

	if err != nil {
		return done(err)
	}
	return done(nil)
}

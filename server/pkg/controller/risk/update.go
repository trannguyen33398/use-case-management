package risk

import (
	"github.com/gin-gonic/gin"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/handler/risk/request"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

func (r *controller) Update(c *gin.Context, input request.CreateRiskRequest) error {
	tx, done := r.repo.NewTransaction()

	// Create client
	err := r.store.Risk.Update(tx.DB(), c.Param("riskId"), &model.Risks{
		Name:        input.Name,
		Description: input.Description,
		ParentId:    input.ParentId,
		Priority:    input.Priority,
		Active:      input.Active,
	})

	if err != nil {
		return done(err)
	}
	return done(nil)
}

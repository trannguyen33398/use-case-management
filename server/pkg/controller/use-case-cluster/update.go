package useCaseCluster

import (
	"github.com/gin-gonic/gin"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/handler/use-case-cluster/request"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

func (r *controller) Update(c *gin.Context, input request.CreateUseCaseClusterRequest) error {
	tx, done := r.repo.NewTransaction()

	// Create client
	err := r.store.UseCaseCluster.Update(tx.DB(), c.Param("useCaseClusterId"), &model.UseCaseCluster{
		Name:        input.Name,
		ParentId:    input.ParentId,
		Description: input.Description,
		Active:      input.Active,
	})

	if err != nil {
		return done(err)
	}
	return done(nil)
}

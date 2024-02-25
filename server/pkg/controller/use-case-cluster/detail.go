package useCaseCluster

import (
	"github.com/gin-gonic/gin"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

func (r *controller) Detail(c *gin.Context) (*model.UseCaseCluster, error) {
	useCaseCluster, err := r.store.UseCaseCluster.Detail(r.repo.DB(), c.Param("useCaseClusterId"))
	if err != nil {
		return nil, err
	}

	return useCaseCluster, nil
}

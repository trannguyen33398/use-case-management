package bundle

import (
	"github.com/gin-gonic/gin"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

func (r *controller) Detail(c *gin.Context) (*model.Bundles, error) {
	bundle, err := r.store.Bundle.Detail(r.repo.DB(), c.Param("bundleId"))
	if err != nil {
		return nil, err
	}

	return bundle, nil
}

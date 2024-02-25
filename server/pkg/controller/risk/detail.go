package risk

import (
	"github.com/gin-gonic/gin"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

func (r *controller) Detail(c *gin.Context) (*model.Risks, error) {
	risk, err := r.store.Risk.Detail(r.repo.DB(), c.Param("riskId"))
	if err != nil {
		return nil, err
	}

	return risk, nil
}

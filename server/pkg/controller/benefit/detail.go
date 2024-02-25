package benefit

import (
	"github.com/gin-gonic/gin"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

func (r *controller) Detail(c *gin.Context) (*model.Benefits, error) {
	benefit, err := r.store.Benefit.Detail(r.repo.DB(), c.Param("benefitId"))
	if err != nil {
		return nil, err
	}

	return benefit, nil
}

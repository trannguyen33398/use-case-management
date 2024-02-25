package benefitCategory

import (
	"github.com/gin-gonic/gin"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

func (r *controller) Detail(c *gin.Context) (*model.BenefitCategories, error) {
	benefitCategory, err := r.store.BenefitCategory.Detail(r.repo.DB(), c.Param("benefitCategoryId"))
	if err != nil {
		return nil, err
	}

	return benefitCategory, nil
}

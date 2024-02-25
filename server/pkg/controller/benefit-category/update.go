package benefitCategory

import (
	"github.com/gin-gonic/gin"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/handler/benefit-category/request"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

func (r *controller) Update(c *gin.Context, input request.CreateBenefitCategoryRequest) error {
	tx, done := r.repo.NewTransaction()

	// Create client
	err := r.store.BenefitCategory.Update(tx.DB(), c.Param("benefitCategoryId"), &model.BenefitCategories{
		Name:              input.Name,
		Description:       input.Description,
		ParentId: 		   input.ParentId,
		Active:            input.Active,
	})

	if err != nil {
		return done(err)
	}

	return done(nil)
}

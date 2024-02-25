package benefitCategory

import (
	"github.com/gin-gonic/gin"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/handler/benefit-category/request"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

func (r *controller) Create(c *gin.Context, input request.CreateBenefitCategoryRequest) error {
	tx, done := r.repo.NewTransaction()

	// Create client
	err := r.store.BenefitCategory.Create(tx.DB(), &model.BenefitCategories{
		Name:              input.Name,
		Description:       input.Description,
		Active:            input.Active,
	})

	if err != nil {
		return done(err)
	}
	return done(nil)
}

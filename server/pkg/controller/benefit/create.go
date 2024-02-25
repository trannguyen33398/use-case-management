package benefit

import (
	"github.com/gin-gonic/gin"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/handler/benefit/request"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

func (r *controller) Create(c *gin.Context, input request.CreateBenefitRequest) error {
	tx, done := r.repo.NewTransaction()
	
	useCases := make([]model.BenefitsToUseCases,0)
	categories := make([]model.BenefitsToBenefitCategories,0)

	for _, v:= range input.UseCases{
		temp := model.BenefitsToUseCases{
			UseCasesId: v,
		}
		
		useCases =append(useCases,temp)
	}

	for _, v:= range input.BenefitCategories{
		temp := model.BenefitsToBenefitCategories{
			BenefitCategoryId: v,
		}
		
		categories =append(categories,temp)
	}
	// Create client
	err := r.store.Benefit.Create(tx.DB(), &model.Benefits{
		Name:        input.Name,
		ParentId:    input.ParentId,
		Type: input.Type,
		SprintId: input.SprintId,
		SprintStatus: input.SprintStatus,
		Reliability: input.Reliability,
		CalculationInput: input.CalculationInput,
		Comments: input.Comments,
		Savings: input.Savings,
		BenefitCategories: categories,
		UseCases: useCases,
	})

	if err != nil {
		return done(err)
	}
	return done(nil)
}

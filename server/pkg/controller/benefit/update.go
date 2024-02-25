package benefit

import (
	"github.com/gin-gonic/gin"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/handler/benefit/request"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

func (r *controller) Update(c *gin.Context, input request.CreateBenefitRequest) error {
	tx, done := r.repo.NewTransaction()
	benefitId, err :=  model.UUIDFromString(c.Param("benefitId"))
	
	if err != nil {
		 return done(err)
	}
	useCases := make([]model.BenefitsToUseCases,0)
	categories := make([]model.BenefitsToBenefitCategories,0)

	for _, v:= range input.UseCases{
		temp := model.BenefitsToUseCases{
			UseCasesId: v,
			BenefitsID: benefitId,
			BenefitsType: "benefits",
		}
		
		useCases =append(useCases,temp)
	}

	for _, v:= range input.BenefitCategories{
		temp := model.BenefitsToBenefitCategories{
			BenefitCategoryId: v,
			BenefitsID: benefitId,
			BenefitsType: "benefits",
		}
		
		categories =append(categories,temp)
	}

	err = r.store.Benefit.Update(tx.DB(), c.Param("benefitId"), &model.Benefits{
		Name:        input.Name,
		ParentId:    input.ParentId,
		Type: input.Type,
		SprintId: input.SprintId,
		SprintStatus: input.SprintStatus,
		Reliability: input.Reliability,
		CalculationInput: input.CalculationInput,
		Comments: input.Comments,
		BenefitCategories: categories,
		Savings: input.Savings,
		UseCases: useCases,
	})

	if err != nil {
		return done(err)
	}

	return done(nil)
}

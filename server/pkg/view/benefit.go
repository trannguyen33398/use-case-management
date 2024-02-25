package view

import (
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

type CreateBenefitResponse struct {
	Data *Benefit `json:"data"`
}

type Benefit struct {
	Id          string      `json:"id"`
	Name        string      `json:"name"`
	ParentId    *model.UUID `json:"parentId"`
	ParentName  string      `json:"parentName"`
	Comments string `json:"comments"`
	Type     string `json:"type"`
	SprintId string `json:"sprintId"`
	SprintStatus string `json:"sprintStatus"`
	CalculationInput string `json:"calculationInput"`
	Savings float64 `json:"savings"`
	Reliability []string `json:"reliability"`
	CreatedAt   string      `json:"createdAt"`
	UpdatedAt   string      `json:"updatedAt"`
	BenefitCategories []UseCasesMapping `json:"benefitCategories"`
	UseCases  []UseCasesMapping `json:"useCases"`
}

func ToBenefit(benefit *model.Benefits) *Benefit {
	BenefitParentName := ""
	
	if benefit.BenefitParent != nil {
		BenefitParentName = benefit.BenefitParent.Name
	}
	useCases := make([]UseCasesMapping,0)
	benefitCategories := make([]UseCasesMapping,0)

	for _, v:= range benefit.UseCases{
		temp := UseCasesMapping{
			Id: v.UseCasesId.String(), 
			Name: v.UseCase.Name,
		}
		
		useCases =append(useCases,temp)
	}

	for _, v:= range benefit.BenefitCategories{
		temp := UseCasesMapping{
			Id: v.BenefitCategoryId.String(), 
			Name: v.BenefitCategory.Name,
		}
		
		benefitCategories =append(benefitCategories,temp)
	}

	return &Benefit{
		Id:          benefit.ID.String(),
		CreatedAt:   benefit.CreatedAt.Format("02-Jan-2006 15:04:05"),
		UpdatedAt:   benefit.UpdatedAt.Format("02-Jan-2006 15:04:05"),
		Name:        benefit.Name,
		ParentId:    benefit.ParentId,
		ParentName:  BenefitParentName,
		Type: benefit.Type,
		SprintId: benefit.SprintId,
		SprintStatus: benefit.SprintStatus,
		Reliability: benefit.Reliability,
		CalculationInput: benefit.CalculationInput,
		Savings: benefit.Savings,
		Comments: benefit.Comments,
		BenefitCategories: benefitCategories,
		UseCases: useCases,
	}
}

func ToBenefits( benefits []*model.Benefits) []Benefit {
	rs := make([]Benefit, 0, len(benefits))
	for _, benefit := range benefits {
		c := ToBenefit(benefit)
		if c != nil {
			rs = append(rs, *c)
		}
	}
	return rs
}

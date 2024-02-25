package view

import (
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

type CreateBenefitCategoryResponse struct {
	Data *BenefitCategory `json:"data"`
}

type BenefitCategory struct {
	Id          string      `json:"id"`
	Name        string      `json:"name"`
	ParentId    *model.UUID `json:"parentId"`
	Description string      `json:"description"`
	Active      *bool       `json:"active"`
	ParentName  string      `json:"parentName"`
	CreatedAt   string      `json:"createdAt"`
	UpdatedAt   string      `json:"updatedAt"`
}

func ToBenefitCategory(benefitCategory *model.BenefitCategories) *BenefitCategory {
	BenefitCategoryParentName := ""
	if benefitCategory.BenefitCategoryParent != nil {
		BenefitCategoryParentName = benefitCategory.BenefitCategoryParent.Name
	}

	return &BenefitCategory{
		Id:          benefitCategory.ID.String(),
		CreatedAt:   benefitCategory.CreatedAt.Format("02-Jan-2006 15:04:05"),
		UpdatedAt:   benefitCategory.UpdatedAt.Format("02-Jan-2006 15:04:05"),
		Name:        benefitCategory.Name,
		Description: benefitCategory.Description,
		ParentId:    benefitCategory.ParentId,
		Active:      benefitCategory.Active,
		ParentName:  BenefitCategoryParentName,
	}
}

func ToBenefitCategories( benefitCategories []*model.BenefitCategories) []BenefitCategory {
	rs := make([]BenefitCategory, 0, len(benefitCategories))
	for _, benefitCategory := range benefitCategories {
		c := ToBenefitCategory(benefitCategory)
		if c != nil {
			rs = append(rs, *c)
		}
	}
	return rs
}

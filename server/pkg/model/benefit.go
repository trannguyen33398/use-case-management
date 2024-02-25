package model

import "github.com/lib/pq"

type Benefits struct {
	BaseModel
	Name     string `json:"name"`
	ParentId *UUID  `json:"parentId"`
	Comments string `json:"comments"`
	Type     string `json:"type"`
	SprintId string `json:"sprintId"`
	SprintStatus string `json:"sprintStatus"`
	CalculationInput string `json:"calculationInput"`
	Savings float64 `json:"savings"`
	Reliability  pq.StringArray `gorm:"type:text[]" json:"reliability"`


	BenefitParent *Benefits `json:"benefitParent" gorm:"foreignkey:ParentId"`
	UseCases []BenefitsToUseCases `gorm:"polymorphic:Benefits;"`
	BenefitCategories []BenefitsToBenefitCategories `gorm:"polymorphic:Benefits;"`
}

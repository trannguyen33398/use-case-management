package model

type BenefitsToBenefitCategories struct {
	BaseModel
	BenefitCategoryId UUID `json:"benefitCategoryId"`
	BenefitsType string `json:"useCasesType"`
	BenefitsID UUID `json:"benefitId"`


	BenefitCategory *BenefitCategories `json:"benefitCategory" gorm:"foreignkey:BenefitCategoryId"`
}
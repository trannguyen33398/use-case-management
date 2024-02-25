package model

type BenefitsToUseCases struct {
	BaseModel
	UseCasesId UUID `json:"useCasesId"`
	BenefitsType string `json:"useCasesType"`
	BenefitsID UUID `json:"benefitId"`


	UseCase *UseCases `json:"useCase" gorm:"foreignkey:UseCasesId"`
}
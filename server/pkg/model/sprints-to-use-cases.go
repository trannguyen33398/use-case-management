package model

type SprintsToUseCases struct {
	BaseModel
	UseCasesId UUID `json:"useCasesId"`
	SprintsType string `json:"useCasesType"`
	SprintsID UUID `json:"sprintsId"`


	UseCase *UseCases `json:"useCase" gorm:"foreignkey:UseCasesId"`
}
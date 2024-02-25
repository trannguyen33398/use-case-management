package model

type BundlesToUseCases struct {
	BaseModel
	UseCasesId UUID `json:"useCasesId"`
	BundlesType string `json:"bundlesType"`
	BundlesID UUID `json:"bundlesId"`


	UseCase *UseCases `json:"useCase" gorm:"foreignkey:UseCasesId"`
}
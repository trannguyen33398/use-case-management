package model

type UseCasesToUseCaseClusters struct {
	BaseModel
	UseCasesID UUID `json:"useCasesId"`
	UseCasesType string `json:"useCasesType"`
	UseCaseClusterId UUID `json:"useCaseClusterId"`


	UseCaseCluster *UseCaseCluster `json:"useCaseCluster" gorm:"foreignkey:UseCaseClusterId"`
}
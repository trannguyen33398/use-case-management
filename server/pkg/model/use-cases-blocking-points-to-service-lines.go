package model

type UseCasesBlockingPointsToServiceLines struct {
	BaseModel
	UseCasesID UUID `json:"useCasesId"`
	UseCasesType string `json:"useCasesType"`
	ServiceLineId UUID `json:"serviceLineId"`


	ServiceLine *ServiceLines `json:"serviceLine" gorm:"foreignkey:ServiceLineId"`
}
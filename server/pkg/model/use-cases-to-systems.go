package model

type UseCasesToSystems struct {
	BaseModel
	UseCasesID UUID `json:"useCasesId"`
	UseCasesType string `json:"useCasesType"`
	SystemId UUID `json:"systemId"`


	System *Systems `json:"system" gorm:"foreignkey:SystemId"`
}
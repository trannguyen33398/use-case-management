package model

type UseCasesToRisks struct {
	BaseModel
	UseCasesID UUID `json:"useCasesId"`
	UseCasesType string `json:"useCasesType"`
	RiskId UUID `json:"riskId"`


	Risk *Risks `json:"risk" gorm:"foreignkey:RiskId"`
}
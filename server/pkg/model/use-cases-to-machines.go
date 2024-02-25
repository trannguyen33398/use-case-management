package model

type UseCasesToMachines struct {
	BaseModel
	UseCasesID UUID `json:"useCasesId"`
	UseCasesType string `json:"useCasesType"`
	MachineId UUID `json:"machineId"`


	Machine *Machines `json:"machine" gorm:"foreignkey:MachineId"`
}
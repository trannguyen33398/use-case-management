package model

import "time"

type UseCases struct {
	BaseModel
	Name        string `json:"name"`
	StandardParentId    *UUID   `json:"standardParentId"`
	ProcessParentId    *UUID   `json:"processParentId"`
	ProcessId    *UUID   `json:"processId"`
	PlantId *UUID `json:"plantId"`
	Priority    int8   `json:"priority"`
	Type string `json:"type"`
	Category string `json:"category"`
	DescriptionRating string `json:"descriptionRating"`
	ResponsiblePerson string `json:"responsiblePerson"`
	CollectedAt *time.Time `json:"collectedAt"`
	TargetDefinition string `json:"targetDefinition"`
	MajorIssueDefinition string `json:"majorIssueDefinition"`
	RelevantTags string `json:"relevantTags"`
	BlockingPoints string `json:"blockingPoints"`
	Comments string `json:"comments"`
	ProjectName string `json:"projectName"`
	Active      *bool   `json:"active"`

	UseCasesParent *UseCases `json:"useCasesParent" gorm:"foreignkey:StandardParentId"`
	ProcessParent *Processes `json:"processParent" gorm:"foreignkey:ProcessParentId"`
	Process *Processes `json:"process" gorm:"foreignkey:ProcessId"`
	Plant *Plants `json:"plant" gorm:"foreignkey:PlantId"`

	Risks []UseCasesToRisks `gorm:"polymorphic:UseCases;"`
	Machines []UseCasesToMachines `gorm:"polymorphic:UseCases;"`
	CommunicationStreams []UseCasesToCommunicationStreams `gorm:"polymorphic:UseCases;"`
	ServiceLines []UseCasesToServiceLines `gorm:"polymorphic:UseCases;"`
	BlockingPointsToServiceLines []UseCasesBlockingPointsToServiceLines `gorm:"polymorphic:UseCases;"`
	Systems []UseCasesToSystems `gorm:"polymorphic:UseCases;"`
	UseCaseClusters []UseCasesToUseCaseClusters `gorm:"polymorphic:UseCases;"`
}

package model

import "time"

type Sprints struct {
	BaseModel
	Name         	 string         `json:"name"`
	BundleId     	 *UUID         	`json:"parentId"`
	PlannedFrom         *time.Time         	`json:"plannedFrom"`
	PlannedTo      *time.Time         `json:"plannedTo"`
	Step int32 `json:"step"`
	Description string `json:"description"`
	Status string `json:"status"`
	DevelopmentStatus string `json:"developmentStatus"`
	IterationStatus string `json:"iterationStatus"`
	ImplementationStatus string `json:"implementationStatus"`
	HandoverStatus string `json:"handoverStatus"`
	ImplementedAt *time.Time `json:"implementedAt"`
	Documents string `json:"documents"`

	Bundle  *Bundles  `json:"bundle" gorm:"foreignkey:BundleId"`
	UseCases  []SprintsToUseCases `gorm:"polymorphic:Sprints"`
}
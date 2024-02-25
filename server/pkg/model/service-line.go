package model

type ServiceLines struct {
	BaseModel
	Name              string `json:"name"`
	ParentId          *UUID   `json:"parentId"`
	Description       string `json:"description"`
	ResponsiblePerson string `json:"responsiblePerson"`
	Active            *bool   `json:"active"`

	ServiceLineParent *ServiceLines `json:"serviceLineParent" gorm:"foreignkey:ParentId"`
}

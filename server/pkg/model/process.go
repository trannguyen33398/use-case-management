package model

type Processes struct {
	BaseModel
	Name       string `json:"name"`
	ParentId   *UUID   `json:"parentId"`
	Type       string `json:"type"`
	FocusField *bool   `json:"focusField"`
	Active     *bool   `json:"active"`

	ProcessParent *Processes `json:"processParent" gorm:"foreignkey:ParentId"`
}

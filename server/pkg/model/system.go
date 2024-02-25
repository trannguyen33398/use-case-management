package model

type Systems struct {
	BaseModel
	Name         	 string         `json:"name"`
	ParentId     	 *UUID         	`json:"parentId"`
	Category         string         	`json:"category"`
	ToolName      string         `json:"toolName"`
	Description      string         `json:"description"`
	Active   		 *bool        	`json:"active"`

	SystemParent  *Systems  `json:"systemParent" gorm:"foreignkey:ParentId"`
}

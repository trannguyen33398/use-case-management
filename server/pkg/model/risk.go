package model

type Risks struct {
	BaseModel
	Name         	 string         `json:"name"`
	ParentId     	 *UUID         	`json:"parentId"`
	Priority         int         	`json:"priority"`
	Description      string         `json:"description"`
	Active   		 *bool        	`json:"active"`

	RiskParent  *Risks  `json:"riskParent" gorm:"foreignkey:ParentId"`
}
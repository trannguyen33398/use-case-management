package model

type BenefitCategories struct {
	BaseModel
	Name         	 string         `json:"name"`
	ParentId     	 *UUID         	`json:"parentId"`
	Description      string         `json:"description"`
	Active   		 *bool        	`json:"active"`

	BenefitCategoryParent  *BenefitCategories  `json:"benefitCategoryParent" gorm:"foreignkey:ParentId"`
}

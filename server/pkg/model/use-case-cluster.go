package model

type UseCaseCluster struct {
	BaseModel
	Name        string `json:"name"`
	ParentId    *UUID   `json:"parentId"`
	Description string `json:"description"`
	Active      *bool   `json:"active"`

	UseCaseClusterParent *UseCaseCluster `json:"useCaseClusterParent" gorm:"foreignkey:ParentId"`
}

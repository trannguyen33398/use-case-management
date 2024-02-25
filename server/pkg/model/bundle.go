package model

type Bundles struct {
	BaseModel
	Name         	 string         `json:"name"`
	Description      string         `json:"description"`

	UseCases  []BundlesToUseCases  `gorm:"polymorphic:Bundles"`
}

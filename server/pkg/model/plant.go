package model
import (
	"github.com/lib/pq"
  )
type Plants struct {
	BaseModel
	Name              string `json:"name"`
	ParentId          *UUID   `json:"parentId"`
	OperationsCluster string `json:"operations_cluster"`
	Type              string `json:"type"`
	NameAbbreviation  string `json:"name_abbreviation"`
	Segment           pq.StringArray `gorm:"type:text[]"`
	Zebra             *bool   `json:"zebra"`
	Active            *bool   `json:"active"`

	PlantParent *Plants `json:"plantParent" gorm:"foreignkey:ParentId"`
}

package risk

import (
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
	"gorm.io/gorm"
)

type IStore interface {
	Create(db *gorm.DB, e *model.Risks) (err error)
	All(db *gorm.DB, name string, page int, limit int) (int64, []*model.Risks, error)
	Detail(db *gorm.DB, id string) (*model.Risks, error)
	Update(db *gorm.DB, id string, e *model.Risks) error
	Delete(db *gorm.DB, id string) error
}

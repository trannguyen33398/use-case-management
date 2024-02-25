package benefit

import (
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
	"gorm.io/gorm"
)

type IStore interface {
	Create(db *gorm.DB, e *model.Benefits) (err error)
	All(db *gorm.DB, name string, page int, limit int) (int64, []*model.Benefits, error)
	Detail(db *gorm.DB, id string) (*model.Benefits, error)
	Update(db *gorm.DB, id string, e *model.Benefits) error
	Delete(db *gorm.DB, id string) error
}
